import { Email } from '@/domain/email/types/Email';

export function validateEmailFormat(email: Email): boolean {
  return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
}
