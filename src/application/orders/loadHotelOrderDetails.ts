import { UseCasePort } from '@/application/__ports__/application/UseCasePort';
import { StatusServicePort, Error } from '@/application/__ports__/status/StatusServicePort';
import { OrdersApiServicePort } from '@/application/__ports__/api/OrdersApiServicePort';
import { HotelOrderDetailsStoreServicePort } from '@/application/__ports__/store/HotelOrderDetailsStoreServicePort';

export type LoadHotelOrderDetailsUseCaseServices = {
  hotelOrderDetailsStoreService: HotelOrderDetailsStoreServicePort;
  ordersApiService: OrdersApiServicePort;
  statusService: StatusServicePort;
};
export type LoadHotelOrderDetailsUseCaseExecutor = (id: string) => Promise<void>;

export const loadHotelOrderDetailsUseCase: UseCasePort<
  LoadHotelOrderDetailsUseCaseServices,
  LoadHotelOrderDetailsUseCaseExecutor
> = ({ hotelOrderDetailsStoreService, ordersApiService, statusService }) => {
  const execute: LoadHotelOrderDetailsUseCaseExecutor = async (id) => {
    statusService.setStatus('PENDING');
    statusService.setError(null);

    try {
      const order = await ordersApiService.getHotelOrderDetails(id);
      hotelOrderDetailsStoreService.setOrder(order);

      statusService.setStatus('SUCCESS');
    } catch (error) {
      statusService.setError(error as Error);
    }
  };

  return { execute };
};
