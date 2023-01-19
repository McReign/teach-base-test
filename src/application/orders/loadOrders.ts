import { TemplateStoreServicePort } from '@/application/__ports__/store/TemplateStoreServicePort';
import { UseCasePort } from '@/application/__ports__/application/UseCasePort';
import { TemplateApiServicePort } from '@/application/__ports__/api/TemplateApiServicePort';
import { TemplateId } from '@/domain/template/types/TemplateId';
import { StatusServicePort, Error } from '@/application/__ports__/status/StatusServicePort';

export type LoadTemplateIfDoesntExistUseCaseServices = {
  createdTemplateStoreService: TemplateStoreServicePort;
  templateApiService: TemplateApiServicePort;
  statusService: StatusServicePort;
};
export type LoadTemplateIfDoesntExistUseCaseExecutor = (id: TemplateId) => Promise<void>;

export const loadTemplateIfDoesntExistUseCase: UseCasePort<
  LoadTemplateIfDoesntExistUseCaseServices,
  LoadTemplateIfDoesntExistUseCaseExecutor
> = ({ createdTemplateStoreService, templateApiService, statusService }) => {
  const execute: LoadTemplateIfDoesntExistUseCaseExecutor = async (id) => {
    statusService.setStatus('PENDING');
    statusService.setError(null);

    try {
      const template = createdTemplateStoreService.getTemplate();

      if (template) {
        statusService.setStatus('SUCCESS');
        return Promise.resolve();
      }

      const loadedTemplate = await templateApiService.get(id);
      createdTemplateStoreService.setTemplate(loadedTemplate);

      statusService.setStatus('SUCCESS');
    } catch (error) {
      statusService.setError(error as Error);
    }
  };

  return { execute };
};
