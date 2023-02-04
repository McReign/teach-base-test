import { UseCasePort } from '@/application/__ports__/application/UseCasePort';
import { StatusServicePort, Error } from '@/application/__ports__/status/StatusServicePort';
import { AuthViewStoreServicePort } from '@/application/__ports__/store/AuthViewStoreServicePort';

export type LoginByEmailAndPasswordUseCaseServices = {
  authViewStoreService: AuthViewStoreServicePort;
  statusService: StatusServicePort;
};
export type LoginByEmailAndPasswordUseCaseExecutor = () => Promise<void>;

export const loginByEmailAndPasswordUseCase: UseCasePort<
  LoginByEmailAndPasswordUseCaseServices,
  LoginByEmailAndPasswordUseCaseExecutor
> = ({ authViewStoreService, statusService }) => {
  const execute: LoginByEmailAndPasswordUseCaseExecutor = async () => {
    statusService.setStatus('PENDING');
    statusService.setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      authViewStoreService.setEmail('');
      authViewStoreService.setPassword('');

      statusService.setStatus('SUCCESS');
    } catch (error) {
      statusService.setError(error as Error);
    }
  };

  return { execute };
};
