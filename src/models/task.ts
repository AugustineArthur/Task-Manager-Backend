import { Model } from 'objection';
import knex from '../config/database';

Model.knex(knex);

class Task extends Model {
  id!: number;
  user_id!: number;
  title!: string;
  description?: string;
  status!: 'todo' | 'in-progress' | 'done';
  due_date?: string;
  createdAt!: string;
  updatedAt!: string;

  static get tableName() {
    return 'tasks';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'title', 'status'],
      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: ['string', 'null'] },
        status: { type: 'string', enum: ['todo', 'in-progress', 'done'] },
        due_date: { type: ['string', 'null'], format: 'date' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    };
  }

  $beforeValidate(jsonSchema: any, json: any, opt: any) {
    // Ensure updatedAt is always a string
    if (json.updatedAt) {
      json.updatedAt = String(json.updatedAt);
    }
    return jsonSchema;
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

export default Task;
