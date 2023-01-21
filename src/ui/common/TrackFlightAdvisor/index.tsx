import React from 'react';
import cn from 'classnames';
import { Text } from '@/lib/components/Text';
import FlightQR from '@/assets/images/flightQR.svg';
import styles from './styles.module.scss';

export interface TrackFlightAdvisorProps {
  className?: string;
}

export function TrackFlightAdvisor(props: TrackFlightAdvisorProps) {
  const { className } = props;

  return (
    <article className={cn(styles.subInfo, className)}>
      <img className={styles.subInfoImage} src={FlightQR} alt="Flight Qr Code" />
      <Text className={styles.subInfoTitle} type="largeText" as="p">
        Track your flight
      </Text>
      <Text className={styles.subInfoDescription} type="body2" color="secondaryLight" as="p">
        Download App in the Air and get flight status notifications
      </Text>
    </article>
  );
}
