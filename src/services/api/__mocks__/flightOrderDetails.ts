import FlightAvatar from '@/assets/images/flightAvatar.png';
import FlightQR from '@/assets/images/flightQR.svg';
import { FlightOrderDetails } from '@/domain/order/types/FlightOrderDetails';

export const MOCK_FLIGHT_ORDER_DETAILS: FlightOrderDetails = {
  id: '1',
  status: 'CONFIRMED',
  email: 'a***v@gmail.com',
  bookingReference: 'L5W272',
  price: 500,
  bookings: [
    {
      sourcePosition: 'Sheremetyevo Airport (SVO)\nTerminal 1',
      destinationPosition: 'Koltsovo Airport (SVX)\nTerminal 1',
      dateStart: '2023-03-16T10:20+03:00',
      dateEnd: '2023-03-16T12:45+03:00',
      transferInfo: {
        airplaneName: 'SU 1444',
        companyAvatar: FlightAvatar,
        type: 'SU Economy Lite (N)',
      }
    },
    {
      sourcePosition: 'Koltsovo Airport (SVX)\nTerminal 1',
      destinationPosition: 'Sheremetyevo Airport (SVO)\nTerminal 1',
      dateStart: '2023-03-20T11:30+03:00',
      dateEnd: '2023-03-20T17:10+03:00',
      transferInfo: {
        airplaneName: 'SU 1445',
        companyAvatar: FlightAvatar,
        type: 'SU Economy Lite (N)',
      }
    },
  ],
  passengers: ['Mr. Andrey Doronichev', 'Mr. Alexandr Petrov'],
  qr: FlightQR,
};
