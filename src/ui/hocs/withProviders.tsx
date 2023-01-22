import React, { ComponentType } from 'react';
import { Router } from '@/services/router/RouterService';
import { StoreServiceRoot } from '@/services/store/StoreServiceRoot';

export function withProviders<P extends Record<string, unknown>>(Component: ComponentType<P>): ComponentType<P> {
  return function withProvidersComponent(props: P) {
    return (
      <StoreServiceRoot>
        <Router>
          <Component {...props} />
        </Router>
      </StoreServiceRoot>
    );
  };
}
