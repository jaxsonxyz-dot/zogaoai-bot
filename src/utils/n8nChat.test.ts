import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_N8N_WEBHOOK_URL,
  getEffectiveN8nWebhookUrl,
  resolveN8nWebhookUrl,
  shouldLoadChatWidget,
} from './n8nChat';

test('resolveN8nWebhookUrl rejects empty, placeholder, and non-https URLs', () => {
  assert.equal(resolveN8nWebhookUrl(undefined), null);
  assert.equal(resolveN8nWebhookUrl(''), null);
  assert.equal(resolveN8nWebhookUrl('YOUR_PRODUCTION_WEBHOOK_URL'), null);
  assert.equal(resolveN8nWebhookUrl('https://example.com/YOUR_PRODUCTION_WEBHOOK_URL'), null);
  assert.equal(resolveN8nWebhookUrl('javascript:alert(1)'), null);
  assert.equal(resolveN8nWebhookUrl('http://insecure.example.com/webhook'), null);
});

test('resolveN8nWebhookUrl accepts valid https and local development webhook URLs', () => {
  assert.equal(
    resolveN8nWebhookUrl(' https://n8n.zogagovisuals.com/webhook/abc123/chat '),
    'https://n8n.zogagovisuals.com/webhook/abc123/chat'
  );
  assert.equal(
    resolveN8nWebhookUrl('http://localhost:5678/webhook/test/chat'),
    'http://localhost:5678/webhook/test/chat'
  );
});

test('getEffectiveN8nWebhookUrl falls back to configured Zogago webhook and supports env override or disable', () => {
  assert.equal(getEffectiveN8nWebhookUrl(undefined), DEFAULT_N8N_WEBHOOK_URL);
  assert.equal(getEffectiveN8nWebhookUrl('   '), DEFAULT_N8N_WEBHOOK_URL);
  assert.equal(getEffectiveN8nWebhookUrl('disabled'), null);
  assert.equal(
    getEffectiveN8nWebhookUrl('https://custom.n8n.cloud/webhook/override/chat'),
    'https://custom.n8n.cloud/webhook/override/chat'
  );
});

test('shouldLoadChatWidget disables chat on admin routes, offline state, or missing webhook', () => {
  const validUrl = 'https://n8n.zogagovisuals.com/webhook/123/chat';

  assert.equal(
    shouldLoadChatWidget({ webhookUrl: validUrl, pathname: '/', isOnline: true }),
    true
  );
  assert.equal(
    shouldLoadChatWidget({ webhookUrl: validUrl, pathname: '/admin', isOnline: true }),
    false
  );
  assert.equal(
    shouldLoadChatWidget({ webhookUrl: validUrl, pathname: '/admin/login', isOnline: true }),
    false
  );
  assert.equal(
    shouldLoadChatWidget({ webhookUrl: validUrl, pathname: '/', isOnline: false }),
    false
  );
  assert.equal(
    shouldLoadChatWidget({
      webhookUrl: 'YOUR_PRODUCTION_WEBHOOK_URL',
      pathname: '/',
      isOnline: true,
    }),
    false
  );
});
