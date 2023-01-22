import React, { useEffect } from 'react';
import { useStatusService } from '@/services/status/StatusService';
import { useOrdersApiService } from '@/services/api/OrdersApiService';
import { loadFlightOrderDetailsUseCase } from '@/application/orders/loadFlightOrderDetails';
import { useFlightOrderDetailsStoreService } from '@/services/store/FlightOrderDetailsStoreService';
import { useRouterService } from '@/services/router/RouterService';
import { RequestWrapper } from '@/ui/common/RequestWrapper';
import { Container } from '@/lib/components/Container';
import { Title } from '@/lib/components/Title';
import { Text } from '@/lib/components/Text';
import { WithLabel } from '@/lib/components/WithLabel';
import { splitThousands } from '@/lib/utils/splitThousands';
import { withCurrency } from '@/domain/currency/helpers/withCurrency';
import { WithEmptyData } from '@/lib/components/WithEmptyData';
import { useCurrencyStoreService } from '@/services/store/CurrencyStoreService';
import { TrackFlightAdvisor } from '@/ui/common/TrackFlightAdvisor';
import { FlightBooking } from '@/ui/common/FlightBooking';
import styles from './styles.module.scss';

export function FlightOrderPage() {
  const currencyStoreService = useCurrencyStoreService();
  const routerService = useRouterService();
  const statusService = useStatusService();
  const flightOrderDetailsStoreService = useFlightOrderDetailsStoreService();
  const ordersApiService = useOrdersApiService();

  const id = routerService.getFlightOrderPageId();
  const order = flightOrderDetailsStoreService.getOrder();
  const currency = currencyStoreService.getCurrency();

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
          <Container>
            <div className={styles.content}>
              {order.status === 'CONFIRMED' && (
                <Title type="h4" color="grey300">
                  Success, have a nice flight!
                </Title>
              )}
              <Title type="h4">Order details</Title>
              <Text className={styles.emailAddress} as="p">
                <Text type="body2" color="grey400">
                  Email sent on{' '}
                </Text>
                <Text type="body2">{order.email}</Text>
              </Text>
              <div className={styles.mainInfo}>
                <WithLabel label="Booking reference" offset={12}>
                  <Title type="h5">{order.bookingReference}</Title>
                </WithLabel>
                <WithLabel className={styles.price} label="Order amount" offset={4}>
                  <Title type="h5">{withCurrency(splitThousands(order.price), currency)}</Title>
                </WithLabel>
              </div>
              <WithLabel className={styles.bookings} label="Booked flights" offset={0}>
                {order.bookings?.map((flightOrderDetailsBooking, index) => (
                  <FlightBooking key={index} className={styles.booking} booking={flightOrderDetailsBooking} />
                ))}
              </WithLabel>
              <WithLabel className={styles.passengers} label="Passengers" offset={8}>
                <Text className={styles.passengersText} type="body1">
                  {order.passengers?.join(',\n')}
                </Text>
              </WithLabel>
              <TrackFlightAdvisor className={styles.subInfo} />
            </div>
          </Container>
        )}
      </WithEmptyData>
    </RequestWrapper>
  );
}
