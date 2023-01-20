import { UseCasePort } from '@/application/__ports__/application/UseCasePort';
import { OrdersStoreServicePort } from '@/application/__ports__/store/OrdersStoreServicePort';
import { filterOrders } from '@/domain/order/helpers/filterOrders';

export type UpdateOrdersSearchUseCaseServices = {
  ordersStoreService: OrdersStoreServicePort;
};
export type UpdateOrdersSearchUseCaseExecutor = (search: string) => void;

export const updateOrdersSearchUseCase: UseCasePort<
  UpdateOrdersSearchUseCaseServices,
  UpdateOrdersSearchUseCaseExecutor
> = ({ ordersStoreService }) => {
  const execute: UpdateOrdersSearchUseCaseExecutor = (search) => {
    const orders = ordersStoreService.getOrders();

    if (orders) {
      const type = ordersStoreService.getType();

      ordersStoreService.setSearch(search);
      ordersStoreService.setFilteredOrders(filterOrders(orders, search, type));
    }
  };

  return { execute };
};
