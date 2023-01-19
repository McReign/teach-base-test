import React from 'react';
import { Routes, Route, useRouterService } from '@/services/router/RouterService';
import { HomePage } from './HomePage';

export function Pages() {
  const routerService = useRouterService();

  return (
    <Routes>
      <Route path={routerService.getHomePagePath()} element={<HomePage />} />
    </Routes>
  );
}
