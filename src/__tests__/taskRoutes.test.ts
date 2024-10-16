import request from 'supertest';
import app from '../app';
import knex from '../config/database';

beforeAll(async () => {
  await knex.migrate.latest();
});

afterAll(async () => {
  await knex.destroy();
});

describe('Task Routes', () => {
  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Test Task',
        description: 'This is a test task',
        status: 'todo',
      })
      .set('Authorization', 'Bearer YOUR_TEST_TOKEN');

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toEqual('Test Task');
  });

  
});