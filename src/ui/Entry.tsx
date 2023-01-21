import './Entry.scss';
import React from 'react';
import { Router } from '@/services/router/RouterService';
import { StoreServiceRoot } from '@/services/store/StoreServiceRoot';
import { Pages } from '@/ui/pages';

export function Entry() {
  return (
    <StoreServiceRoot>
      <Router>
        <Pages />
      </Router>
    </StoreServiceRoot>
  );
}
