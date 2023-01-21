import React, { ChangeEvent, useCallback } from 'react';
import cn from 'classnames';
import SearchIcon from '@/assets/icons/search.svg';
import styles from './styles.module.scss';

export interface SearchInputProps {
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput(props: SearchInputProps) {
  const { className, placeholder, value, onChange } = props;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <div className={cn(styles.container, className)}>
      <img className={styles.searchIcon} src={SearchIcon} alt="Search" />
      <input className={styles.input} type="text" placeholder={placeholder} value={value} onChange={handleChange} />
    </div>
  );
}
