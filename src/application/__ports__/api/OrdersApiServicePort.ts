import { Order } from '@/domain/order/types/Order';
import { FlightOrderDetails } from '@/domain/order/types/FlightOrderDetails';
import { HotelOrderDetails } from '@/domain/order/types/HotelOrderDetails';

export type OrdersApiServicePort = {
  getOrders: () => Promise<Order[]>;
  getFlightOrderDetails: (id: string) => Promise<FlightOrderDetails>;
  getHotelOrderDetails: (id: string) => Promise<HotelOrderDetails>;
};
