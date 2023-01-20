import { Order } from '@/domain/order/types/Order';
import { isFlightOrder } from '@/domain/order/helpers/isFlightOrder';

export function searchOrders(orders: Order[], search: string): Order[] {
  if (!search) {
    return orders;
  }

  const normalizedSearch = search.trim().toLowerCase();

  return orders.filter((order) => {
    if (isFlightOrder(order)) {
      const normalizedBookingReference = order.bookingReference;
      const normalizedSourcePoint = order.sourcePoint;
      const normalizedDestinationPoint = order.destinationPoint;

      return (
        normalizedBookingReference.includes(normalizedSearch) ||
        normalizedSourcePoint.includes(normalizedSearch) ||
        normalizedDestinationPoint.includes(normalizedSearch)
      );
    }

    const normalizedConfirmationNumber = order.confirmationNumber;
    const normalizedName = order.name;

    return normalizedConfirmationNumber.includes(normalizedSearch) || normalizedName.includes(normalizedSearch);
  });
}
