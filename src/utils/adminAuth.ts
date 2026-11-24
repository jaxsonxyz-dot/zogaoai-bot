export interface AdminAuthConfig {
  supabaseConfigured: boolean;
  previewEmail?: string;
  previewPassword?: string;
}

export type AdminAuthMode = 'supabase' | 'preview-env' | 'unconfigured';

export function resolveAdminAuthMode(config: AdminAuthConfig): AdminAuthMode {
  const hasPreviewEmail = Boolean(config.previewEmail?.trim());
  const hasPreviewPassword = Boolean(config.previewPassword && config.previewPassword.length >= 8);

  if (config.supabaseConfigured) {
    return 'supabase';
  }
  if (hasPreviewEmail && hasPreviewPassword) {
    return 'preview-env';
  }
  return 'unconfigured';
}

export function verifyPreviewEnvCredentials(
  inputEmail: string,
  inputPassword: string,
  envEmail?: string,
  envPassword?: string
): boolean {
  const configuredEmail = envEmail?.trim().toLowerCase();
  const configuredPassword = envPassword;

  if (!configuredEmail || !configuredPassword || configuredPassword.length < 8) {
    return false;
  }

  return (
    inputEmail.trim().toLowerCase() === configuredEmail &&
    inputPassword === configuredPassword
  );
}
