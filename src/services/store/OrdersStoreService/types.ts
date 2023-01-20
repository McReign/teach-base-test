import { Order } from '@/domain/order/types/Order';
import { OrderType } from '@/domain/order/types/OrderType';

export type OrdersState = {
  orders: Order[] | null;
  filteredOrders: Order[] | null;
  search: string;
  type: OrderType;
};
