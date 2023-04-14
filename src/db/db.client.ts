import { knex } from 'knex';
import { config } from 'dotenv';

config();

export const dbConnection = knex({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: ['knex', 'public'],
});
