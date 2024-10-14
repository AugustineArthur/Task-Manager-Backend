import { Request, Response, NextFunction } from 'express';
import Task from '../models/task';

export const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, description, status, due_date } = req.body;
    const userId = (req as any).user.id;

    
    const task = await Task.query().insert({
      user_id: userId,
      title,
      description,
      status,
      due_date,
      createdAt: new Date(),
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const tasks = await Task.query().where('user_id', userId);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const updates = {
      ...req.body,
      updatedAt: new Date(),
    };

    const task = await Task.query()
      .patchAndFetchById(id, updates)
      .where('user_id', userId);

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
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
    const userId = (req as any).user.id;

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