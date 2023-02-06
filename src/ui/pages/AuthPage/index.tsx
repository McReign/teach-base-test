import React from 'react';
import { AuthForm } from '@/ui/common/AuthForm';
import { loginByEmailAndPasswordUseCase } from '@/application/auth/loginByEmailAndPassword';
import { loginByGoogleUseCase } from '@/application/auth/loginByGoogle';
import { useStatusService } from '@/services/status/StatusService';
import { Title } from '@/ui/common/Typography/Title';
import { useValidationService } from '@/services/validation/ValidationService';
import { validateEmailExistence } from '@/domain/email/utils/validateEmailExistence';
import { validateEmailFormat } from '@/domain/email/utils/validateEmailFormat';
import { validatePasswordExistence } from '@/domain/password/utils/validatePasswordExistence';
import styles from './styles.module.scss';
import { useFormService } from '@/services/form/FormService';

const EMAIL_REQUIRED_ERROR = 'Электронная почта обязательна';
const EMAIL_FORMAT_ERROR = 'Неверный формат электронной почты';
const PASSWORD_REQUIRED_ERROR = 'Пароль обязателен';

export function AuthPage() {
  const loginByEmailAndPasswordStatusService = useStatusService();
  const loginByGoogleStatusService = useStatusService();
  const emailValidationService = useValidationService([
    [validateEmailExistence, EMAIL_REQUIRED_ERROR],
    [validateEmailFormat, EMAIL_FORMAT_ERROR],
  ]);
  const passwordValidationService = useValidationService([[validatePasswordExistence, PASSWORD_REQUIRED_ERROR]]);

  const authFormService = useFormService({
    fields: {
      email: { defaultValue: '', validation: emailValidationService },
      password: { defaultValue: '', validation: passwordValidationService },
    },
    onSubmit: () => loginByEmailAndPassword(),
  });
  const emailFieldState = authFormService.getFieldState('email');
  const passwordFieldState = authFormService.getFieldState('password');

  const isLoginByEmailAndPasswordLoading = loginByEmailAndPasswordStatusService.getStatus() === 'PENDING';
  const isLoginByGoogleLoading = loginByGoogleStatusService.getStatus() === 'PENDING';

  const { execute: loginByEmailAndPassword } = loginByEmailAndPasswordUseCase({
    authFormService,
    statusService: loginByEmailAndPasswordStatusService,
  });
  const { execute: loginByGoogle } = loginByGoogleUseCase({
    authFormService,
    statusService: loginByGoogleStatusService,
  });

  return (
    <main className={styles.authPage}>
      <div className={styles.panel}>
        <Title level={1}>Вход</Title>
        <AuthForm
          className={styles.form}
          email={emailFieldState.value}
          password={passwordFieldState.value}
          emailValid={emailFieldState.valid}
          emailError={emailFieldState.error}
          emailTouched={emailFieldState.touched}
          passwordValid={passwordFieldState.valid}
          passwordError={passwordFieldState.error}
          passwordTouched={passwordFieldState.touched}
          loginByEmailAndPasswordLoading={isLoginByEmailAndPasswordLoading}
          loginByGoogleLoading={isLoginByGoogleLoading}
          onEmailChange={authFormService.changeField('email')}
          onPasswordChange={authFormService.changeField('password')}
          onLoginByEmailAndPassword={authFormService.submitForm}
          onLoginByGoogle={loginByGoogle}
          onEmailBlur={authFormService.blurField('email')}
          onPasswordBlur={authFormService.blurField('password')}
        />
      </div>
    </main>
  );
}
