const PLACEHOLDER_TOKENS = [
  'YOUR_PRODUCTION_WEBHOOK_URL',
  'YOUR_WEBHOOK_URL',
  'REPLACE_ME',
];

export const DEFAULT_N8N_WEBHOOK_URL =
  'https://kiikumano.app.n8n.cloud/webhook/2511481e-0f0a-48eb-8289-45035658740f/chat';

export function resolveN8nWebhookUrl(raw?: string): string | null {
  const trimmed = raw?.trim();
  if (!trimmed) return null;

  if (PLACEHOLDER_TOKENS.some((token) => trimmed.toUpperCase().includes(token))) {
    return null;
  }

  try {
    const parsed = new URL(trimmed);
    const isHttps = parsed.protocol === 'https:';
    const isLocalHttp =
      parsed.protocol === 'http:' &&
      (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1');

    if (!isHttps && !isLocalHttp) {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

export function getEffectiveN8nWebhookUrl(envValue?: string): string | null {
  const trimmed = envValue?.trim();
  if (!trimmed) {
    return resolveN8nWebhookUrl(DEFAULT_N8N_WEBHOOK_URL);
  }
  return resolveN8nWebhookUrl(trimmed);
}

export function shouldLoadChatWidget(params: {
  webhookUrl?: string;
  pathname: string;
  isOnline: boolean;
}): boolean {
  if (!params.isOnline) return false;
  if (params.pathname.startsWith('/admin')) return false;
  return Boolean(resolveN8nWebhookUrl(params.webhookUrl));
}
