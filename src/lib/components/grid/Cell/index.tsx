import React, { CSSProperties, ReactNode, useContext, useMemo } from 'react';
import cn from 'classnames';
import { GridContext } from '@/lib/components/grid/context/GridContext';
import styles from './styles.module.scss';

export interface CellProps {
  className?: string;
  span?: number;
  offset?: number;
  children: ReactNode;
}

export function Cell(props: CellProps) {
  const { cols, gap } = useContext(GridContext);
  const { className, children, span = cols, offset = 0 } = props;

  const style = useMemo<CSSProperties>(
    () =>
      ({
        '--cols': cols,
        '--hGap': `${gap[0]}px`,
        '--vGap': `${gap[1]}px`,
        '--span': span,
        '--offset': offset,
      } as CSSProperties),
    [gap, cols, span, offset]
  );

  return (
    <div className={cn(styles.cell, className)} style={style}>
      {children}
    </div>
  );
}
