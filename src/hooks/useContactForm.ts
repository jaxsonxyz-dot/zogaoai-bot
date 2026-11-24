import { useState, useEffect, useCallback } from 'react';
import { createClickThrottle } from '@/utils/requestGuard';

declare global {
  interface Window {
    openContactForm?: () => void;
  }
}

const openListeners = new Set<(open: boolean) => void>();
let sharedOpenState = false;

const throttledGlobalOpen = createClickThrottle(() => {
  sharedOpenState = true;
  openListeners.forEach((listener) => listener(true));
}, 250);

if (typeof window !== 'undefined') {
  window.openContactForm = throttledGlobalOpen;
}

function safeGetStorageItem(key: string): string {
  try {
    return localStorage.getItem(key) || '';
  } catch {
    return '';
  }
}

function safeSetStorageItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore storage quota or private browsing errors
  }
}

export const useContactForm = () => {
  const [contactOpen, setContactOpenState] = useState(sharedOpenState);
  const [geminiApiKey, setGeminiApiKey] = useState<string>(() =>
    safeGetStorageItem('gemini-api-key')
  );

  const setContactOpen = useCallback((open: boolean) => {
    sharedOpenState = open;
    openListeners.forEach((listener) => listener(open));
  }, []);

  useEffect(() => {
    openListeners.add(setContactOpenState);
    window.openContactForm = throttledGlobalOpen;

    return () => {
      openListeners.delete(setContactOpenState);
    };
  }, []);

  const updateGeminiApiKey = useCallback((key: string) => {
    safeSetStorageItem('gemini-api-key', key);
    setGeminiApiKey(key);
  }, []);

  return {
    contactOpen,
    setContactOpen,
    geminiApiKey,
    setGeminiApiKey: updateGeminiApiKey,
  };
};
