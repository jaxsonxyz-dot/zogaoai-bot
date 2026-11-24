import test from 'node:test';
import assert from 'node:assert/strict';
import {
  safeReadArray,
  safeWriteArray,
  clearMemoryFallbackKey,
  type StorageLike,
} from './safeStorage';

function createQuotaLimitedStorage(maxBytes: number): StorageLike {
  const data = new Map<string, string>();
  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => {
      if (value.length > maxBytes) {
        const err = new Error('QuotaExceededError');
        err.name = 'QuotaExceededError';
        throw err;
      }
      data.set(key, value);
    },
    removeItem: (key) => {
      data.delete(key);
    },
  };
}

test('evicts oldest items cleanly when storage quota is tight so newest item still saves', () => {
  const key = 'test_quota_messages';
  clearMemoryFallbackKey(key);

  // Each item ~55 chars -> 10 items ~560 chars; cap storage at 400 bytes
  const storage = createQuotaLimitedStorage(400);
  const items = Array.from({ length: 12 }, (_, i) => ({
    id: `msg-${i}`,
    text: `Hello message payload #${i}`,
  }));

  const res = safeWriteArray(key, items, 50, storage);
  assert.equal(res.persistedToStorage, true);
  assert.equal(res.usedMemoryFallback, false);
  assert.ok(res.storedCount <= 5 && res.storedCount >= 1);

  const saved = safeReadArray<{ id: string; text: string }>(key, storage);
  assert.equal(saved[saved.length - 1].id, 'msg-11');
});

test('falls back to in-memory cache when storage is completely blocked/full (0 bytes)', () => {
  const key = 'test_blocked_storage';
  clearMemoryFallbackKey(key);

  const blockedStorage = createQuotaLimitedStorage(0);
  const res = safeWriteArray(key, [{ id: 'latest', text: 'kept' }], 50, blockedStorage);

  assert.equal(res.persistedToStorage, false);
  assert.equal(res.usedMemoryFallback, true);

  const readBack = safeReadArray<{ id: string; text: string }>(key, blockedStorage);
  assert.equal(readBack.length, 1);
  assert.equal(readBack[0].id, 'latest');
});
