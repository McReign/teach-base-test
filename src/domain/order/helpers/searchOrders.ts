import { Order } from '@/domain/order/types/Order';
import { isFlightOrder } from '@/domain/order/helpers/isFlightOrder';

export function searchOrders(orders: Order[], search: string): Order[] {
  const normalizedSearch = search.trim().toLowerCase();

  if (!normalizedSearch.length) {
    return orders;
  }

  return orders.filter((order) => {
    if (isFlightOrder(order)) {
      const normalizedBookingReference = order.bookingReference.trim().toLowerCase();
      const normalizedSourcePoint = order.sourcePoint.trim().toLowerCase();
      const normalizedDestinationPoint = order.destinationPoint.trim().toLowerCase();

      return (
        normalizedBookingReference.includes(normalizedSearch) ||
        normalizedSourcePoint.includes(normalizedSearch) ||
        normalizedDestinationPoint.includes(normalizedSearch)
      );
    }

    const normalizedConfirmationNumber = order.confirmationNumber.trim().toLowerCase();
    const normalizedName = order.name.trim().toLowerCase();

    return normalizedConfirmationNumber.includes(normalizedSearch) || normalizedName.includes(normalizedSearch);
  });
}
