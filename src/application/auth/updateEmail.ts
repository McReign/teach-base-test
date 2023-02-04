import { UseCasePort } from '@/application/__ports__/application/UseCasePort';
import { AuthViewStoreServicePort } from '@/application/__ports__/store/AuthViewStoreServicePort';
import { Email } from '@/domain/email/types/Email';

export type UpdateEmailUseCaseServices = {
  authViewStoreService: AuthViewStoreServicePort;
};
export type UpdateEmailUseCaseExecutor = (email: Email) => Promise<void>;

export const updateEmailUseCase: UseCasePort<UpdateEmailUseCaseServices, UpdateEmailUseCaseExecutor> = ({
  authViewStoreService,
}) => {
  const execute: UpdateEmailUseCaseExecutor = async (email) => {
    authViewStoreService.setEmail(email);
  };

  return { execute };
};
