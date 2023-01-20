import { UseCasePort } from '@/application/__ports__/application/UseCasePort';
import { Currency } from '@/domain/currency/types/Currency';
import { CurrencyStoreServicePort } from '@/application/__ports__/store/CurrencyStoreServicePort';

export type UpdateCurrencyUseCaseServices = {
  currencyStoreService: CurrencyStoreServicePort;
};
export type UpdateCurrencyUseCaseExecutor = (currency: Currency) => void;

export const updateCurrencyUseCase: UseCasePort<UpdateCurrencyUseCaseServices, UpdateCurrencyUseCaseExecutor> = ({
  currencyStoreService,
}) => {
  const execute: UpdateCurrencyUseCaseExecutor = (currency) => {
    currencyStoreService.setCurrency(currency);
  };

  return { execute };
};
