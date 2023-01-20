import { Order } from '@/domain/order/types/Order';
import { HotelOrder } from '@/domain/order/types/HotelOrder';

export function isHotelOrder(order: Order): order is HotelOrder {
  return !!(order as HotelOrder).guests;
}
