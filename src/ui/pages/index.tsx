import React from 'react';
import { Routes, Route, useRouterService } from '@/services/router/RouterService';
import { HomePage } from './HomePage';
import { TemplatePage } from './TemplatePage';
import { CreateTemplatePage } from './CreateTemplatePage';
import { InterviewPage } from './InterviewPage';

export function Pages() {
  const routerService = useRouterService();

  return (
    <Routes>
      <Route path={routerService.getHomePagePath()} element={<HomePage />} />
      <Route path={routerService.getCreateTemplatePagePath()} element={<CreateTemplatePage />} />
      <Route path={routerService.getTemplatePagePath()} element={<TemplatePage />} />
      <Route path={routerService.getInterviewPagePath()} element={<InterviewPage />} />
    </Routes>
  );
}
