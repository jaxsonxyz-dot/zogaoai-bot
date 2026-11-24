import test from 'node:test';
import assert from 'node:assert/strict';
import {
  detectStandaloneMode,
  isIOSUserAgent,
  getOfflineNotice,
} from './pwaHelpers';

test('detectStandaloneMode detects Chromium display-mode and iOS standalone flag', () => {
  assert.equal(detectStandaloneMode(true, false), true);
  assert.equal(detectStandaloneMode(false, true), true);
  assert.equal(detectStandaloneMode(false, false), false);
});

test('isIOSUserAgent identifies iPhone/iPad/iPod user agents', () => {
  assert.equal(isIOSUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)'), true);
  assert.equal(isIOSUserAgent('Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)'), true);
  assert.equal(isIOSUserAgent('Mozilla/5.0 (Linux; Android 14; Pixel 8)'), false);
});

test('getOfflineNotice returns warning text only when offline', () => {
  assert.equal(getOfflineNotice(true), null);
  assert.match(getOfflineNotice(false) || '', /offline/i);
});
