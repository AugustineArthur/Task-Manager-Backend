import { Knex } from 'knex';
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Insert seed entries
  const hashedPassword = await bcrypt.hash('password123', 10);

  await knex('users').insert([
    {
      fullname: 'John Doe',
      email: 'john.doe@example.com',
      password: hashedPassword,
      role: 'user',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      fullname: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: hashedPassword,
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      fullname: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      password: hashedPassword,
      role: 'user',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
