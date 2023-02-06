import { Email } from '@/domain/email/types/Email';

export function validateEmailExistence(email: Email): boolean {
  return email?.length > 0;
}
