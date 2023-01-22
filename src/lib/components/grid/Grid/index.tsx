import React, { CSSProperties, ReactNode, useMemo } from 'react';
import cn from 'classnames';
import { GridContext, GridContextState } from '@/lib/components/grid/context/GridContext';
import styles from './styles.module.scss';

export interface GridProps {
  className?: string;
  gap?: number | [number, number];
  cols?: number;
  fullHeight?: boolean;
  children: ReactNode;
}

export function Grid(props: GridProps) {
  const { className, children, gap: dirtyGap = 8, cols = 8, fullHeight } = props;

  const gap = useMemo<[number, number]>(() => (Array.isArray(dirtyGap) ? dirtyGap : [dirtyGap, dirtyGap]), [dirtyGap]);
  const contextState = useMemo<GridContextState>(() => ({ gap, cols }), [gap, cols]);
  const style = useMemo<CSSProperties>(
    () => ({ '--cols': cols, '--hGap': `${gap[0]}px`, '--vGap': `${gap[1]}px` } as CSSProperties),
    [gap, cols]
  );

  return (
    <GridContext.Provider value={contextState}>
      <div className={cn(styles.container, fullHeight && styles.fullHeight, className)} style={style}>
        {children}
      </div>
    </GridContext.Provider>
  );
}
