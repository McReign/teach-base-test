import React from 'react';
import { Routes, Route, useRouterService } from '@/services/router/RouterService';
import { withUser } from '@/ui/hocs/withUser';
import { HomePage } from './HomePage';
import { FlightOrderPage } from './FlightOrderPage';
import { HotelOrderPage } from './HotelOrderPage';

const HomePageWithUser = withUser(HomePage);
const FlightOrderPageWithUser = withUser(FlightOrderPage);
const HotelOrderPageWithUser = withUser(HotelOrderPage);

export function Pages() {
  const routerService = useRouterService();

  return (
    <Routes>
      <Route path={routerService.getHomePagePath()} element={<HomePageWithUser />} />
      <Route path={routerService.getFlightOrderPath()} element={<FlightOrderPageWithUser />} />
      <Route path={routerService.getHotelOrderPath()} element={<HotelOrderPageWithUser />} />
    </Routes>
  );
}
