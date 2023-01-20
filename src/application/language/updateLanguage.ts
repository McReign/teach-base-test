import { UseCasePort } from '@/application/__ports__/application/UseCasePort';
import { LanguageStoreServicePort } from '@/application/__ports__/store/LanguageStoreServicePort';
import { Language } from '@/domain/language/types/Language';

export type UpdateLanguageUseCaseServices = {
  languageStoreService: LanguageStoreServicePort;
};
export type UpdateLanguageUseCaseExecutor = (language: Language) => void;

export const updateLanguageUseCase: UseCasePort<UpdateLanguageUseCaseServices, UpdateLanguageUseCaseExecutor> = ({
  languageStoreService,
}) => {
  const execute: UpdateLanguageUseCaseExecutor = (language) => {
    languageStoreService.setLanguage(language);
  };

  return { execute };
};
