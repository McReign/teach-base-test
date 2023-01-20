import { UseCasePort } from '@/application/__ports__/application/UseCasePort';
import { StatusServicePort, Error } from '@/application/__ports__/status/StatusServicePort';
import { OrdersStoreServicePort } from '@/application/__ports__/store/OrdersStoreServicePort';
import { OrdersApiServicePort } from '@/application/__ports__/api/OrdersApiServicePort';
import { filterOrders } from '@/domain/order/helpers/filterOrders';

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

      const search = ordersStoreService.getSearch();
      const type = ordersStoreService.getType();
      ordersStoreService.setFilteredOrders(filterOrders(orders, search, type));

      statusService.setStatus('SUCCESS');
    } catch (error) {
      statusService.setError(error as Error);
    }
  };

  return { execute };
};
