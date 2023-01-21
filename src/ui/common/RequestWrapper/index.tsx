import React, { ReactNode } from 'react';
import { StatusServicePort } from '@/application/__ports__/status/StatusServicePort';
import { FullSizeCenteredLoader } from '@/lib/components/FullSizeCenteredLoader';
import { Text } from '@/lib/components/Text';

export interface RequestWrapperProps {
  statusService: StatusServicePort;
  children: ReactNode;
}

export function RequestWrapper(props: RequestWrapperProps) {
  const { statusService, children } = props;

  if (statusService.getStatus() === 'PENDING') {
    return <FullSizeCenteredLoader />;
  }

  if (statusService.getStatus() === 'ERROR') {
    return <Text type="largeText">{statusService.getError()?.message}</Text>;
  }

  return <>{children}</>;
}
