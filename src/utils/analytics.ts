export interface AnalyticsConfig {
  gaMeasurementId?: string;
  plausibleDomain?: string;
}

const GA_ID_PATTERN = /^G-[A-Z0-9]{4,20}$/;
const DOMAIN_PATTERN = /^[a-z0-9.-]+\.[a-z]{2,}$/i;

export function resolveAnalyticsConfig(env: {
  VITE_GA_MEASUREMENT_ID?: string;
  VITE_PLAUSIBLE_DOMAIN?: string;
}): AnalyticsConfig {
  const rawGa = env.VITE_GA_MEASUREMENT_ID?.trim();
  const rawPlausible = env.VITE_PLAUSIBLE_DOMAIN?.trim();

  return {
    gaMeasurementId: rawGa && GA_ID_PATTERN.test(rawGa) ? rawGa : undefined,
    plausibleDomain:
      rawPlausible && DOMAIN_PATTERN.test(rawPlausible) ? rawPlausible : undefined,
  };
}

let initialized = false;

export function initAnalytics(env?: {
  VITE_GA_MEASUREMENT_ID?: string;
  VITE_PLAUSIBLE_DOMAIN?: string;
}): void {
  if (typeof window === 'undefined' || typeof document === 'undefined' || initialized) {
    return;
  }

  const metaEnv = env ?? {
    VITE_GA_MEASUREMENT_ID: import.meta.env.VITE_GA_MEASUREMENT_ID,
    VITE_PLAUSIBLE_DOMAIN: import.meta.env.VITE_PLAUSIBLE_DOMAIN,
  };
  const { gaMeasurementId, plausibleDomain } = resolveAnalyticsConfig(metaEnv);

  if (!gaMeasurementId && !plausibleDomain) {
    return;
  }

  initialized = true;

  if (gaMeasurementId) {
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}`;
    document.head.appendChild(gtagScript);

    const w = window as unknown as {
      dataLayer?: unknown[];
      gtag?: (...args: unknown[]) => void;
    };
    w.dataLayer = w.dataLayer || [];
    w.gtag = function gtag(...args: unknown[]) {
      w.dataLayer!.push(args);
    };
    w.gtag('js', new Date());
    w.gtag('config', gaMeasurementId, { anonymize_ip: true });
  }

  if (plausibleDomain) {
    const plausibleScript = document.createElement('script');
    plausibleScript.defer = true;
    plausibleScript.setAttribute('data-domain', plausibleDomain);
    plausibleScript.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(plausibleScript);
  }
}

export function trackPageView(path: string): void {
  if (typeof window === 'undefined') return;
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, opts?: Record<string, unknown>) => void;
  };
  if (typeof w.gtag === 'function') {
    w.gtag('event', 'page_view', { page_path: path });
  }
  if (typeof w.plausible === 'function') {
    w.plausible('pageview');
  }
}
