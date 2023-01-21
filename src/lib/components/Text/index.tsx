import React, { ReactNode } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

export type TextAs = 'span' | 'p';
export type TextType = 'body1' | 'body2' | 'caption' | 'overline' | 'defaultText' | 'largeText';
export type TextWeight = 'medium' | 'bold';
export type TextColor =
  | 'grey300'
  | 'grey400'
  | 'grey500'
  | 'tertiary'
  | 'secondary'
  | 'secondaryLight'
  | 'primary'
  | 'accent';

export interface TextProps {
  className?: string;
  as?: TextAs;
  type?: TextType;
  weight?: TextWeight;
  color?: TextColor;
  children: ReactNode;
}

export function Text(props: TextProps) {
  const { className, as = 'span', type = 'defaultText', weight = 'medium', color = 'primary', children } = props;

  const Component = as;

  return (
    <Component className={cn(styles.text, styles[type], styles[weight], styles[color], className)}>
      {children}
    </Component>
  );
}
