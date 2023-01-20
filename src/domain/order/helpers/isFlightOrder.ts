import { Order } from '@/domain/order/types/Order';
import { FlightOrder } from '@/domain/order/types/FlightOrder';

export function isFlightOrder(order: Order): order is FlightOrder {
  return !!(order as FlightOrder).passengers;
}
