import { useCallback } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { OrdersStoreServicePort } from '@/application/__ports__/store/OrdersStoreServicePort';
import { Order } from '@/domain/order/types/Order';
import { OrdersState } from './types';
import { OrderType } from '@/domain/order/types/OrderType';

const defaultState: OrdersState = {
  orders: null,
  filteredOrders: null,
  search: '',
  type: 'UPCOMING',
};

const store = atom<OrdersState>({
  key: 'Orders',
  default: defaultState,
});

export const useOrdersStoreService = (): OrdersStoreServicePort => {
  const state = useRecoilValue(store);
  const setState = useSetRecoilState(store);

  const getOrders = useCallback(() => state.orders, [state]);

  const setOrders = useCallback((orders: Order[]) => setState((prev) => ({ ...prev, orders })), [setState]);

  const getFilteredOrders = useCallback(() => state.filteredOrders, [state]);

  const setFilteredOrders = useCallback(
    (filteredOrders: Order[]) => setState((prev) => ({ ...prev, filteredOrders })),
    [setState]
  );

  const getSearch = useCallback(() => state.search, [state]);

  const setSearch = useCallback((search: string) => setState((prev) => ({ ...prev, search })), [setState]);

  const getType = useCallback(() => state.type, [state]);

  const setType = useCallback((type: OrderType) => setState((prev) => ({ ...prev, type })), [setState]);

  const clearState = useCallback(() => setState(defaultState), [setState]);

  return {
    getOrders,
    setOrders,
    getFilteredOrders,
    setFilteredOrders,
    getSearch,
    setSearch,
    getType,
    setType,
    clearState,
  };
};
