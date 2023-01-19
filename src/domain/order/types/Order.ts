export type FlightOrderId = string;
export type FlightPoint = string;

export type FlightOrder = {
  id: FlightOrderId;
  sourcePoint: FlightPoint,
  destinationPoint: FlightPoint,
};
