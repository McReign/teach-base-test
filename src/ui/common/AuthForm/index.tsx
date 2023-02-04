import React, { FormEvent } from 'react';
import GoogleLogo from '@/assets/icons/googleLogo.svg';
import { Email } from '@/domain/email/types/Email';
import { Password } from '@/domain/password/types/Password';
import { Input } from '@/ui/common/Input';
import { Button } from '@/ui/common/Button';
import { Typography } from '@/ui/common/Typography';
import styles from './styles.module.scss';

export interface AuthFormProps {
  className?: string;
  email: Email;
  password: Password;
  onEmailChange: (email: Email) => void;
  onPasswordChange: (password: Password) => void;
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
    onEmailChange,
    onPasswordChange,
    onLoginByEmailAndPassword,
    onLoginByGoogle,
  } = props;

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
          value={email}
          onChange={onEmailChange}
        />
        <Input
          className={styles.field}
          label={renderPasswordLabel()}
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={onPasswordChange}
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
