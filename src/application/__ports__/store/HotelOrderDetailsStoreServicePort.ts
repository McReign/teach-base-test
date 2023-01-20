import { HotelOrderDetails } from '@/domain/order/types/HotelOrderDetails';

export type HotelOrderDetailsStoreServicePort = {
  getOrder: () => HotelOrderDetails | null;
  setOrder: (order: HotelOrderDetails) => void;
  clearState: () => void;
};
