import { Order } from '@/domain/order/types/Order';
import { OrderType } from '@/domain/order/types/OrderType';

export type OrdersStoreServicePort = {
  getOrders: () => Order[] | null;
  setOrders: (orders: Order[]) => void;
  getFilteredOrders: () => Order[] | null;
  setFilteredOrders: (orders: Order[]) => void;
  getSearch: () => string;
  setSearch: (search: string) => void;
  getType: () => OrderType;
  setType: (type: OrderType) => void;
  clearState: () => void;
};
