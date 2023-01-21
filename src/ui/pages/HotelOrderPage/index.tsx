import React, { useEffect } from 'react';
import { BaseTemplate } from '@/ui/templates/BaseTemplate';
import { Header } from '@/ui/common/Header';
import { useStatusService } from '@/services/status/StatusService';
import { useOrdersApiService } from '@/services/api/OrdersApiService';
import { loadHotelOrderDetailsUseCase } from '@/application/orders/loadHotelOrderDetails';
import { useHotelOrderDetailsStoreService } from '@/services/store/HotelOrderDetailsStoreService';
import { useRouterService } from '@/services/router/RouterService';
import { RequestWrapper } from '@/ui/common/RequestWrapper';
import { Container } from '@/lib/components/Container';
import { WithEmptyData } from '@/lib/components/WithEmptyData';
import { Title } from '@/lib/components/Title';
import { Text } from '@/lib/components/Text';
import { WithLabel } from '@/lib/components/WithLabel';
import { withCurrency } from '@/domain/currency/helpers/withCurrency';
import { splitThousands } from '@/lib/utils/splitThousands';
import { useCurrencyStoreService } from '@/services/store/CurrencyStoreService';
import { HotelBooking } from '@/ui/common/HotelBooking';
import { Map } from '@/ui/common/Map';
import styles from './styles.module.scss';

export function HotelOrderPage() {
  const currencyStoreService = useCurrencyStoreService();
  const routerService = useRouterService();
  const statusService = useStatusService();
  const hotelOrderDetailsStoreService = useHotelOrderDetailsStoreService();
  const ordersApiService = useOrdersApiService();

  const id = routerService.getHotelOrderPageId();
  const order = hotelOrderDetailsStoreService.getOrder();
  const currency = currencyStoreService.getCurrency();

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
    <BaseTemplate header={<Header />}>
      <RequestWrapper statusService={statusService}>
        <WithEmptyData data={order} isEmpty={(order) => !order}>
          {(order) => (
            <div className={styles.container}>
              <Container className={styles.formContainer}>
                <div className={styles.form}>
                  {order.status === 'CONFIRMED' && (
                    <Title type="h4" color="grey300">
                      Reservation is confirmed!
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
                    <WithLabel label="Confirmation number">
                      <Text type="body1" weight="bold">
                        {order.confirmationNumber}
                      </Text>
                    </WithLabel>
                    <WithLabel className={styles.pin} label="Pin">
                      <Text type="body1" weight="bold">
                        {order.pin}
                      </Text>
                    </WithLabel>
                  </div>
                  <Title className={styles.name} type="h5">
                    {order.name}
                  </Title>
                  <Text className={styles.description} type="body2" color="secondary" as="p">
                    {order.description}
                  </Text>
                  <div className={styles.bookings}>
                    {order.bookings?.map((booking, index) => (
                      <HotelBooking className={styles.booking} key={index} booking={booking} />
                    ))}
                  </div>
                  <WithLabel className={styles.guests} label="Guests">
                    <Text className={styles.guestsText} type="body1" as="p">
                      {order.guests?.join(',\n')}
                    </Text>
                  </WithLabel>
                  <WithLabel className={styles.address} label="Address">
                    <Text type="body1" as="p">
                      {order.address?.position}
                    </Text>
                    <Text type="body1" as="p">
                      {order.address?.contact}
                    </Text>
                  </WithLabel>
                  <WithLabel className={styles.cancellationPolicy} label="Cancellation policy">
                    <Text className={styles.cancellationPolicyText} type="body1" as="p">
                      {order.cancellationPolicy}
                    </Text>
                  </WithLabel>
                  <WithLabel className={styles.price} label="Order amount">
                    <Title type="h4">{withCurrency(splitThousands(order.price), currency)}</Title>
                  </WithLabel>
                </div>
                <div className={styles.formEmptyPlaceholder} />
              </Container>
              <div className={styles.mapContainer}>
                <div className={styles.mapEmptyPlaceholder} />
                <Map className={styles.map} point={order.address?.coordinates} />
              </div>
            </div>
          )}
        </WithEmptyData>
      </RequestWrapper>
    </BaseTemplate>
  );
}
