'use client';

import { AppStore, makeStore } from '@/store/store';
import { setupListeners } from '@reduxjs/toolkit/query';
import { ReactNode, useEffect, useRef } from 'react';
import { Provider } from 'react-redux';

export default function StoreProvider({ children }: Readonly<{ children: ReactNode }>) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current) setupListeners(storeRef.current.dispatch);
    return () => {};
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
