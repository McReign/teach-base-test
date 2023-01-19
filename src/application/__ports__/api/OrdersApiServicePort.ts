import { Order } from '@/domain/order/types/Order';

export type OrdersApiServicePort = {
  getOrders: () => Promise<Order[]>;
};
