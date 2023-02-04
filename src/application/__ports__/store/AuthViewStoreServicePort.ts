import { Email } from '@/domain/email/types/Email';
import { Password } from '@/domain/password/types/Password';

export type AuthViewStoreServicePort = {
  setEmail: (email: Email) => void;
  getEmail: () => Email;
  setPassword: (password: Password) => void;
  getPassword: () => Password;
  clearState: () => void;
};
