import React, { ReactNode, useCallback } from 'react';
import cn from 'classnames';
import { Link as RouterServiceLink } from '@/services/router/RouterService';
import { Text, TextProps } from '@/lib/components/Text';
import styles from './styles.module.scss';

export interface LinkProps extends Omit<TextProps, 'color'> {
  to: string;
}

export function Link(props: LinkProps) {
  const { children, to, className, ...rest } = props;

  const renderChildren = useCallback((children: ReactNode) => {
    if (typeof children === 'string') {
      return (
        <Text color="accent" {...rest}>
          {children}
        </Text>
      );
    }

    return children;
  }, []);

  return (
    <RouterServiceLink className={cn(styles.link, className)} to={to}>
      {renderChildren(children)}
    </RouterServiceLink>
  );
}
