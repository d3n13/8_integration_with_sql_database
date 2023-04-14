import { dbConnection } from './db.client';
import { TableName } from './db.types';

async function initCartsTable() {
  const tableName = TableName.Carts;

  const isExisting = await dbConnection.schema.hasTable(tableName);

  if (isExisting) {
    return;
  }

  await dbConnection.schema.createTable(tableName, function(table) {
    table
      .uuid('id')
      .primary()
      .defaultTo(dbConnection.raw('uuid_generate_v4()'))
      .notNullable();
    table.uuid('user_id').nullable();
    table.string('email').notNullable();
    table.dateTime('created_at').notNullable();
    table.dateTime('updated_at').notNullable();
    table.enu('status', ['OPEN', 'ORDERED']).notNullable();
  });
}

async function initCartItemsTable() {
  const tableName = TableName.CartItems;

  const isExisting = await dbConnection.schema.hasTable(tableName);

  if (isExisting) {
    return;
  }

  await dbConnection.schema.createTable(tableName, function(table) {
    table
      .uuid('cart_id')
      .references('id')
      .inTable(TableName.Carts)
      .notNullable();
    table.uuid('product_id').notNullable();
    table.integer('count').notNullable();
  });
}

async function initOrdersTable() {
  const tableName = TableName.Orders;

  const isExisting = await dbConnection.schema.hasTable(tableName);

  if (isExisting) {
    return;
  }

  await dbConnection.schema.createTable(tableName, function(table) {
    table
      .uuid('id')
      .primary()
      .defaultTo(dbConnection.raw('uuid_generate_v4()'))
      .notNullable();
    table.uuid('user_id').notNullable();
    table
      .uuid('cart_id')
      .references('id')
      .inTable(TableName.Carts);
    table.json('payment').nullable();
    table.json('delivery').nullable();
    table.text('comments').nullable();
    table.enu('status', ['OPEN', 'ORDERED']);
    table.bigint('total');
  });
}

export function up() {
  initCartsTable();
  initCartItemsTable();
  initOrdersTable();
}

up(); // TODO RM
