import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.string('title').notNullable();
    table.text('description');
    table.enu('status', ['todo', 'in-progress', 'done']).notNullable();
    table.date('due_date');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
  }
  
  export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('tasks');
  }
  