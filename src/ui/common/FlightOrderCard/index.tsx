import React, { useMemo } from 'react';
import { useRouterService } from '@/services/router/RouterService';
import { FlightOrder } from '@/domain/order/types/FlightOrder';
import { OrderCard } from '@/ui/common/OrderCard';
import { toDisplayDateRange } from '@/lib/utils/toDisplayDateRange';

export interface FlightOrderCardProps {
  className?: string;
  order: FlightOrder;
}

export function FlightOrderCard(props: FlightOrderCardProps) {
  const { className, order } = props;
  const routerService = useRouterService();

  const { id, avatar, price, sourcePoint, destinationPoint, dateEnd, dateStart, bookingReference, passengers } = order;

  const descriptions = useMemo<string[]>(
    () => [toDisplayDateRange(dateStart, dateEnd), passengers.join(', '), `Bookref: ${bookingReference}`],
    [dateStart, dateEnd, bookingReference, passengers]
  );

  return (
    <OrderCard
      className={className}
      avatar={avatar}
      price={price}
      title={`${sourcePoint} – ${destinationPoint}`}
      descriptions={descriptions}
      detailsUrl={routerService.getFlightOrderUrl(id)}
    />
  );
}
