import React from 'react';
import { Text } from '@/lib/components/Text';
import { Title } from '@/lib/components/Title';
import { HotelOrderDetails } from '@/domain/order/types/HotelOrderDetails';
import { Grid } from '@/lib/components/grid/Grid';
import { Cell } from '@/lib/components/grid/Cell';
import { WithLabel } from '@/lib/components/WithLabel';
import { HotelBooking } from '@/ui/common/HotelBooking';
import { withCurrency } from '@/domain/currency/helpers/withCurrency';
import { splitThousands } from '@/lib/utils/splitThousands';
import { useCurrencyStoreService } from '@/services/store/CurrencyStoreService';
import styles from './styles.module.scss';

export interface HotelOrderFormProps {
  className?: string;
  order: HotelOrderDetails;
}

export function HotelOrderForm(props: HotelOrderFormProps) {
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
                      Reservation is confirmed!
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
          <Grid gap={32}>
            <Cell>
              <div className={styles.confirmInfo}>
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
            </Cell>
            <Cell>
              <Grid gap={12}>
                <Cell>
                  <Title type="h5">{order.name}</Title>
                </Cell>
                <Cell>
                  <Text type="body2" color="secondary" as="p">
                    {order.description}
                  </Text>
                </Cell>
              </Grid>
            </Cell>
            <Cell>
              <Grid gap={16}>
                {order.bookings?.map((booking, index) => (
                  <Cell key={index}>
                    <HotelBooking booking={booking} />
                  </Cell>
                ))}
              </Grid>
            </Cell>
            <Cell>
              <WithLabel label="Guests">
                <Text className={styles.guestsText} type="body1" as="p">
                  {order.guests?.join(',\n')}
                </Text>
              </WithLabel>
            </Cell>
            <Cell>
              <WithLabel label="Address">
                <Text type="body1" as="p">
                  {order.address?.position}
                </Text>
                <Text type="body1" as="p">
                  {order.address?.contact}
                </Text>
              </WithLabel>
            </Cell>
            <Cell>
              <WithLabel label="Cancellation policy">
                <Text className={styles.cancellationPolicyText} type="body1" as="p">
                  {order.cancellationPolicy}
                </Text>
              </WithLabel>
            </Cell>
            <Cell>
              <WithLabel label="Order amount">
                <Title type="h4">{withCurrency(splitThousands(order.price), currency)}</Title>
              </WithLabel>
            </Cell>
          </Grid>
        </Cell>
      </Grid>
    </article>
  );
}
