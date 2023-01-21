import { HotelOrderDetails } from '@/domain/order/types/HotelOrderDetails';

export const MOCK_HOTEL_ORDER_DETAILS: HotelOrderDetails = {
  id: '1',
  status: 'CONFIRMED',
  email: 'a***v@gmail.com',
  confirmationNumber: '2691.438.025',
  pin: '1612',
  name: 'Crowne Plaza HY36 Midtown Manhattan, an IHG Hotel',
  description: '1 Room: Classic King Mobility and Hearing Accessible Guest Room with Tub',
  bookings: [
    {
      dateStart: '2023-03-16T10:20+03:00',
      dateStartDescription: 'Check-in from 14:00',
      dateEnd: '2023-03-18T10:20+03:00',
      dateEndDescription: 'Check-out until 12:00',
    },
  ],
  guests: ['Mr. Andrey Doronichev', 'Mr. Alexandr Petrov'],
  price: 330,
  cancellationPolicy: 'FREE cancellation\nUntil 4:00 PM local hotel time on Mon 16 Mar 2021',
  address: {
    position: '320 W 36th St, New York, NY 10018',
    coordinates: [55.75, 37.57],
    contact: '+1 8 692 52 000',
  },
};
