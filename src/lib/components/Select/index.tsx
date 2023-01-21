import React, { LegacyRef, useCallback, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import { useClickOutside } from '@/lib/hooks/useClickOutside';
import { Text } from '@/lib/components/Text';
import styles from './styles.module.scss';

export type SelectValue = string;

export interface SelectOption<V extends SelectValue> {
  value: V;
  content: string;
}

export interface SelectProps<V extends SelectValue> {
  className?: string;
  buttonClassName?: string;
  value: V;
  options: SelectOption<V>[];
  onChange: (value: V) => void;
}

export function Select<V extends SelectValue>(props: SelectProps<V>) {
  const { className, buttonClassName, value, options, onChange } = props;
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>();

  const closeMenu = useCallback(() => {
    setIsMenuOpened(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpened((prev) => !prev);
  }, []);

  const handleChange = useCallback(
    (value: V) => {
      onChange(value);
      closeMenu();
    },
    [closeMenu, onChange]
  );

  const selectedElement = useMemo(() => {
    if (value) {
      return options.find((option) => option.value === value)?.content;
    }

    return null;
  }, [value, options]);

  useClickOutside(containerRef, closeMenu);

  return (
    <div className={cn(styles.container, className)} ref={containerRef as LegacyRef<HTMLDivElement>}>
      <button key={value} className={cn(styles.button, buttonClassName)} onClick={toggleMenu}>
        <Text type="body2">{selectedElement}</Text>
      </button>
      {isMenuOpened && (
        <ul className={styles.menu}>
          {options.map((option) => (
            <li key={option.value} className={styles.menuItem}>
              <button
                className={cn(styles.menuItemButton, option.value === value && styles.active)}
                onClick={() => handleChange(option.value)}
              >
                <Text type="body2">{option.content}</Text>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
