export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem?(key: string): void;
}

const memoryFallbackStore = new Map<string, string>();

function getBrowserLocalStorage(): StorageLike | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
  } catch {
    // Private browsing or security policy blocks localStorage access
  }
  return null;
}

export function safeReadArray<T>(
  key: string,
  storage: StorageLike | null = getBrowserLocalStorage()
): T[] {
  let raw: string | null = null;
  if (storage) {
    try {
      raw = storage.getItem(key);
    } catch {
      raw = null;
    }
  }
  if (!raw) {
    raw = memoryFallbackStore.get(key) ?? null;
  }
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

export interface SafeWriteResult {
  persistedToStorage: boolean;
  storedCount: number;
  usedMemoryFallback: boolean;
}

/**
 * Writes an array of records safely to storage.
 * On low-storage / QuotaExceededError devices, it progressively trims older
 * records so the newest items still fit, and falls back to an in-memory store
 * if localStorage has 0 bytes free or is blocked.
 */
export function safeWriteArray<T>(
  key: string,
  items: T[],
  maxItems = 50,
  storage: StorageLike | null = getBrowserLocalStorage()
): SafeWriteResult {
  const capped = items.slice(-Math.max(1, maxItems));
  const serializedCapped = JSON.stringify(capped);
  memoryFallbackStore.set(key, serializedCapped);

  if (!storage) {
    return {
      persistedToStorage: false,
      storedCount: capped.length,
      usedMemoryFallback: true,
    };
  }

  // Try full capped array first, then progressively shrink older items on QuotaExceededError
  const candidateLimits = [capped.length, 25, 10, 5, 1].filter(
    (limit, idx, arr) => limit <= capped.length && arr.indexOf(limit) === idx
  );

  for (const limit of candidateLimits) {
    const subset = capped.slice(-limit);
    try {
      storage.setItem(key, JSON.stringify(subset));
      memoryFallbackStore.set(key, JSON.stringify(subset));
      return {
        persistedToStorage: true,
        storedCount: subset.length,
        usedMemoryFallback: false,
      };
    } catch {
      // Likely QuotaExceededError; continue trying smaller slice
    }
  }

  return {
    persistedToStorage: false,
    storedCount: capped.length,
    usedMemoryFallback: true,
  };
}

export function clearMemoryFallbackKey(key: string): void {
  memoryFallbackStore.delete(key);
}
