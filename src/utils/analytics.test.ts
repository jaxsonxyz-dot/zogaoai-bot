import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveAnalyticsConfig } from './analytics';

test('resolveAnalyticsConfig returns empty config when env vars are unset or invalid', () => {
  assert.deepEqual(resolveAnalyticsConfig({}), {
    gaMeasurementId: undefined,
    plausibleDomain: undefined,
  });
  assert.deepEqual(
    resolveAnalyticsConfig({
      VITE_GA_MEASUREMENT_ID: 'invalid-id',
      VITE_PLAUSIBLE_DOMAIN: 'not a domain!',
    }),
    {
      gaMeasurementId: undefined,
      plausibleDomain: undefined,
    }
  );
});

test('resolveAnalyticsConfig accepts valid GA4 and Plausible configuration', () => {
  assert.deepEqual(
    resolveAnalyticsConfig({
      VITE_GA_MEASUREMENT_ID: ' G-ABCD1234EF ',
      VITE_PLAUSIBLE_DOMAIN: 'zogagovisuals.com',
    }),
    {
      gaMeasurementId: 'G-ABCD1234EF',
      plausibleDomain: 'zogagovisuals.com',
    }
  );
});
