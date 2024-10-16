import { Model } from 'objection';
import knex from '../config/database';

Model.knex(knex);

class User extends Model {
  id!: number;
  // username!: string;
  fullname!: string;
  email!: string;
  password!: string;
  role!: 'user' | 'admin';

  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['fullname', 'email', 'password'],
      properties: {
        id: { type: 'integer' },
        // username: { type: 'string', minLength: 1, maxLength: 255 },
        fullname: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 6 },
        role: { type: 'string', enum: ['user', 'admin'] },
      },
    };
  }
}

export default User;