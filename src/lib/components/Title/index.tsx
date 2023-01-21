import { createElement, ReactNode } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

export type TitleType = 'subtitle' | 'h4' | 'h5';
export type TitleColor =
  | 'grey300'
  | 'grey400'
  | 'grey500'
  | 'tertiary'
  | 'secondary'
  | 'secondaryLight'
  | 'primary'
  | 'accent';

export interface TitleProps {
  className?: string;
  type: TitleType;
  color?: TitleColor;
  children: ReactNode;
}

const typeToLevelMapper: Record<TitleType, number> = {
  subtitle: 2,
  h4: 4,
  h5: 5,
};

export function Title(props: TitleProps) {
  const { className, type, color = 'primary', children } = props;

  return createElement(
    `h${typeToLevelMapper[type]}`,
    { className: cn(styles.title, styles[type], styles[color], className) },
    children
  );
}
