import React from 'react';
import cn from 'classnames';
import ArrowRightIcon from '@/assets/icons/arrowRight.svg';
import { Text } from '@/lib/components/Text';
import { FlightOrderDetailsBooking } from '@/domain/order/types/FlightOrderDetails';
import { toDisplayDateTime } from '@/lib/utils/toDisplayDateTime';
import styles from './styles.module.scss';

export interface FlightBookingProps {
  className?: string;
  booking: FlightOrderDetailsBooking;
}

export function FlightBooking(props: FlightBookingProps) {
  const { className, booking } = props;

  return (
    <article className={cn(styles.container, className)}>
      <div className={styles.records}>
        <div className={styles.record}>
          <Text className={styles.recordTitle} type="body1">
            {toDisplayDateTime(booking.dateStart)}
          </Text>
          <Text className={styles.recordDescription} type="body2" color="grey500">
            {booking.sourcePosition}
          </Text>
        </div>
        <img className={styles.arrowIcon} src={ArrowRightIcon} alt="To" />
        <div className={styles.record}>
          <Text className={styles.recordTitle} type="body1">
            {toDisplayDateTime(booking.dateEnd)}
          </Text>
          <Text className={styles.recordDescription} type="body2" color="grey500">
            {booking.destinationPosition}
          </Text>
        </div>
      </div>
      <div className={styles.transferInfo}>
        <img className={styles.companyAvatar} src={booking.transferInfo.companyAvatar} alt="Company avatar" />
        <Text className={styles.airplaneName} type="body2">
          {booking.transferInfo.airplaneName}
        </Text>
        <Text className={styles.transferType} type="caption" color="grey300">
          {booking.transferInfo.type}
        </Text>
      </div>
    </article>
  );
}
