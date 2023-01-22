import React, { useMemo } from 'react';
import Logo from '@/assets/icons/logo.svg';
import { Container } from '@/lib/components/Container';
import { User } from '@/lib/components/User';
import { Link } from '@/ui/common/Link';
import { useUserStoreService } from '@/services/store/UserStoreService';
import { SelectGroup } from '@/lib/components/SelectGroup';
import { Select } from '@/lib/components/Select';
import { useLanguageStoreService } from '@/services/store/LanguageStoreService';
import { useCurrencyStoreService } from '@/services/store/CurrencyStoreService';
import { updateLanguageUseCase } from '@/application/language/updateLanguage';
import { updateCurrencyUseCase } from '@/application/currency/updateCurrency';
import { Language } from '@/domain/language/types/Language';
import { Currency } from '@/domain/currency/types/Currency';
import { LANGUAGES } from '@/domain/language/constants/languages';
import { CURRENCIES } from '@/domain/currency/constants/currencies';
import { useRouterService } from '@/services/router/RouterService';
import styles from './styles.module.scss';

export function Header() {
  const routerService = useRouterService();
  const userStoreService = useUserStoreService();
  const languageStoreService = useLanguageStoreService();
  const currencyStoreService = useCurrencyStoreService();

  const { execute: updateLanguage } = updateLanguageUseCase({ languageStoreService });
  const { execute: updateCurrency } = updateCurrencyUseCase({ currencyStoreService });

  const user = userStoreService.getUser();
  const language = languageStoreService.getLanguage();
  const currency = currencyStoreService.getCurrency();

  const languageOptions = useMemo(
    () => (Object.keys(LANGUAGES) as Language[]).map((key) => ({ value: key, content: LANGUAGES[key] })),
    []
  );
  const currencyOptions = useMemo(
    () =>
      (Object.keys(CURRENCIES) as Currency[]).map((key) => ({
        value: key,
        content: `${CURRENCIES[key].label} - ${CURRENCIES[key].sign}`,
      })),
    []
  );

  return (
    <div className={styles.header}>
      <Container>
        <div className={styles.content}>
          <Link to={routerService.getHomePageUrl()}>
            <img className={styles.logo} src={Logo} alt="Logo" />
          </Link>
          <div className={styles.subInfo}>
            <SelectGroup>
              <Select value={language} options={languageOptions} onChange={updateLanguage} />
              <Select value={currency} options={currencyOptions} onChange={updateCurrency} />
            </SelectGroup>
            {!!user && <User className={styles.user} name={user.name} avatar={user.avatar} direction="rtl" />}
          </div>
        </div>
      </Container>
    </div>
  );
}
