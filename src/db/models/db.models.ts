export type CartModel = {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  status: OrderStatus;
};

export type CartItemModel = {
  count: number;
  product_id: string;
  cart_id: string;
};

export type OrderModel = {
  id: string;
  user_id: string;
  cart_id: string;
  payment?: string;
  delivery?: string;
  comments?: string;
  status: string;
  total: number;
};

export enum OrderStatus {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED',
}
