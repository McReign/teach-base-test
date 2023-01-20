export type FlightOrderDetailsStatus = 'CONFIRMED' | 'UNCONFIRMED';

export type FlightOrderDetailsTransferInfo = {
  airplaneName: string;
  companyAvatar: string;
  type: string;
};

export type FlightOrderDetailsBooking = {
  sourcePosition: string;
  destinationPosition: string;
  dateStart: string;
  dateEnd: string;
  transferInfo: FlightOrderDetailsTransferInfo;
};

export type FlightOrderDetails = {
  id: string;
  status: FlightOrderDetailsStatus;
  email: string;
  bookingReference: string;
  price: number;
  bookings: FlightOrderDetailsBooking[];
  passengers: string[];
  qr: string;
};
