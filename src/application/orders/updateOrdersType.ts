import { UseCasePort } from '@/application/__ports__/application/UseCasePort';
import { OrdersStoreServicePort } from '@/application/__ports__/store/OrdersStoreServicePort';
import { OrderType } from '@/domain/order/types/OrderType';
import { filterOrders } from '@/domain/order/helpers/filterOrders';

export type UpdateOrdersTypeUseCaseServices = {
  ordersStoreService: OrdersStoreServicePort;
};
export type UpdateOrdersTypeUseCaseExecutor = (type: OrderType) => void;

export const updateOrdersTypeUseCase: UseCasePort<UpdateOrdersTypeUseCaseServices, UpdateOrdersTypeUseCaseExecutor> = ({
  ordersStoreService,
}) => {
  const execute: UpdateOrdersTypeUseCaseExecutor = (type) => {
    const orders = ordersStoreService.getOrders();

    if (orders) {
      const search = ordersStoreService.getSearch();

      ordersStoreService.setType(type);
      ordersStoreService.setFilteredOrders(filterOrders(orders, search, type));
    }
  };

  return { execute };
};
