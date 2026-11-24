export function isChunkLoadError(error: unknown): boolean {
  if (!error) return false;
  const name =
    typeof error === 'object' && 'name' in error ? String((error as { name?: unknown }).name || '') : '';
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : typeof error === 'object' && 'message' in error
          ? String((error as { message?: unknown }).message || '')
          : '';

  const combined = `${name} ${message}`.toLowerCase();
  return (
    combined.includes('chunkloaderror') ||
    combined.includes('loading chunk') ||
    combined.includes('failed to fetch dynamically imported module') ||
    combined.includes('importing a module script failed') ||
    combined.includes('error loading dynamically imported module') ||
    combined.includes('unable to preload css')
  );
}

export function getFriendlyErrorDetails(error: unknown): {
  title: string;
  description: string;
  isNetworkChunkError: boolean;
} {
  const isNetworkChunkError = isChunkLoadError(error);
  if (isNetworkChunkError) {
    return {
      title: 'Connection Interrupted While Loading Page',
      description:
        'A page module could not finish downloading—often caused by an unstable mobile connection or a recent site update. Tap Reload Page to fetch the latest version.',
      isNetworkChunkError: true,
    };
  }

  return {
    title: 'Something Went Wrong',
    description:
      'An unexpected error interrupted this view. Reload the page or return to the homepage to continue browsing.',
    isNetworkChunkError: false,
  };
}
