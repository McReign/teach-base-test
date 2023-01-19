import { Order } from '@/domain/order/types/Order';

export type OrdersStoreServicePort = {
  getOrders: () => Order[] | null;
  setOrders: (orders: Order[]) => void;
  getSearch: () => string;
  setSearch: (search: string) => void;
  clearState: () => void;
};
