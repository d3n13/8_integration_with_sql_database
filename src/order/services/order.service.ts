import { Injectable } from '@nestjs/common';

import { Order } from '../models';
import { OrderModel } from 'src/db/models/db.models';
import { dbConnection } from 'src/db/db.client';
import { TableName } from 'src/db/db.types';

@Injectable()
export class OrderService {
  findById(orderId: string): Promise<Order> {
    return dbConnection(TableName.Orders).first({ user_id: orderId });
  }

  create(data: Omit<OrderModel, 'id'>): Promise<OrderModel> {
    return dbConnection(TableName.Orders).insert(data);
  }

  update(orderId, data) {
    return dbConnection(TableName.Orders)
      .update(data)
      .where({ user_id: orderId });
  }
}
