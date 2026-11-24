import React, { useState } from 'react';
import { Download, Share, X } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';

interface PWAInstallButtonProps {
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className={`inline-flex items-center gap-1.5 rounded-lg border border-zogago-blue/40 bg-zogago-blue/10 px-3 py-1.5 text-xs font-medium text-zogago-blue transition-colors hover:bg-zogago-blue/20 ${className}`}
      >
        <Download size={13} />
        <span>Install App</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className={`inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zogago-light/80 transition-colors hover:bg-white/[0.08] hover:text-white ${className}`}
        >
          <Share size={13} />
          <span>Install App</span>
        </button>

        {showIOSGuide && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Install Zogago on iPhone or iPad"
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-4"
          >
            <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-[#0B0F1A] p-6 text-left shadow-2xl">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-white">
                  Install Zogago App
                </h3>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  aria-label="Close installation guide"
                  className="rounded-md p-1 text-zogago-light/60 hover:bg-white/10 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="text-sm leading-relaxed text-zogago-light/80">
                1. Tap the <strong>Share</strong> button in Safari&apos;s toolbar.
                <br />
                2. Scroll down and select <strong>Add to Home Screen</strong>.
              </p>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-lg border border-white/15 bg-white/[0.06] py-2 text-sm font-medium text-white hover:bg-white/10"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};

export default PWAInstallButton;
