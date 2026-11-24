import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveAdminAuthMode, verifyPreviewEnvCredentials } from './adminAuth';

test('resolveAdminAuthMode returns unconfigured when neither Supabase nor env credentials are set', () => {
  assert.equal(
    resolveAdminAuthMode({ supabaseConfigured: false }),
    'unconfigured'
  );
  assert.equal(
    resolveAdminAuthMode({ supabaseConfigured: false, previewEmail: 'admin@example.com' }),
    'unconfigured'
  );
});

test('resolveAdminAuthMode prefers supabase when configured and accepts valid preview env', () => {
  assert.equal(
    resolveAdminAuthMode({
      supabaseConfigured: true,
      previewEmail: 'admin@example.com',
      previewPassword: 'strong-password-123',
    }),
    'supabase'
  );
  assert.equal(
    resolveAdminAuthMode({
      supabaseConfigured: false,
      previewEmail: 'admin@example.com',
      previewPassword: 'strong-password-123',
    }),
    'preview-env'
  );
});

test('verifyPreviewEnvCredentials rejects missing env config and unconfigured defaults', () => {
  assert.equal(
    verifyPreviewEnvCredentials('admin@example.com', 'NotConfiguredPass123!'),
    false
  );
  assert.equal(
    verifyPreviewEnvCredentials(
      'Admin@Example.com ',
      'secret-pass-123',
      'admin@example.com',
      'secret-pass-123'
    ),
    true
  );
  assert.equal(
    verifyPreviewEnvCredentials(
      'admin@example.com',
      'wrong',
      'admin@example.com',
      'secret-pass-123'
    ),
    false
  );
});
