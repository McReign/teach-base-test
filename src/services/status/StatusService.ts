import { StatusServicePort, Status, Error } from '@/application/__ports__/status/StatusServicePort';
import { useCallback, useState } from 'react';

export function useStatusService(): StatusServicePort {
  const [status, setStatus] = useState<Status>('IDLE');
  const [error, setError] = useState<Error | null>(null);

  const getStatus = useCallback(() => status, [status]);
  const getError = useCallback(() => error, [error]);

  return {
    setStatus,
    getStatus,
    getError,
    setError,
  };
}
