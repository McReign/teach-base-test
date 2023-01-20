import { Order } from '@/domain/order/types/Order';
import { OrderType } from '@/domain/order/types/OrderType';
import { searchOrders } from '@/domain/order/helpers/searchOrders';
import { filterOrdersByType } from '@/domain/order/helpers/filterOrdersByType';

export function filterOrders(orders: Order[], search: string, type: OrderType): Order[] {
  return searchOrders(filterOrdersByType(orders, type), search);
}
