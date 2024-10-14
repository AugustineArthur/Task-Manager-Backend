import { Model } from 'objection';
import knex from '../config/database';

Model.knex(knex);

class Task extends Model {
  id!: number;
  user_id!: number;
  title!: string;
  description?: string;
  status!: 'todo' | 'in-progress' | 'done';
  due_date?: Date;
  createdAt!: Date;
  updatedAt!: Date;

  static get tableName() {
    return 'tasks';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'title', 'createdAt', 'updatedAt'], // Include new fields as required
      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: ['string', 'null'] },
        status: { type: 'string', enum: ['todo', 'in-progress', 'done'] },
        due_date: { type: ['string', 'null'], format: 'date' },
        createdAt: { type: 'string', format: 'date-time' }, // Add createdAt with date-time format
        updatedAt: { type: 'string', format: 'date-time' }, // Add updatedAt with date-time format
      },
    };
  }

  // Automatically set createdAt and updatedAt timestamps
  $beforeInsert() {
    const now = new Date(); // Get current date as Date object
    this.createdAt = now; // Set createdAt
    this.updatedAt = now; // Set updatedAt
  }

  $beforeUpdate() {
    this.updatedAt = new Date(); // Set updatedAt to current date as Date object
  }
}

export default Task;