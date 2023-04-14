import { dbConnection } from './db.client';
import { TableName } from './db.types';
import { CartModel, OrderStatus } from './models/db.models';
import { v4 } from 'uuid';

async function seedCart() {
  const cart: Omit<CartModel, 'id'> = {
    created_at: new Date().toDateString(),
    updated_at: new Date().toDateString(),
    status: OrderStatus.OPEN,
    user_id: v4(),
  };

  return await dbConnection(TableName.Carts).insert(cart);
}

export function seed() {
  seedCart();
}
