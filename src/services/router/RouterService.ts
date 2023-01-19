import {
  useNavigate,
  BrowserRouter,
  Routes as ExternalRoutes,
  Route as ExternalRoute,
  generatePath,
} from 'react-router-dom';
import { RouterServicePort } from '@/application/__ports__/router/RouterServicePort';

export const Router = BrowserRouter;
export const Routes = ExternalRoutes;
export const Route = ExternalRoute;

export const ROUTE_PATH = {
  HOME: '/',
};

export function useRouterService(): RouterServicePort {
  const navigate = useNavigate();

  return {
    goToHomePage: () => navigate(generatePath(ROUTE_PATH.HOME)),
    getHomePagePath: () => ROUTE_PATH.HOME,
  };
}
