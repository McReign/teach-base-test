import React from 'react';
import { Text } from '@/lib/components/Text';
import { Title } from '@/lib/components/Title';
import { FlightOrderDetails } from '@/domain/order/types/FlightOrderDetails';
import { Grid } from '@/lib/components/grid/Grid';
import { Cell } from '@/lib/components/grid/Cell';
import { WithLabel } from '@/lib/components/WithLabel';
import { withCurrency } from '@/domain/currency/helpers/withCurrency';
import { splitThousands } from '@/lib/utils/splitThousands';
import { useCurrencyStoreService } from '@/services/store/CurrencyStoreService';
import { FlightBooking } from '@/ui/common/FlightBooking';
import styles from './styles.module.scss';

export interface FlightOrderFormProps {
  className?: string;
  order: FlightOrderDetails;
}

export function FlightOrderForm(props: FlightOrderFormProps) {
  const { className, order } = props;
  const currencyStoreService = useCurrencyStoreService();

  const currency = currencyStoreService.getCurrency();

  return (
    <article className={className}>
      <Grid gap={24}>
        <Cell>
          <Grid gap={16}>
            <Cell>
              <Grid gap={0}>
                {order.status === 'CONFIRMED' && (
                  <Cell>
                    <Title type="h4" color="grey300">
                      Success, have a nice flight!
                    </Title>
                  </Cell>
                )}
                <Cell>
                  <Title type="h4">Order details</Title>
                </Cell>
              </Grid>
            </Cell>
            <Cell>
              <Text as="p">
                <Text type="body2" color="grey400">
                  Email sent on{' '}
                </Text>
                <Text type="body2">{order.email}</Text>
              </Text>
            </Cell>
          </Grid>
        </Cell>
        <Cell>
          <Grid>
            <Cell span={4}>
              <WithLabel label="Booking reference" offset={12}>
                <Title type="h5">{order.bookingReference}</Title>
              </WithLabel>
            </Cell>
            <Cell span={4}>
              <WithLabel className={styles.price} label="Order amount" offset={4}>
                <Title type="h5">{withCurrency(splitThousands(order.price), currency)}</Title>
              </WithLabel>
            </Cell>
          </Grid>
        </Cell>
        <Cell>
          <WithLabel label="Booked flights" offset={0}>
            <Grid gap={16}>
              {order.bookings?.map((flightOrderDetailsBooking, index) => (
                <Cell key={index}>
                  <FlightBooking booking={flightOrderDetailsBooking} />
                </Cell>
              ))}
            </Grid>
          </WithLabel>
        </Cell>
        <Cell>
          <WithLabel label="Passengers" offset={8}>
            <Text className={styles.passengersText} type="body1">
              {order.passengers?.join(',\n')}
            </Text>
          </WithLabel>
        </Cell>
      </Grid>
    </article>
  );
}
