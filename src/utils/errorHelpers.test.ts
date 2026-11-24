import test from 'node:test';
import assert from 'node:assert/strict';
import { isChunkLoadError, getFriendlyErrorDetails } from './errorHelpers';

test('isChunkLoadError detects Vite and browser dynamic module failures', () => {
  assert.equal(
    isChunkLoadError(new TypeError('Failed to fetch dynamically imported module: https://example.com/assets/FAQ.js')),
    true
  );
  assert.equal(
    isChunkLoadError(new Error('Loading chunk 14 failed.')),
    true
  );
  assert.equal(
    isChunkLoadError({ name: 'ChunkLoadError', message: 'timeout' }),
    true
  );
  assert.equal(isChunkLoadError(new Error('Unexpected null pointer')), false);
  assert.equal(isChunkLoadError(null), false);
});

test('getFriendlyErrorDetails returns network guidance for chunk errors and generic message otherwise', () => {
  const chunkInfo = getFriendlyErrorDetails(
    new Error('Importing a module script failed.')
  );
  assert.equal(chunkInfo.isNetworkChunkError, true);
  assert.match(chunkInfo.title, /Connection Interrupted/i);

  const genericInfo = getFriendlyErrorDetails(new Error('Render error'));
  assert.equal(genericInfo.isNetworkChunkError, false);
  assert.match(genericInfo.title, /Something Went Wrong/i);
});
