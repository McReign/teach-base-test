import { createContext } from 'react';

export type GridContextState = {
  gap: [number, number];
  cols: number;
};

const defaultState: GridContextState = {
  gap: [0, 0],
  cols: 0,
};

export const GridContext = createContext<GridContextState>(defaultState);
