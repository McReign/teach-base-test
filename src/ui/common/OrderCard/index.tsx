import React from 'react';
import cn from 'classnames';
import { Title } from '@/lib/components/Title';
import { Text } from '@/lib/components/Text';
import { Link } from '@/ui/common/Link';
import { useCurrencyStoreService } from '@/services/store/CurrencyStoreService';
import { withCurrency } from '@/domain/currency/helpers/withCurrency';
import { splitThousands } from '@/lib/utils/splitThousands';
import styles from './styles.module.scss';

export interface OrderCardProps {
  className?: string;
  avatar: string;
  title: string;
  descriptions: string[];
  price: number;
  detailsUrl: string;
}

export function OrderCard(props: OrderCardProps) {
  const { className, price, title, descriptions, detailsUrl, avatar } = props;
  const currencyStoreService = useCurrencyStoreService();

  const currency = currencyStoreService.getCurrency();

  return (
    <article className={cn(styles.container, className)}>
      <div className={styles.mainInfo}>
        <img className={styles.avatar} src={avatar} alt="Order avatar" />
        <div className={styles.info}>
          <Title type="subtitle">{title}</Title>
          <div className={styles.descriptions}>
            {descriptions.map((description, index) => (
              <Text key={index} className={styles.description} color="secondary">
                {description}
              </Text>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.subInfo}>
        <Title type="h5">{withCurrency(splitThousands(price), currency)}</Title>
        <Link to={detailsUrl} type="caption">
          Order details
        </Link>
      </div>
    </article>
  );
}
