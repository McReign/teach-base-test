import { OrdersApiServicePort } from '@/application/__ports__/api/OrdersApiServicePort';
import { Order } from '@/domain/order/types/Order';
import { FlightOrderDetails } from '@/domain/order/types/FlightOrderDetails';
import { HotelOrderDetails } from '@/domain/order/types/HotelOrderDetails';
import { MOCK_ORDERS } from '../__mocks__/orders';
import { MOCK_FLIGHT_ORDER_DETAILS } from '../__mocks__/flightOrderDetails';
import { MOCK_HOTEL_ORDER_DETAILS } from '../__mocks__/hotelOrderDetails';

export function useOrdersApiService(): OrdersApiServicePort {
  function getOrders(): Promise<Order[]> {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_ORDERS), 500));
  }

  function getFlightOrderDetails(): Promise<FlightOrderDetails> {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_FLIGHT_ORDER_DETAILS), 500));
  }

  function getHotelOrderDetails(): Promise<HotelOrderDetails> {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_HOTEL_ORDER_DETAILS), 500));
  }

  return { getOrders, getHotelOrderDetails, getFlightOrderDetails };
}
