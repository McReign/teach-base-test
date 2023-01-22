import React from 'react';
import ArrowRightIcon from '@/assets/icons/arrowRight.svg';
import { Text } from '@/lib/components/Text';
import { HotelOrderDetailsBooking } from '@/domain/order/types/HotelOrderDetails';
import { toDisplayDateWeek } from '@/lib/utils/toDisplayDateWeek';
import { Grid } from '@/lib/components/grid/Grid';
import { Cell } from '@/lib/components/grid/Cell';
import styles from './styles.module.scss';

export interface HotelBookingProps {
  className?: string;
  booking: HotelOrderDetailsBooking;
}

export function HotelBooking(props: HotelBookingProps) {
  const { className, booking } = props;

  return (
    <article className={className}>
      <Grid>
        <Cell span={4}>
          <div className={styles.startRecordWrapper}>
            <div className={styles.record}>
              <Text className={styles.recordTitle} type="largeText">
                {toDisplayDateWeek(booking.dateStart)}
              </Text>
              <Text className={styles.recordDescription} type="caption" color="secondary">
                {booking.dateStartDescription}
              </Text>
            </div>
            <img className={styles.arrowIcon} src={ArrowRightIcon} alt="To" />
          </div>
        </Cell>
        <Cell span={4}>
          <div className={styles.record}>
            <Text className={styles.recordTitle} type="largeText">
              {toDisplayDateWeek(booking.dateEnd)}
            </Text>
            <Text className={styles.recordDescription} type="caption" color="secondary">
              {booking.dateEndDescription}
            </Text>
          </div>
        </Cell>
      </Grid>
    </article>
  );
}
