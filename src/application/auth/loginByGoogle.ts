import { UseCasePort } from '@/application/__ports__/application/UseCasePort';
import { StatusServicePort, Error } from '@/application/__ports__/status/StatusServicePort';
import { FormServicePort } from '@/application/__ports__/form/FormServicePort';

export type LoginByGoogleUseCaseServices = {
  authFormService: FormServicePort<{ email: string; password: string }>;
  statusService: StatusServicePort;
};
export type LoginByGoogleUseCaseExecutor = () => Promise<void>;

export const loginByGoogleUseCase: UseCasePort<LoginByGoogleUseCaseServices, LoginByGoogleUseCaseExecutor> = ({
  authFormService,
  statusService,
}) => {
  const execute: LoginByGoogleUseCaseExecutor = async () => {
    statusService.setStatus('PENDING');
    statusService.setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      authFormService.clearForm();

      statusService.setStatus('SUCCESS');
    } catch (error) {
      statusService.setStatus('ERROR');
      statusService.setError(error as Error);
    }
  };

  return { execute };
};
