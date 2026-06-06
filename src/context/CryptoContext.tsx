import React, { createContext, useContext, useEffect, useState } from 'react';

import { loadOrCreateKey } from '@/lib/crypto';

interface CryptoContextValue {
  key: Uint8Array | null;
  ready: boolean;
}

const CryptoContext = createContext<CryptoContextValue>({ key: null, ready: false });

export function CryptoProvider({ children }: { children: React.ReactNode }) {
  const [key, setKey] = useState<Uint8Array | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadOrCreateKey()
      .then((k) => {
        setKey(k);
        setReady(true);
      })
      .catch((err) => {
        console.error('CryptoProvider: failed to load key', err);
        setReady(true); // allow app to continue — ops that need key will gracefully skip
      });
  }, []);

  return <CryptoContext.Provider value={{ key, ready }}>{children}</CryptoContext.Provider>;
}

export function useCrypto(): CryptoContextValue {
  return useContext(CryptoContext);
}
