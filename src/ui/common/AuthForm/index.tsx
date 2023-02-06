import React, { FormEvent } from 'react';
import GoogleLogo from '@/assets/icons/googleLogo.svg';
import { Email } from '@/domain/email/types/Email';
import { Password } from '@/domain/password/types/Password';
import { Input, InputStatus } from '@/ui/common/Input';
import { Button } from '@/ui/common/Button';
import { Typography } from '@/ui/common/Typography';
import styles from './styles.module.scss';

export interface AuthFormProps {
  className?: string;
  email: Email;
  password: Password;
  emailValid: boolean;
  emailTouched: boolean;
  emailError: string | null;
  passwordValid: boolean;
  passwordTouched: boolean;
  passwordError: string | null;
  onEmailChange: (email: Email) => void;
  onEmailBlur: () => void;
  onPasswordChange: (password: Password) => void;
  onPasswordBlur: () => void;
  loginByEmailAndPasswordLoading: boolean;
  loginByGoogleLoading: boolean;
  onLoginByEmailAndPassword: () => void;
  onLoginByGoogle: () => void;
}

export function AuthForm(props: AuthFormProps) {
  const {
    className,
    email,
    password,
    loginByEmailAndPasswordLoading,
    loginByGoogleLoading,
    emailValid,
    emailError,
    emailTouched,
    passwordValid,
    passwordError,
    passwordTouched,
    onEmailChange,
    onEmailBlur,
    onPasswordChange,
    onPasswordBlur,
    onLoginByEmailAndPassword,
    onLoginByGoogle,
  } = props;

  const emailStatus: InputStatus | undefined = emailTouched ? (emailValid ? 'success' : 'error') : undefined;
  const emailStatusMessage = emailTouched ? emailError || undefined : undefined;

  const passwordStatus: InputStatus | undefined = passwordTouched ? (passwordValid ? 'success' : 'error') : undefined;
  const passwordStatusMessage = passwordTouched ? passwordError || undefined : undefined;

  function renderPasswordLabel() {
    return (
      <div className={styles.passwordLabel}>
        Пароль
        <Typography.Link to="#" size="sm">
          Забыли?
        </Typography.Link>
      </div>
    );
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onLoginByEmailAndPassword?.();
  }

  return (
    <form className={className} noValidate onSubmit={handleSubmit}>
      <div className={styles.fields}>
        <Input
          className={styles.field}
          label="Электронная почта"
          type="email"
          placeholder="Введите адрес электронной почты"
          status={emailStatus}
          statusMessage={emailStatusMessage}
          value={email}
          onChange={onEmailChange}
          onBlur={onEmailBlur}
        />
        <Input
          className={styles.field}
          label={renderPasswordLabel()}
          type="password"
          placeholder="Введите пароль"
          status={passwordStatus}
          statusMessage={passwordStatusMessage}
          value={password}
          onChange={onPasswordChange}
          onBlur={onPasswordBlur}
        />
      </div>
      <div className={styles.actions}>
        <Button className={styles.submitAction} htmlType="submit" loading={loginByEmailAndPasswordLoading}>
          Войти
        </Button>
      </div>
      <div className={styles.alternatives}>
        <div className={styles.alternativesLabelWrapper}>
          <Typography.Text className={styles.alternativesLabel} type="muted" size="sm">
            или
          </Typography.Text>
        </div>
        <div className={styles.alternativesActions}>
          <Button
            className={styles.alternativesAction}
            type="secondary"
            loading={loginByGoogleLoading}
            onClick={onLoginByGoogle}
          >
            Войти с помощью <img className={styles.alternativeLogo} src={GoogleLogo} alt="Google" />
          </Button>
        </div>
      </div>
    </form>
  );
}
