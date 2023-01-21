import React, { useMemo } from 'react';
import { useRouterService } from '@/services/router/RouterService';
import { OrderCard } from '@/ui/common/OrderCard';
import { HotelOrder } from '@/domain/order/types/HotelOrder';
import { toDisplayDateRange } from '@/lib/utils/toDisplayDateRange';

export interface HotelOrderCardProps {
  className?: string;
  order: HotelOrder;
}

export function HotelOrderCard(props: HotelOrderCardProps) {
  const { className, order } = props;
  const routerService = useRouterService();

  const { id, avatar, price, dateEnd, dateStart, guests, name, confirmationNumber } = order;

  const descriptions = useMemo<string[]>(
    () => [toDisplayDateRange(dateStart, dateEnd), guests.join(', '), `Confirmation number: ${confirmationNumber}`],
    [dateStart, dateEnd, guests, confirmationNumber]
  );

  return (
    <OrderCard
      className={className}
      avatar={avatar}
      price={price}
      title={name}
      descriptions={descriptions}
      detailsUrl={routerService.getHotelOrderUrl(id)}
    />
  );
}
