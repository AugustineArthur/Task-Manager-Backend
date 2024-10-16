import swaggerJsdoc from 'swagger-jsdoc';
import Task from '../models/task';
import User from '../models/user';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: 'A comprehensive task management API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    tags: [
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Tasks', description: 'Task management endpoints' },
    ],
    components: {
      schemas: {
        Task: Task.jsonSchema,
        User: User.jsonSchema,
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
