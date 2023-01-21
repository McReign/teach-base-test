import React, { ReactNode } from 'react';
import { Text } from '@/lib/components/Text';

export type WithEmptyDataChecker<T> = (data: T | undefined | null) => boolean;

export interface WithEmptyDataProps<T> {
  data: T | undefined | null;
  isEmpty: WithEmptyDataChecker<T>;
  children: ReactNode | ((data: T) => ReactNode);
}

function checkIsEmpty<T>(checker: WithEmptyDataChecker<T>, data: T | undefined | null): data is null | undefined {
  return checker(data);
}

export function WithEmptyData<T>(props: WithEmptyDataProps<T>) {
  const { isEmpty, data, children } = props;

  if (checkIsEmpty(isEmpty, data)) {
    return <Text type="largeText">List is empty 😔</Text>;
  }

  return <>{typeof children === 'function' ? children(data as T) : children}</>;
}
