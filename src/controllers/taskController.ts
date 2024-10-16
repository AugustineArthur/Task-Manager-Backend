import { Request, Response, NextFunction } from 'express';
import Task from '../models/task';
import { plainToClass } from 'class-transformer';
import { CreateTaskDTO } from '../dtos/task.dto';
import { validate } from 'class-validator';
import { UpdateTaskDTO } from '../dtos/task.dto';

export const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // console.log('User from request:', (req as any).user);
  
  try {
    const { title, description, status, due_date } = req.body;
    const userId = (req as any).user.userId;
    
    console.log('User ID from request:', userId);

    
    const task = await Task.query().insert({
      user_id: userId,
      title,
      description,
      status,
      due_date,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};


export const getTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const tasks = await Task.query().where('user_id', userId);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};


export const updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.userId;

    if (!id || !userId) {
      res.status(400).json({ message: 'Invalid task ID or user not authenticated' });
      return;
    }

    const allowedFields = ['title', 'description', 'status', 'due_date'];
    const updates: { [key: string]: any } = {};

    Object.keys(req.body).forEach((field) => {
      if (allowedFields.includes(field)) {
        updates[field] = req.body[field];
      }
    });

    if (updates.due_date) {
      const dueDate = new Date(updates.due_date);
      if (!isNaN(dueDate.getTime())) {
        updates.due_date = dueDate.toISOString().split('T')[0];
      } else {
        res.status(400).json({ message: 'Invalid due date format' });
        return;
      }
    }

    if (Object.keys(updates).length === 0) {
      res.status(400).json({ message: 'No valid fields to update' });
      return;
    }

    const task = await Task.query()
      .patchAndFetchById(id, updates)
      .where('user_id', userId)
      .first();

    if (!task) {
      res.status(404).json({ message: 'Task not found or you are not authorized to update this task' });
      return;
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};






export const deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.userId;

    const deletedCount = await Task.query()
      .delete()
      .where({ id, user_id: userId });

    if (deletedCount === 0) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};