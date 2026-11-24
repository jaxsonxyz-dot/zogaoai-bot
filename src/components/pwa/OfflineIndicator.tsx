import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 z-[70] flex items-center gap-2 rounded-lg border border-amber-400/35 bg-[#0B0F1A]/95 px-3 py-2 text-xs font-medium text-amber-200 shadow-lg"
    >
      <WifiOff size={14} className="text-amber-400 shrink-0" />
      <span>Offline Mode — Viewing cached pages</span>
    </div>
  );
};

export default OfflineIndicator;
