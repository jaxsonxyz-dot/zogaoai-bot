/**
 * Concurrency, Single-Flight Locking, Idempotency & Rate-Limiting Utilities
 * Protects UI buttons, forms, and API calls when 50–100 clicks or requests
 * occur simultaneously or on slow/unreliable networks.
 */

export interface SingleFlightController {
  /** Returns true if an operation is currently running */
  isLocked: () => boolean;
  /** Runs `fn` only if not currently locked; ignores concurrent invocations */
  run: <T>(fn: () => Promise<T> | T) => Promise<T | undefined>;
  /** Force-releases the lock (e.g. on unmount) */
  reset: () => void;
}

/**
 * Synchronous single-flight lock.
 * Unlike React `useState`, this locks in the exact same synchronous tick,
 * so even 100 programmatic/rapid clicks in 1ms will only execute `fn` once.
 */
export function createSingleFlightLock(): SingleFlightController {
  let locked = false;

  return {
    isLocked: () => locked,
    run: async <T>(fn: () => Promise<T> | T): Promise<T | undefined> => {
      if (locked) {
        return undefined;
      }
      locked = true;
      try {
        return await fn();
      } finally {
        locked = false;
      }
    },
    reset: () => {
      locked = false;
    },
  };
}

export interface SubmissionCheckResult {
  allowed: boolean;
  reason?: 'in_flight' | 'duplicate_payload' | 'rate_limited';
  retryAfterMs?: number;
}

export interface SubmissionGuardOptions {
  /** Minimum cooldown between any two submissions from the same client (ms) */
  cooldownMs?: number;
  /** Window during which an identical payload fingerprint is rejected as a duplicate (ms) */
  dedupeWindowMs?: number;
}

/**
 * Guards form submissions against:
 * 1. 50–100 simultaneous clicks (synchronous in-flight lock)
 * 2. Duplicate payload double-sends on slow networks (idempotency fingerprint)
 * 3. Rapid submission flooding (cooldown window)
 */
export function createSubmissionGuard(options: SubmissionGuardOptions = {}) {
  const cooldownMs = options.cooldownMs ?? 2500;
  const dedupeWindowMs = options.dedupeWindowMs ?? 45_000;

  let inFlight = false;
  let lastSubmittedAt = 0;
  const recentPayloads = new Map<string, number>();

  const normalizeFingerprint = (payload: Record<string, unknown>): string => {
    const sortedKeys = Object.keys(payload).sort();
    const parts = sortedKeys.map((k) => {
      const val = payload[k];
      if (Array.isArray(val)) {
        return `${k}:${[...val].sort().join(',')}`;
      }
      return `${k}:${String(val ?? '').trim().toLowerCase()}`;
    });
    return parts.join('|');
  };

  const cleanupOldFingerprints = (now: number) => {
    for (const [key, timestamp] of recentPayloads.entries()) {
      if (now - timestamp > dedupeWindowMs) {
        recentPayloads.delete(key);
      }
    }
  };

  return {
    canSubmit(
      payload: Record<string, unknown>,
      now: number = Date.now()
    ): SubmissionCheckResult {
      if (inFlight) {
        return { allowed: false, reason: 'in_flight' };
      }

      cleanupOldFingerprints(now);

      const elapsed = now - lastSubmittedAt;
      if (lastSubmittedAt > 0 && elapsed < cooldownMs) {
        return {
          allowed: false,
          reason: 'rate_limited',
          retryAfterMs: cooldownMs - elapsed,
        };
      }

      const fingerprint = normalizeFingerprint(payload);
      const previousTime = recentPayloads.get(fingerprint);
      if (previousTime !== undefined && now - previousTime < dedupeWindowMs) {
        return {
          allowed: false,
          reason: 'duplicate_payload',
          retryAfterMs: dedupeWindowMs - (now - previousTime),
        };
      }

      return { allowed: true };
    },

    async execute<T>(
      payload: Record<string, unknown>,
      task: () => Promise<T> | T,
      now: number = Date.now()
    ): Promise<{ status: SubmissionCheckResult; result?: T }> {
      const check = this.canSubmit(payload, now);
      if (!check.allowed) {
        return { status: check };
      }

      inFlight = true;
      const fingerprint = normalizeFingerprint(payload);
      try {
        const result = await task();
        const completedAt = Date.now();
        lastSubmittedAt = completedAt;
        recentPayloads.set(fingerprint, completedAt);
        return { status: { allowed: true }, result };
      } finally {
        inFlight = false;
      }
    },

    isInFlight: () => inFlight,

    reset: () => {
      inFlight = false;
      lastSubmittedAt = 0;
      recentPayloads.clear();
    },
  };
}

/**
 * Synchronous click throttle so 50–100 rapid clicks on carousel/navigation buttons
 * execute smoothly at a controlled cadence without queueing 100 animations.
 * Supports both `createClickThrottle(intervalMs)` and `createClickThrottle(fn, intervalMs)`.
 */
export interface ClickThrottleController<T extends (...args: any[]) => any = () => void> {
  (...args: Parameters<T>): ReturnType<T> | undefined;
  shouldAllow: (now?: number) => boolean;
  reset: () => void;
}

export function createClickThrottle<T extends (...args: any[]) => any = () => void>(
  fnOrInterval?: T | number,
  maybeIntervalMs?: number
): ClickThrottleController<T> {
  const fn = typeof fnOrInterval === 'function' ? fnOrInterval : undefined;
  const intervalMs =
    typeof fnOrInterval === 'number'
      ? fnOrInterval
      : (maybeIntervalMs ?? 220);

  let lastClickTime = -Infinity;

  const shouldAllow = (now: number = Date.now()): boolean => {
    if (now - lastClickTime < intervalMs) {
      return false;
    }
    lastClickTime = now;
    return true;
  };

  const reset = () => {
    lastClickTime = -Infinity;
  };

  const callable = ((...args: Parameters<T>): ReturnType<T> | undefined => {
    if (!shouldAllow()) {
      return undefined;
    }
    return fn ? fn(...args) : undefined;
  }) as ClickThrottleController<T>;

  callable.shouldAllow = shouldAllow;
  callable.reset = reset;

  return callable;
}

/**
 * Wraps a promise with a hard timeout so slow internet never leaves UI spinners
 * stuck forever.
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  fallbackValue: T
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | null = null;
  try {
    return await Promise.race([
      promise,
      new Promise<T>((resolve) => {
        timer = setTimeout(() => resolve(fallbackValue), timeoutMs);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}
