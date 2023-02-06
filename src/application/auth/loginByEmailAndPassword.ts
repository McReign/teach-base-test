import { UseCasePort } from '@/application/__ports__/application/UseCasePort';
import { StatusServicePort, Error } from '@/application/__ports__/status/StatusServicePort';
import { FormServicePort } from '@/application/__ports__/form/FormServicePort';

export type LoginByEmailAndPasswordUseCaseServices = {
  authFormService: FormServicePort<{ email: string; password: string }>;
  statusService: StatusServicePort;
};
export type LoginByEmailAndPasswordUseCaseExecutor = () => Promise<void>;

export const loginByEmailAndPasswordUseCase: UseCasePort<
  LoginByEmailAndPasswordUseCaseServices,
  LoginByEmailAndPasswordUseCaseExecutor
> = ({ authFormService, statusService }) => {
  const execute: LoginByEmailAndPasswordUseCaseExecutor = async () => {
    statusService.setStatus('PENDING');
    statusService.setError(null);

    if (!authFormService.getIsFormValid()) {
      statusService.setStatus('ERROR');
      statusService.setError({ code: 'Validation', message: 'Validation error' });
      return;
    }

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
