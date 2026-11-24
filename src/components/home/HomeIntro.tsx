
import React, { useState, useEffect, useCallback, useRef } from 'react';
import IntroAnimation from '../ui/IntroAnimation';
import { getDevicePerformanceProfile } from '@/utils/devicePerformance';

interface HomeIntroProps {
  onIntroComplete: () => void;
}

const INTRO_SHOWN_KEY = 'zogago_intro_shown';

const HomeIntro: React.FC<HomeIntroProps> = ({ onIntroComplete }) => {
  const [showIntro, setShowIntro] = useState(false);
  const completedRef = useRef(false);

  const finishIntro = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setShowIntro(false);
    onIntroComplete();
  }, [onIntroComplete]);

  useEffect(() => {
    const profile = getDevicePerformanceProfile();

    let introShown = false;
    try {
      introShown =
        localStorage.getItem(INTRO_SHOWN_KEY) === 'true' ||
        sessionStorage.getItem('introCompleted') === 'true';
    } catch {
      introShown = true;
    }

    if (introShown || !profile.shouldShowIntro) {
      finishIntro();
      return;
    }

    setShowIntro(true);
    try {
      localStorage.setItem(INTRO_SHOWN_KEY, 'true');
      sessionStorage.setItem('introCompleted', 'true');
    } catch {
      // Ignore storage quota / private mode errors
    }

    // Hard safety timeout so slow devices/networks never get stuck on intro screen
    const safetyTimer = window.setTimeout(() => {
      finishIntro();
    }, 3200);

    return () => window.clearTimeout(safetyTimer);
  }, [finishIntro]);

  if (!showIntro) return null;

  return <IntroAnimation onAnimationComplete={finishIntro} />;
};

export default HomeIntro;
