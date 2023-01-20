import { UseCasePort } from '@/application/__ports__/application/UseCasePort';
import { StatusServicePort, Error } from '@/application/__ports__/status/StatusServicePort';
import { OrdersApiServicePort } from '@/application/__ports__/api/OrdersApiServicePort';
import { FlightOrderDetailsStoreServicePort } from '@/application/__ports__/store/FlightOrderDetailsStoreServicePort';

export type LoadFlightOrderDetailsUseCaseServices = {
  flightOrderDetailsStoreService: FlightOrderDetailsStoreServicePort;
  ordersApiService: OrdersApiServicePort;
  statusService: StatusServicePort;
};
export type LoadFlightOrderDetailsUseCaseExecutor = (id: string) => Promise<void>;

export const loadFlightOrderDetailsUseCase: UseCasePort<
  LoadFlightOrderDetailsUseCaseServices,
  LoadFlightOrderDetailsUseCaseExecutor
> = ({ flightOrderDetailsStoreService, ordersApiService, statusService }) => {
  const execute: LoadFlightOrderDetailsUseCaseExecutor = async (id) => {
    statusService.setStatus('PENDING');
    statusService.setError(null);

    try {
      const order = await ordersApiService.getFlightOrderDetails(id);
      flightOrderDetailsStoreService.setOrder(order);

      statusService.setStatus('SUCCESS');
    } catch (error) {
      statusService.setError(error as Error);
    }
  };

  return { execute };
};
