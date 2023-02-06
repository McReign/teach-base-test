import { Password } from '@/domain/password/types/Password';

export function validatePasswordExistence(password: Password): boolean {
  return password?.length > 0;
}
