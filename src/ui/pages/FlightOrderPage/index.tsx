import React, { useEffect } from 'react';
import { useStatusService } from '@/services/status/StatusService';
import { useOrdersApiService } from '@/services/api/OrdersApiService';
import { loadFlightOrderDetailsUseCase } from '@/application/orders/loadFlightOrderDetails';
import { useFlightOrderDetailsStoreService } from '@/services/store/FlightOrderDetailsStoreService';
import { useRouterService } from '@/services/router/RouterService';
import { RequestWrapper } from '@/ui/common/RequestWrapper';
import { Container } from '@/lib/components/Container';
import { WithEmptyData } from '@/lib/components/WithEmptyData';
import { TrackFlightAdvisor } from '@/ui/common/TrackFlightAdvisor';
import { Grid } from '@/lib/components/grid/Grid';
import { Cell } from '@/lib/components/grid/Cell';
import { FlightOrderForm } from '@/ui/common/FlightOrderForm';
import styles from './styles.module.scss';

export function FlightOrderPage() {
  const routerService = useRouterService();
  const statusService = useStatusService();
  const flightOrderDetailsStoreService = useFlightOrderDetailsStoreService();
  const ordersApiService = useOrdersApiService();

  const id = routerService.getFlightOrderPageId();
  const order = flightOrderDetailsStoreService.getOrder();

  const { execute: loadOrder } = loadFlightOrderDetailsUseCase({
    statusService,
    flightOrderDetailsStoreService,
    ordersApiService,
  });

  useEffect(() => {
    if (id) {
      loadOrder(id);
    }

    return () => {
      flightOrderDetailsStoreService.clearState();
    };
  }, [id]);

  return (
    <RequestWrapper statusService={statusService}>
      <WithEmptyData data={order} isEmpty={(order) => !order}>
        {(order) => (
          <Container className={styles.content}>
            <Grid gap={40}>
              <Cell>
                <FlightOrderForm order={order} />
              </Cell>
              <Cell>
                <TrackFlightAdvisor />
              </Cell>
            </Grid>
          </Container>
        )}
      </WithEmptyData>
    </RequestWrapper>
  );
}
