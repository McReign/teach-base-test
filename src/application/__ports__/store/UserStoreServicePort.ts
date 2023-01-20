import { User } from '@/domain/user/types/User';

export type UserStoreServicePort = {
  getUser: () => User | null;
  setUser: (user: User) => void;
  clearState: () => void;
};
