import React from 'react';
import cn from 'classnames';
import { Text } from '@/lib/components/Text';
import styles from './styles.module.scss';

export interface UserProps {
  className?: string;
  name: string;
  avatar: string;
  direction?: 'rtl' | 'ltr';
}

export function User(props: UserProps) {
  const { className, name, avatar, direction = 'ltr' } = props;

  return (
    <div className={cn(styles.container, styles[direction], className)}>
      <img className={styles.avatar} src={avatar} alt="User avatar" />
      <Text className={styles.name} type="body2" color="secondary">
        {name}
      </Text>
    </div>
  );
}
