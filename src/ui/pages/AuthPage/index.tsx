import React from 'react';
import { AuthForm } from '@/ui/common/AuthForm';
import { useAuthViewStoreService } from '@/services/store/AuthViewStoreService';
import { updateEmailUseCase } from '@/application/auth/updateEmail';
import { updatePasswordUseCase } from '@/application/auth/updatePassword';
import { loginByEmailAndPasswordUseCase } from '@/application/auth/loginByEmailAndPassword';
import { loginByGoogleUseCase } from '@/application/auth/loginByGoogle';
import { useStatusService } from '@/services/status/StatusService';
import { Title } from '@/ui/common/Typography/Title';
import styles from './styles.module.scss';

export function AuthPage() {
  const authViewStoreService = useAuthViewStoreService();
  const loginByEmailAndPasswordStatusService = useStatusService();
  const loginByGoogleStatusService = useStatusService();
  const email = authViewStoreService.getEmail();
  const password = authViewStoreService.getPassword();

  const isLoginByEmailAndPasswordLoading = loginByEmailAndPasswordStatusService.getStatus() === 'PENDING';
  const isLoginByGoogleLoading = loginByGoogleStatusService.getStatus() === 'PENDING';

  const { execute: updateEmail } = updateEmailUseCase({ authViewStoreService });
  const { execute: updatePassword } = updatePasswordUseCase({ authViewStoreService });
  const { execute: loginByEmailAndPassword } = loginByEmailAndPasswordUseCase({
    authViewStoreService,
    statusService: loginByEmailAndPasswordStatusService,
  });
  const { execute: loginByGoogle } = loginByGoogleUseCase({
    authViewStoreService,
    statusService: loginByGoogleStatusService,
  });

  return (
    <main className={styles.authPage}>
      <div className={styles.panel}>
        <Title level={1}>Вход</Title>
        <AuthForm
          className={styles.form}
          email={email}
          password={password}
          loginByEmailAndPasswordLoading={isLoginByEmailAndPasswordLoading}
          loginByGoogleLoading={isLoginByGoogleLoading}
          onEmailChange={updateEmail}
          onPasswordChange={updatePassword}
          onLoginByEmailAndPassword={loginByEmailAndPassword}
          onLoginByGoogle={loginByGoogle}
        />
      </div>
    </main>
  );
}
