export type HotelOrderDetailsStatus = 'CONFIRMED' | 'UNCONFIRMED';

export type HotelOrderDetailsAddress = {
  position: string;
  coordinates: [number, number];
  contact: string;
};

export type HotelOrderDetailsBooking = {
  dateStart: string;
  dateStartDescription: string;
  dateEnd: string;
  dateEndDescription: string;
};

export type HotelOrderDetails = {
  id: string;
  status: HotelOrderDetailsStatus;
  email: string;
  confirmationNumber: string;
  pin: string;
  name: string;
  description: string;
  bookings: HotelOrderDetailsBooking[];
  guests: string[];
  price: number;
  cancellationPolicy: string;
  address: HotelOrderDetailsAddress;
};
