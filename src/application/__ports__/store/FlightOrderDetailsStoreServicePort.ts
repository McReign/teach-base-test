import { FlightOrderDetails } from '@/domain/order/types/FlightOrderDetails';

export type FlightOrderDetailsStoreServicePort = {
  getOrder: () => FlightOrderDetails | null;
  setOrder: (order: FlightOrderDetails) => void;
  clearState: () => void;
};
