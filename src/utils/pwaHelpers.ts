export function detectStandaloneMode(
  matchMediaStandalone: boolean,
  navigatorStandalone?: boolean
): boolean {
  return Boolean(matchMediaStandalone || navigatorStandalone === true);
}

export function isIOSUserAgent(userAgent: string): boolean {
  return /iphone|ipad|ipod/i.test(userAgent);
}

export function getOfflineNotice(isOnline: boolean): string | null {
  if (isOnline) return null;
  return 'You are currently offline. Reconnect to the internet so your inquiry is delivered to our team.';
}
