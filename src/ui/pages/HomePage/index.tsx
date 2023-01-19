import React from 'react';
import styles from './styles.module.scss';
import { useRouterService } from '@/services/router/RouterService';
import { goToCreatingTemplateUseCase } from '@/application/templates/goToCreatingTemplate';

export function HomePage() {
  const routerService = useRouterService();

  const { execute: goToCreatingTemplate } = goToCreatingTemplateUseCase({ routerService });

  return (
    <div className={styles.wrapper}>
      <h1>HomePage</h1>
      <button onClick={() => goToCreatingTemplate()}>Create template</button>
    </div>
  );
}
