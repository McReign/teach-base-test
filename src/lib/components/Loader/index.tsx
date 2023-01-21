import React from 'react';
import styles from './styles.module.scss';

export interface LoaderProps {
  className?: string;
}

export function Loader(props: LoaderProps) {
  const { className } = props;

  return (
    <span className={className}>
      <span className={styles.loader} />
    </span>
  );
}
