import { UseCasePort } from '@/application/__ports__/application/UseCasePort';
import { StatusServicePort, Error } from '@/application/__ports__/status/StatusServicePort';
import { UserStoreServicePort } from '@/application/__ports__/store/UserStoreServicePort';
import { UserApiServicePort } from '@/application/__ports__/api/UserApiServicePort';

export type LoadUserUseCaseServices = {
  userStoreService: UserStoreServicePort;
  userApiService: UserApiServicePort;
  statusService: StatusServicePort;
};
export type LoadUserUseCaseExecutor = () => Promise<void>;

export const loadUserUseCase: UseCasePort<LoadUserUseCaseServices, LoadUserUseCaseExecutor> = ({
  userStoreService,
  userApiService,
  statusService,
}) => {
  const execute: LoadUserUseCaseExecutor = async () => {
    statusService.setStatus('PENDING');
    statusService.setError(null);

    try {
      const user = await userApiService.getUser();
      userStoreService.setUser(user);

      statusService.setStatus('SUCCESS');
    } catch (error) {
      statusService.setError(error as Error);
    }
  };

  return { execute };
};
