import React, { useEffect } from 'react';
import { loadOrdersUseCase } from '@/application/orders/loadOrders';
import { BaseTemplate } from '@/ui/templates/BaseTemplate';
import { Header } from '@/ui/common/Header';
import { useStatusService } from '@/services/status/StatusService';
import { useOrdersStoreService } from '@/services/store/OrdersStoreService';
import { useOrdersApiService } from '@/services/api/OrdersApiService';
import styles from './styles.module.scss';

export function FlightOrderPage() {
  const statusService = useStatusService();
  const ordersStoreService = useOrdersStoreService();
  const ordersApiService = useOrdersApiService();

  const orders = ordersStoreService.getOrders();

  const { execute: loadOrders } = loadOrdersUseCase({ statusService, ordersStoreService, ordersApiService });

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <BaseTemplate header={<Header />}>
      {orders?.length ? orders?.map(({ id }) => <div key={id}>Order {id}</div>) : <div>Empty</div>}
    </BaseTemplate>
  );
}
