import {
  useNavigate,
  BrowserRouter,
  Routes as ExternalRoutes,
  Route as ExternalRoute,
  generatePath,
  useMatch,
} from 'react-router-dom';
import { RouterServicePort } from '@/application/__ports__/router/RouterServicePort';

export const Router = BrowserRouter;
export const Routes = ExternalRoutes;
export const Route = ExternalRoute;

export const ROUTE_PATH = {
  HOME: '/',
  FLIGHT_ORDER: '/flight/:id',
  HOTEL_ORDER: '/hotel/:id',
};

export function useRouterService(): RouterServicePort {
  const navigate = useNavigate();
  const flightOrderPageMatch = useMatch(ROUTE_PATH.FLIGHT_ORDER);
  const hotelOrderPageMatch = useMatch(ROUTE_PATH.HOTEL_ORDER);

  return {
    goToHomePage: () => navigate(generatePath(ROUTE_PATH.HOME)),
    getHomePagePath: () => ROUTE_PATH.HOME,
    goToFlightOrderPage: (id: string) => navigate(generatePath(ROUTE_PATH.FLIGHT_ORDER, { id })),
    goToHotelOrderPage: (id: string) => navigate(generatePath(ROUTE_PATH.HOTEL_ORDER, { id })),
    getFlightOrderPath: () => ROUTE_PATH.FLIGHT_ORDER,
    getHotelOrderPath: () => ROUTE_PATH.HOTEL_ORDER,
    getFlightOrderPageId: () => flightOrderPageMatch?.params.id || null,
    getHotelOrderPageId: () => hotelOrderPageMatch?.params.id || null,
  };
}
