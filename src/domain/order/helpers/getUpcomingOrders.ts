import { Order } from '@/domain/order/types/Order';

export function getUpcomingOrders(orders: Order[]): Order[] {
  return orders.filter((order) => new Date(order.dateStart) >= new Date());
}
