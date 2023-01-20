export type FlightOrder = {
  id: string;
  sourcePoint: string;
  destinationPoint: string;
  price: number;
  bookingReference: string;
  passengers: string[];
  dateStart: string;
  dateEnd: string;
  avatar: string;
};
