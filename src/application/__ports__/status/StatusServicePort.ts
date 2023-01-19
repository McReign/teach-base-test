export type Status = 'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR';

export type Error = {
  code: string;
  message?: string;
};

export type StatusServicePort = {
  getStatus: () => Status;
  setStatus: (status: Status) => void;
  getError: () => Error | null;
  setError: (error: Error | null) => void;
};
