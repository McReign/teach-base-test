import { useCallback } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { UserStoreServicePort } from '@/application/__ports__/store/UserStoreServicePort';
import { User } from '@/domain/user/types/User';
import { UserState } from './types';

const defaultState: UserState = null;

const store = atom<UserState>({
  key: 'User',
  default: defaultState,
});

export const useUserStoreService = (): UserStoreServicePort => {
  const state = useRecoilValue(store);
  const setState = useSetRecoilState(store);

  const getUser = useCallback(() => state, [state]);

  const setUser = useCallback((user: User) => setState(user), [setState]);

  const clearState = useCallback(() => setState(defaultState), [setState]);

  return {
    getUser,
    setUser,
    clearState,
  };
};
