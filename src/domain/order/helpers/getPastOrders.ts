import { Order } from '@/domain/order/types/Order';

export function getPastOrders(orders: Order[]): Order[] {
  return orders.filter((order) => new Date(order.dateStart) < new Date());
}
