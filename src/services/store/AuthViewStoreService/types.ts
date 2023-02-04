import { Email } from '@/domain/email/types/Email';
import { Password } from '@/domain/password/types/Password';

export type AuthViewState = {
  email: Email;
  password: Password;
};
