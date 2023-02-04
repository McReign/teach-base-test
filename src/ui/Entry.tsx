import './Entry.scss';
import React from 'react';
import { StoreServiceRoot } from '@/services/store/StoreServiceRoot';
import { AuthPage } from '@/ui/pages/AuthPage';

export function Entry() {
  return (
    <StoreServiceRoot>
      <AuthPage />
    </StoreServiceRoot>
  );
}
