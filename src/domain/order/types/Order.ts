import { FlightOrder } from '@/domain/order/types/FlightOrder';
import { HotelOrder } from '@/domain/order/types/HotelOrder';

export type Order = FlightOrder | HotelOrder;
