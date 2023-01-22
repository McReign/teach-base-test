import React, { useEffect } from 'react';
import { useStatusService } from '@/services/status/StatusService';
import { useOrdersApiService } from '@/services/api/OrdersApiService';
import { loadHotelOrderDetailsUseCase } from '@/application/orders/loadHotelOrderDetails';
import { useHotelOrderDetailsStoreService } from '@/services/store/HotelOrderDetailsStoreService';
import { useRouterService } from '@/services/router/RouterService';
import { RequestWrapper } from '@/ui/common/RequestWrapper';
import { Container } from '@/lib/components/Container';
import { WithEmptyData } from '@/lib/components/WithEmptyData';
import { HotelOrderForm } from '@/ui/common/HotelOrderForm';
import { Map } from '@/ui/common/Map';
import { Grid } from '@/lib/components/grid/Grid';
import { Cell } from '@/lib/components/grid/Cell';
import styles from './styles.module.scss';

export function HotelOrderPage() {
  const routerService = useRouterService();
  const statusService = useStatusService();
  const hotelOrderDetailsStoreService = useHotelOrderDetailsStoreService();
  const ordersApiService = useOrdersApiService();

  const id = routerService.getHotelOrderPageId();
  const order = hotelOrderDetailsStoreService.getOrder();

  const { execute: loadOrder } = loadHotelOrderDetailsUseCase({
    statusService,
    hotelOrderDetailsStoreService,
    ordersApiService,
  });

  useEffect(() => {
    if (id) {
      loadOrder(id);
    }

    return () => {
      hotelOrderDetailsStoreService.clearState();
    };
  }, [id]);

  return (
    <RequestWrapper statusService={statusService}>
      <WithEmptyData data={order} isEmpty={(order) => !order}>
        {(order) => (
          <div className={styles.wrapper}>
            <Container className={styles.formContainer}>
              <Grid gap={64}>
                <Cell span={4}>
                  <HotelOrderForm className={styles.form} order={order} />
                </Cell>
              </Grid>
            </Container>
            <div className={styles.mapContainer}>
              <Grid gap={64} fullHeight>
                <Cell span={4} offset={4}>
                  <Map className={styles.map} point={order.address?.coordinates} />
                </Cell>
              </Grid>
            </div>
          </div>
        )}
      </WithEmptyData>
    </RequestWrapper>
  );
}

// {/*<div className={styles.mapContainer}>*/}
// {/*  <Grid gap={32} className={styles.mapContainerGrid}>*/}
// {/*    <Cell span={4} offset={4}>*/}
// {/*      <div className={styles.mapWrapper}>*/}
// {/*        <Map className={styles.map} point={order.address?.coordinates} />*/}
// {/*      </div>*/}
// {/*    </Cell>*/}
// {/*  </Grid>*/}
// {/*</div>*/}
