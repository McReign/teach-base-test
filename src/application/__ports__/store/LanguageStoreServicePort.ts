import { Language } from '@/domain/language/types/Language';

export type LanguageStoreServicePort = {
  getLanguage: () => Language;
  setLanguage: (language: Language) => void;
  clearState: () => void;
};
