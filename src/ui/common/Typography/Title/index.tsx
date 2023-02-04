import { createElement, ReactNode } from 'react';
import cn from 'classnames';
import { TypographyType } from '../definitions/TypographyType';
import { TitleLevel } from '../definitions/TitleLevel';
import commonStyles from '../styles.module.scss';
import styles from './styles.module.scss';

export interface TitleProps {
  className?: string;
  type?: TypographyType;
  level?: TitleLevel;
  children?: ReactNode;
}

export function Title(props: TitleProps) {
  const { className, type = 'primary', level = 1, children } = props;

  return createElement(`h${level}`, { className: cn(styles.title, commonStyles[type], className) }, children);
}
