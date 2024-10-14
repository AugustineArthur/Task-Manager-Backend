import { Knex } from 'knex';

   export async function up(knex: Knex): Promise<void> {
     return knex.schema.createTable('users', (table) => {
       table.increments('id').primary();
       table.string('username', 255).notNullable().unique();
       table.string('fullname', 255).notNullable();
       table.string('email', 255).notNullable().unique();
       table.string('password', 255).notNullable();
       table.enu('role', ['user', 'admin']).defaultTo('user');
       table.timestamps(true, true);
     });
   }

   export async function down(knex: Knex): Promise<void> {
     return knex.schema.dropTable('users');
   }