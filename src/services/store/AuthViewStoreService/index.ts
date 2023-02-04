import { useCallback } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { AuthViewStoreServicePort } from '@/application/__ports__/store/AuthViewStoreServicePort';
import { Email } from '@/domain/email/types/Email';
import { Password } from '@/domain/password/types/Password';
import { AuthViewState } from './types';

const defaultState: AuthViewState = {
  email: '',
  password: '',
};

const store = atom<AuthViewState>({
  key: 'AuthView',
  default: defaultState,
});

export const useAuthViewStoreService = (): AuthViewStoreServicePort => {
  const state = useRecoilValue(store);
  const setState = useSetRecoilState(store);

  const getEmail = useCallback(() => state.email, [state]);
  const getPassword = useCallback(() => state.password, [state]);

  const setEmail = useCallback((email: Email) => setState((prev) => ({ ...prev, email })), [setState]);
  const setPassword = useCallback((password: Password) => setState((prev) => ({ ...prev, password })), [setState]);

  const clearState = useCallback(() => setState(defaultState), [setState]);

  return {
    setEmail,
    setPassword,
    getEmail,
    getPassword,
    clearState,
  };
};
