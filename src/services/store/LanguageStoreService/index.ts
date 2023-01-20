import { useCallback } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { LanguageStoreServicePort } from '@/application/__ports__/store/LanguageStoreServicePort';
import { Language } from '@/domain/language/types/Language';
import { LanguageState } from './types';

const defaultState: LanguageState = 'eng';

const store = atom<LanguageState>({
  key: 'Language',
  default: defaultState,
});

export const useLanguageStoreService = (): LanguageStoreServicePort => {
  const state = useRecoilValue(store);
  const setState = useSetRecoilState(store);

  const getLanguage = useCallback(() => state, [state]);

  const setLanguage = useCallback((language: Language) => setState(language), [setState]);

  const clearState = useCallback(() => setState(defaultState), [setState]);

  return {
    getLanguage,
    setLanguage,
    clearState,
  };
};
