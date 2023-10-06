/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useMemo } from 'react';
import { type SmartContext } from './useContextSelector';

/**
 * Use this hook to get the setting functions for a given context.
 */
export const useContextSetters = <T extends SmartContext>(context: React.Context<T>) => {
  const store: any = React.useContext(context);
  if (!store.getState()) {
    throw new Error(
      'The context provided to useContextSelector must be from within the appropriate provider. Check to make sure you wrapped your component in a Provider tag for the context which you are trying to use.'
    );
  }

  return useMemo(() => {
    const { getState, subscribe, ...rest } = store;
    return rest as Omit<T, keyof SmartContext>;
  }, [store]);
};
