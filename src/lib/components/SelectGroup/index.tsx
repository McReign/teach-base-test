import React, { ReactNode, useCallback, Children, isValidElement, cloneElement, ReactElement } from 'react';
import cn from 'classnames';
import { Select, SelectProps, SelectValue } from '@/lib/components/Select';
import styles from './styles.module.scss';

export interface SelectGroupProps {
  className?: string;
  children: ReactNode;
}

function isSelectElement(element: ReactElement): element is ReactElement<SelectProps<SelectValue>> {
  return element.type === Select;
}

export function SelectGroup(props: SelectGroupProps) {
  const { className, children } = props;

  const renderChildren = useCallback(() => {
    return Children.map(children, (child) => {
      if (isValidElement(child) && isSelectElement(child)) {
        return cloneElement<SelectProps<SelectValue>>(child, {
          className: cn(child.props.className, styles.groupSelectContainer),
          buttonClassName: cn(child.props.buttonClassName, styles.groupSelectButton),
        });
      }
      return null;
    });
  }, [children]);

  return <div className={cn(styles.container, className)}>{renderChildren()}</div>;
}
