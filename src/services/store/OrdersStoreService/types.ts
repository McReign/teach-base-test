import { Order } from '@/domain/order/types/Order';

export type OrdersState = {
  orders: Order[] | null;
  search: string;
};
