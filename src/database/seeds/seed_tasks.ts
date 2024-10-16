import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('tasks').del();

  // Inserts seed entries
  await knex('tasks').insert([
    {
      user_id: 4, // John Doe
      title: 'Complete project report',
      description: 'Finish the project report and submit it by the due date',
      status: 'todo',
      due_date: '2024-10-30',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      user_id: 4, // John Doe
      title: 'Review code for project',
      description: 'Review the codebase and optimize for performance',
      status: 'in-progress',
      due_date: '2024-10-25',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      user_id: 5, // Jane Smith
      title: 'Test application',
      description: 'Perform extensive testing on the new features',
      status: 'done',
      due_date: '2024-10-20',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}
