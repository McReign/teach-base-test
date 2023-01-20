import { Order } from '@/domain/order/types/Order';
import { OrderType } from '@/domain/order/types/OrderType';
import { getUpcomingOrders } from '@/domain/order/helpers/getUpcomingOrders';
import { getPastOrders } from '@/domain/order/helpers/getPastOrders';

export function filterOrdersByType(orders: Order[], type: OrderType): Order[] {
  if (type === 'UPCOMING') {
    return getUpcomingOrders(orders);
  }

  return getPastOrders(orders);
}
