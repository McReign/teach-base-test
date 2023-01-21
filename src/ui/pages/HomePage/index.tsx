import React, { useCallback, useEffect, useMemo } from 'react';
import { loadOrdersUseCase } from '@/application/orders/loadOrders';
import { BaseTemplate } from '@/ui/templates/BaseTemplate';
import { Header } from '@/ui/common/Header';
import { useStatusService } from '@/services/status/StatusService';
import { useOrdersStoreService } from '@/services/store/OrdersStoreService';
import { useOrdersApiService } from '@/services/api/OrdersApiService';
import { RequestWrapper } from '@/ui/common/RequestWrapper';
import { isFlightOrder } from '@/domain/order/helpers/isFlightOrder';
import { SearchInput } from '@/lib/components/SearchInput';
import { updateOrdersSearchUseCase } from '@/application/orders/updateOrdersSearch';
import { TabContent, TabElement, Tabs } from '@/lib/components/Tabs';
import { updateOrdersTypeUseCase } from '@/application/orders/updateOrdersType';
import { OrderType } from '@/domain/order/types/OrderType';
import { Order } from '@/domain/order/types/Order';
import { FlightOrderCard } from '@/ui/common/FlightOrderCard';
import { HotelOrderCard } from '@/ui/common/HotelOrderCard';
import { Container } from '@/lib/components/Container';
import { Title } from '@/lib/components/Title';
import { WithEmptyData } from '@/lib/components/WithEmptyData';
import styles from './styles.module.scss';

export function HomePage() {
  const statusService = useStatusService();
  const ordersStoreService = useOrdersStoreService();
  const ordersApiService = useOrdersApiService();

  const orders = ordersStoreService.getFilteredOrders();
  const search = ordersStoreService.getSearch();
  const type = ordersStoreService.getType();

  const { execute: loadOrders } = loadOrdersUseCase({ statusService, ordersStoreService, ordersApiService });
  const { execute: updateOrdersSearch } = updateOrdersSearchUseCase({ ordersStoreService });
  const { execute: updateOrdersType } = updateOrdersTypeUseCase({ ordersStoreService });

  const renderTabContent = useCallback(
    (orders: Order[] | null) => (
      <WithEmptyData data={orders} isEmpty={(orders) => !orders?.length}>
        {(orders) =>
          orders.map((order) =>
            isFlightOrder(order) ? (
              <FlightOrderCard key={order.id} className={styles.order} order={order} />
            ) : (
              <HotelOrderCard key={order.id} className={styles.order} order={order} />
            )
          )
        }
      </WithEmptyData>
    ),
    []
  );

  const tabs = useMemo<TabElement<OrderType>[]>(
    () => [
      { value: 'UPCOMING', element: 'Upcoming' },
      { value: 'PAST', element: 'Past' },
    ],
    []
  );

  const contents = useMemo<TabContent<OrderType>[]>(
    () => [
      { value: 'UPCOMING', element: renderTabContent(orders) },
      { value: 'PAST', element: renderTabContent(orders) },
    ],
    [renderTabContent, orders]
  );

  useEffect(() => {
    loadOrders();

    return () => {
      ordersStoreService.clearState();
    };
  }, []);

  return (
    <BaseTemplate header={<Header />}>
      <RequestWrapper statusService={statusService}>
        <Container className={styles.container}>
          <div className={styles.title}>
            <Title type="h4">Orders</Title>
            <SearchInput
              className={styles.searchInput}
              value={search}
              placeholder="Search in orders"
              onChange={updateOrdersSearch}
            />
          </div>
          <Tabs className={styles.tabs} value={type} tabs={tabs} contents={contents} onChange={updateOrdersType} />
        </Container>
      </RequestWrapper>
    </BaseTemplate>
  );
}
