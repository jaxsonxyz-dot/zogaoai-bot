import test from 'node:test';
import assert from 'node:assert/strict';
import { assessDeviceProfile } from './devicePerformance';

test('flags <= 2GB RAM mobile device as low-end and disables heavy effects', () => {
  const profile = assessDeviceProfile({
    deviceMemory: 2,
    hardwareConcurrency: 4,
    viewportWidth: 375,
    devicePixelRatio: 3,
  });

  assert.equal(profile.isMobile, true);
  assert.equal(profile.isLowRam, true);
  assert.equal(profile.isLowEndDevice, true);
  assert.equal(profile.shouldEnableParticles, false);
  assert.equal(profile.shouldShowIntro, false);
  assert.equal(profile.shouldUseBlurEffects, false);
  assert.equal(profile.maxCanvasDpr, 1);
  assert.equal(profile.recommendedImageWidth, 640);
  assert.equal(profile.maxLocalStorageItems, 50);
});

test('flags save-data / 2g connection as low-end device', () => {
  const profile = assessDeviceProfile({
    deviceMemory: 8,
    hardwareConcurrency: 8,
    saveData: true,
    effectiveType: '2g',
    viewportWidth: 390,
  });

  assert.equal(profile.isSlowNetwork, true);
  assert.equal(profile.isLowEndDevice, true);
  assert.equal(profile.shouldEnableParticles, false);
  assert.equal(profile.shouldShowIntro, false);
});

test('caps DPR to 1 and disables blur layers even on mid/high mobile viewports', () => {
  const profile = assessDeviceProfile({
    deviceMemory: 6,
    hardwareConcurrency: 8,
    viewportWidth: 390,
    devicePixelRatio: 3,
  });

  assert.equal(profile.isMobile, true);
  assert.equal(profile.isLowEndDevice, false);
  assert.equal(profile.shouldEnableParticles, true);
  assert.equal(profile.shouldUseBlurEffects, false);
  assert.equal(profile.maxCanvasDpr, 1);
});

test('enables full visual fidelity on capable desktop browsers', () => {
  const profile = assessDeviceProfile({
    deviceMemory: 8,
    hardwareConcurrency: 8,
    viewportWidth: 1440,
    devicePixelRatio: 2,
  });

  assert.equal(profile.isMobile, false);
  assert.equal(profile.isLowEndDevice, false);
  assert.equal(profile.shouldEnableParticles, true);
  assert.equal(profile.shouldShowIntro, true);
  assert.equal(profile.shouldUseBlurEffects, true);
  assert.equal(profile.maxCanvasDpr, 2);
  assert.equal(profile.recommendedImageWidth, 1080);
  assert.equal(profile.maxLocalStorageItems, 150);
});
