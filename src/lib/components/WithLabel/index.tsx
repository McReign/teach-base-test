import React, { CSSProperties, ReactNode } from 'react';
import cn from 'classnames';
import { Text } from '@/lib/components/Text';
import styles from './styles.module.scss';

export interface WithLabelProps {
  className?: string;
  label: ReactNode;
  offset?: number;
  children: ReactNode;
}

export function WithLabel(props: WithLabelProps) {
  const { className, label, offset = 4, children } = props;

  return (
    <label className={cn(styles.wrapper, className)}>
      <Text className={styles.label} type="overline" color="grey400">
        {label}
      </Text>
      <div className={styles.content} style={{ '--offset': `${offset}px` } as CSSProperties}>
        {children}
      </div>
    </label>
  );
}
