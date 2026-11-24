export interface DeviceCapabilitiesInput {
  deviceMemory?: number;
  hardwareConcurrency?: number;
  saveData?: boolean;
  effectiveType?: string;
  prefersReducedMotion?: boolean;
  viewportWidth?: number;
  devicePixelRatio?: number;
}

export interface DevicePerformanceProfile {
  isMobile: boolean;
  isLowRam: boolean;
  isLowCpu: boolean;
  isSlowNetwork: boolean;
  prefersReducedMotion: boolean;
  isLowEndDevice: boolean;
  shouldEnableParticles: boolean;
  shouldShowIntro: boolean;
  shouldUseBlurEffects: boolean;
  maxCanvasDpr: number;
  recommendedImageWidth: number;
  maxLocalStorageItems: number;
}

/**
 * Pure, framework-agnostic heuristic to assess whether the current mobile or
 * desktop device has constrained RAM, CPU, or network bandwidth.
 */
export function assessDeviceProfile(
  input: DeviceCapabilitiesInput
): DevicePerformanceProfile {
  const viewportWidth = input.viewportWidth ?? 1024;
  const isMobile = viewportWidth < 768;

  const isLowRam =
    typeof input.deviceMemory === 'number' && input.deviceMemory <= 2;

  // 2 cores anywhere, or <= 4 cores on mobile, typically signals budget hardware
  const isLowCpu =
    typeof input.hardwareConcurrency === 'number' &&
    (input.hardwareConcurrency <= 2 ||
      (isMobile && input.hardwareConcurrency <= 4));

  const isSlowNetwork =
    Boolean(input.saveData) ||
    input.effectiveType === 'slow-2g' ||
    input.effectiveType === '2g';

  const prefersReducedMotion = Boolean(input.prefersReducedMotion);

  const isLowEndDevice =
    isLowRam || isLowCpu || isSlowNetwork || prefersReducedMotion;

  const rawDpr = input.devicePixelRatio ?? 1;
  const maxCanvasDpr = isLowEndDevice || isMobile ? 1 : Math.min(rawDpr, 2);

  return {
    isMobile,
    isLowRam,
    isLowCpu,
    isSlowNetwork,
    prefersReducedMotion,
    isLowEndDevice,
    shouldEnableParticles: !isLowEndDevice,
    shouldShowIntro: !isLowEndDevice,
    shouldUseBlurEffects: !isLowEndDevice && !isMobile,
    maxCanvasDpr,
    recommendedImageWidth: isMobile || isLowEndDevice ? 640 : 1080,
    maxLocalStorageItems: isMobile || isLowEndDevice ? 50 : 150,
  };
}

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: {
    saveData?: boolean;
    effectiveType?: string;
  };
};

export function getDevicePerformanceProfile(): DevicePerformanceProfile {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return assessDeviceProfile({});
  }

  const nav = navigator as NavigatorWithHints;
  const prefersReducedMotion = Boolean(
    window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  );

  return assessDeviceProfile({
    deviceMemory: nav.deviceMemory,
    hardwareConcurrency: nav.hardwareConcurrency,
    saveData: nav.connection?.saveData,
    effectiveType: nav.connection?.effectiveType,
    prefersReducedMotion,
    viewportWidth: window.innerWidth,
    devicePixelRatio: window.devicePixelRatio,
  });
}

export function applyDevicePerformanceClass(): DevicePerformanceProfile {
  const profile = getDevicePerformanceProfile();
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.classList.toggle('low-power-device', profile.isLowEndDevice);
    root.dataset.lowRam = profile.isLowRam ? 'true' : 'false';
  }
  return profile;
}
