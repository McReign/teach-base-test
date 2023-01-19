import {
  useNavigate,
  BrowserRouter,
  Routes as ExternalRoutes,
  Route as ExternalRoute,
  generatePath,
  useMatch,
} from 'react-router-dom';
import { RouterServicePort } from '@/application/__ports__/router/RouterServicePort';
import { TemplateId } from '@/domain/template/types/TemplateId';
import { InterviewId } from '@/domain/interview/types/InterviewId';

export const Router = BrowserRouter;
export const Routes = ExternalRoutes;
export const Route = ExternalRoute;

export const ROUTE_PATH = {
  HOME: '/',
  CREATE_TEMPLATE: '/templates/create',
  TEMPLATE: '/templates/:id',
  INTERVIEW: '/interviews/:id',
};

export function useRouterService(): RouterServicePort {
  const navigate = useNavigate();
  const templatePageMatch = useMatch(ROUTE_PATH.TEMPLATE);
  const interviewPageMatch = useMatch(ROUTE_PATH.INTERVIEW);

  return {
    goToHomePage: () => navigate(generatePath(ROUTE_PATH.HOME)),
    goToCreateTemplatePage: () => navigate(generatePath(ROUTE_PATH.CREATE_TEMPLATE)),
    goToTemplatePage: (id: TemplateId) => navigate(generatePath(ROUTE_PATH.TEMPLATE, { id })),
    goToInterviewPage: (id: InterviewId) => navigate(generatePath(ROUTE_PATH.INTERVIEW, { id })),
    getHomePagePath: () => ROUTE_PATH.HOME,
    getCreateTemplatePagePath: () => ROUTE_PATH.CREATE_TEMPLATE,
    getInterviewPagePath: () => ROUTE_PATH.INTERVIEW,
    getTemplatePagePath: () => ROUTE_PATH.TEMPLATE,
    getTemplatePageId: () => templatePageMatch?.params.id || null,
    getInterviewPageId: () => interviewPageMatch?.params.id || null,
  };
}
