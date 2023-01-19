import { OrdersApiServicePort } from '@/application/__ports__/api/OrdersApiServicePort';
import { Order } from '@/domain/order/types/Order';

export function useOrdersApiService(): OrdersApiServicePort {
  function getOrders(): Promise<Order[]> {
    return new Promise((resolve) => setTimeout(() => resolve([{ id: '234234' }, { id: '6546546' }]), 500));
  }

  return { getOrders };
}
