import React from 'react';
import cn from 'classnames';
import { Loader } from '@/lib/components/Loader';
import styles from './styles.module.scss';

export interface FullSizeCenteredLoaderProps {
  className?: string;
}

export function FullSizeCenteredLoader(props: FullSizeCenteredLoaderProps) {
  const { className } = props;

  return (
    <div className={cn(styles.container, className)}>
      <Loader />
    </div>
  );
}
