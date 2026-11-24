import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { getEffectiveN8nWebhookUrl, shouldLoadChatWidget } from '@/utils/n8nChat';

const N8N_CHAT_CSS_ID = 'zogago-n8n-chat-css';
const N8N_CHAT_STYLESHEET =
  'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
const N8N_CHAT_MODULE =
  'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

type CreateChatFn = (options: Record<string, unknown>) => unknown;

export const ZogagoChatBot: React.FC = () => {
  const { pathname } = useLocation();
  const isOnline = useOnlineStatus();
  const initializedRef = useRef(false);

  const rawWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL as
    | string
    | undefined;
  const webhookUrl = getEffectiveN8nWebhookUrl(rawWebhookUrl);
  const canShow = shouldLoadChatWidget({
    webhookUrl: webhookUrl ?? undefined,
    pathname,
    isOnline,
  });

  useEffect(() => {
    if (!canShow || !webhookUrl || initializedRef.current) {
      return;
    }

    let cancelled = false;
    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;

    const loadChatWidget = async () => {
      if (cancelled || initializedRef.current) return;

      if (!document.getElementById(N8N_CHAT_CSS_ID)) {
        const link = document.createElement('link');
        link.id = N8N_CHAT_CSS_ID;
        link.rel = 'stylesheet';
        link.href = N8N_CHAT_STYLESHEET;
        document.head.appendChild(link);
      }

      try {
        const mod = (await import(/* @vite-ignore */ N8N_CHAT_MODULE)) as {
          createChat?: CreateChatFn;
        };
        if (cancelled || typeof mod.createChat !== 'function') return;

        initializedRef.current = true;
        mod.createChat({
          webhookUrl,
          target: '#zogago-n8n-chat',
          mode: 'window',
          defaultLanguage: 'en',
          showWelcomeScreen: false,
          initialMessages: [
            'Hi there! Welcome to Zogago.',
            'Ask me anything about websites, Shopify stores, branding, 3D visuals, timelines, or starting a project.',
          ],
          i18n: {
            en: {
              title: 'Zogago Assistant',
              subtitle: 'Creative & Digital Agency Support',
              footer: '',
              getStarted: 'New Conversation',
              inputPlaceholder: 'Ask about services, timelines, or pricing...',
            },
          },
        });
      } catch (err) {
        console.warn('Zogago chat widget could not be loaded:', err);
      }
    };

    const win = window as Window & {
      requestIdleCallback?: (
        cb: () => void,
        opts?: { timeout: number }
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof win.requestIdleCallback === 'function') {
      idleHandle = win.requestIdleCallback(() => void loadChatWidget(), {
        timeout: 2000,
      });
    } else {
      timeoutHandle = window.setTimeout(() => void loadChatWidget(), 1200);
    }

    return () => {
      cancelled = true;
      if (idleHandle !== undefined && typeof win.cancelIdleCallback === 'function') {
        win.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== undefined) {
        window.clearTimeout(timeoutHandle);
      }
    };
  }, [canShow, webhookUrl]);

  if (!webhookUrl) {
    return null;
  }

  return (
    <div
      id="zogago-n8n-chat"
      className={canShow ? 'zogago-chat-root' : 'hidden'}
      aria-hidden={!canShow}
    />
  );
};

export default ZogagoChatBot;
