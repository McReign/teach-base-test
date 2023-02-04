import React, { ChangeEvent, ReactNode } from 'react';
import cn from 'classnames';
import { Typography } from '@/ui/common/Typography';
import styles from './styles.module.scss';

export type InputStatus = 'success' | 'error';

export interface InputProps {
  className?: string;
  type?: string;
  status?: InputStatus;
  label?: ReactNode;
  statusMessage?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export function Input(props: InputProps) {
  const { className, type = 'text', value, status, statusMessage, placeholder, label, onChange } = props;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event.target.value);
  }

  return (
    <div className={cn(styles.wrapper, className)}>
      <label className={styles.labelWrapper}>
        {!!label && (
          <Typography.Text className={styles.label} type={status || 'muted'} size="sm">
            {label}
          </Typography.Text>
        )}
        <input
          className={cn(styles.input, status === 'error' && styles.error, status === 'success' && styles.success)}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </label>
      {!!statusMessage && (
        <Typography.Paragraph className={styles.statusMessage} type={status} size="sm">
          {statusMessage}
        </Typography.Paragraph>
      )}
    </div>
  );
}
