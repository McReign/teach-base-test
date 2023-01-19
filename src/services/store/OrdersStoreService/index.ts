import { useCallback } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { TemplateStoreServicePort } from '@/application/__ports__/store/TemplateStoreServicePort';
import { Template } from '@/domain/template/types/Template';
import { CreatedTemplateState } from './types';

const defaultState: CreatedTemplateState = null;

const store = atom<CreatedTemplateState>({
  key: 'CreatedTemplate',
  default: defaultState,
});

export const useCreatedTemplateStoreService = (): TemplateStoreServicePort => {
  const state = useRecoilValue(store);
  const setState = useSetRecoilState(store);

  const getTemplate = useCallback(() => state, [state]);

  const setTemplate = useCallback((template: Template) => setState(template), [setState]);

  const clearTemplate = useCallback(() => setState(defaultState), [setState]);

  return {
    setTemplate,
    getTemplate,
    clearTemplate,
  };
};
