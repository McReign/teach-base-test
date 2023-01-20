import React from 'react';
import { Routes, Route, useRouterService } from '@/services/router/RouterService';
import { HomePage } from './HomePage';
import { FlightOrderPage } from './FlightOrderPage';
import { HotelOrderPage } from './HotelOrderPage';

export function Pages() {
  const routerService = useRouterService();

  return (
    <Routes>
      <Route path={routerService.getHomePagePath()} element={<HomePage />} />
      <Route path={routerService.getFlightOrderPath()} element={<FlightOrderPage />} />
      <Route path={routerService.getHotelOrderPath()} element={<HotelOrderPage />} />
    </Routes>
  );
}
