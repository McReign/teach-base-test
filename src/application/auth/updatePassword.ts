import { UseCasePort } from '@/application/__ports__/application/UseCasePort';
import { AuthViewStoreServicePort } from '@/application/__ports__/store/AuthViewStoreServicePort';
import { Password } from '@/domain/password/types/Password';

export type UpdatePasswordUseCaseServices = {
  authViewStoreService: AuthViewStoreServicePort;
};
export type UpdatePasswordUseCaseExecutor = (password: Password) => Promise<void>;

export const updatePasswordUseCase: UseCasePort<UpdatePasswordUseCaseServices, UpdatePasswordUseCaseExecutor> = ({
  authViewStoreService,
}) => {
  const execute: UpdatePasswordUseCaseExecutor = async (password) => {
    authViewStoreService.setPassword(password);
  };

  return { execute };
};
