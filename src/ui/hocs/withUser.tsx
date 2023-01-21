import React, { ComponentType, useEffect } from 'react';
import { useStatusService } from '@/services/status/StatusService';
import { useUserApiService } from '@/services/api/UserApiService';
import { useUserStoreService } from '@/services/store/UserStoreService';
import { loadUserUseCase } from '@/application/user/loadUser';
import { RequestWrapper } from '@/ui/common/RequestWrapper';

export function withUser<P extends Record<string, unknown>>(Component: ComponentType<P>): ComponentType<P> {
  return function WithUserComponent(props: P) {
    const statusService = useStatusService();
    const userApiService = useUserApiService();
    const userStoreService = useUserStoreService();
    const { execute: loadUser } = loadUserUseCase({ statusService, userApiService, userStoreService });

    const user = userStoreService.getUser();

    useEffect(() => {
      if (!user) {
        loadUser();
      }
    }, [user]);

    return (
      <RequestWrapper statusService={statusService}>
        <Component {...props} />
      </RequestWrapper>
    );
  };
}
