import { User } from '@/domain/user/types/User';

export type UserApiServicePort = {
  getUser: () => Promise<User>;
};
