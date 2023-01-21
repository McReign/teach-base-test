import React, { ReactNode, useMemo } from 'react';
import cn from 'classnames';
import { Text } from '@/lib/components/Text';
import styles from './styles.module.scss';

export type TabValue = string;

export interface TabElement<V extends TabValue> {
  value: V;
  element: string;
}

export interface TabContent<V extends TabValue> {
  value: V;
  element: ReactNode;
}

export interface TabsProps<V extends TabValue> {
  className?: string;
  value: V;
  tabs: TabElement<V>[];
  contents: TabContent<V>[];
  onChange: (value: V) => void;
}

export function Tabs<V extends TabValue>(props: TabsProps<V>) {
  const { className, value, tabs, contents, onChange } = props;

  const activeContent = useMemo(() => contents.find((content) => content.value === value), [value, contents]);

  return (
    <div className={className}>
      <ul className={styles.tabs}>
        {tabs.map((tab) => (
          <li key={tab.value}>
            <button
              className={cn(styles.tab, tab.value === value && styles.active)}
              onClick={() => onChange(tab.value)}
            >
              <Text className={styles.tabText} type='body1'>{tab.element}</Text>
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.content}>{activeContent?.element}</div>
    </div>
  );
}
