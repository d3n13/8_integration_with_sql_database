import { Injectable } from '@nestjs/common';

import { Cart } from '../models';
import { dbConnection } from 'src/db/db.client';
import { TableName } from 'src/db/db.types';
import { CartModel, OrderStatus } from 'src/db/models/db.models';

@Injectable()
export class CartService {
  findByUserId(userId: string): Promise<CartModel> {
    return dbConnection(TableName.Carts).select({ user_id: userId });
  }

  createByUserId(userId: string): Promise<CartModel> {
    const cart: Omit<CartModel, 'id'> = {
      user_id: userId,
      status: OrderStatus.OPEN,
      created_at: new Date().toUTCString(),
      updated_at: new Date().toUTCString(),
    };

    return dbConnection(TableName.Carts).insert(cart);
  }

  findOrCreateByUserId(userId: string): Promise<CartModel> {
    const userCart = this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart) {
    await dbConnection(TableName.CartItems)
      .del()
      .where({ user_id: userId });
    await dbConnection(TableName.CartItems).insert(items);
  }

  removeByUserId(userId) {
    return dbConnection(TableName.Carts)
      .del()
      .where({ user_id: userId });
  }
}
