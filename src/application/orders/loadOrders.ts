import { UseCasePort } from '@/application/__ports__/application/UseCasePort';
import { StatusServicePort, Error } from '@/application/__ports__/status/StatusServicePort';
import { OrdersStoreServicePort } from '@/application/__ports__/store/OrdersStoreServicePort';
import { OrdersApiServicePort } from '@/application/__ports__/api/OrdersApiServicePort';

export type LoadOrdersUseCaseServices = {
  ordersStoreService: OrdersStoreServicePort;
  ordersApiService: OrdersApiServicePort;
  statusService: StatusServicePort;
};
export type LoadOrdersUseCaseExecutor = () => Promise<void>;

export const loadOrdersUseCase: UseCasePort<LoadOrdersUseCaseServices, LoadOrdersUseCaseExecutor> = ({
  ordersStoreService,
  ordersApiService,
  statusService,
}) => {
  const execute: LoadOrdersUseCaseExecutor = async () => {
    statusService.setStatus('PENDING');
    statusService.setError(null);

    try {
      const orders = await ordersApiService.getOrders();
      ordersStoreService.setOrders(orders);

      statusService.setStatus('SUCCESS');
    } catch (error) {
      statusService.setError(error as Error);
    }
  };

  return { execute };
};
