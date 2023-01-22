import './Entry.scss';
import React from 'react';
import { withProviders } from '@/ui/hocs/withProviders';
import { withUser } from '@/ui/hocs/withUser';
import { HomePage } from '@/ui/pages/HomePage';
import { FlightOrderPage } from '@/ui/pages/FlightOrderPage';
import { HotelOrderPage } from '@/ui/pages/HotelOrderPage';
import { Route, Routes, useRouterService } from '@/services/router/RouterService';
import { BaseTemplate } from '@/ui/templates/BaseTemplate';
import { Header } from '@/ui/common/Header';

function EntryComponent() {
  const routerService = useRouterService();

  return (
    <BaseTemplate header={<Header />}>
      <Routes>
        <Route path={routerService.getHomePagePath()} element={<HomePage />} />
        <Route path={routerService.getFlightOrderPath()} element={<FlightOrderPage />} />
        <Route path={routerService.getHotelOrderPath()} element={<HotelOrderPage />} />
      </Routes>
    </BaseTemplate>
  );
}

export const Entry = withProviders(withUser(EntryComponent));
