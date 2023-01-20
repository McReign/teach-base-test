import { UserApiServicePort } from '@/application/__ports__/api/UserApiServicePort';
import { User } from '@/domain/user/types/User';
import { MOCK_USER } from '../__mocks__/user';

export function useUserApiService(): UserApiServicePort {
  function getUser(): Promise<User> {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_USER), 500));
  }

  return { getUser };
}
