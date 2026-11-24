import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';
import { useContactForm } from '@/hooks/useContactForm';
import ContactFormPopup from '../ui/ContactFormPopup';
import { createClickThrottle } from '@/utils/requestGuard';
import ZogagoLogo from '@/components/ui/ZogagoLogo';
import PWAInstallButton from '@/components/pwa/PWAInstallButton';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { ref } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { contactOpen, setContactOpen, geminiApiKey, setGeminiApiKey } =
    useContactForm();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      const delta = y - lastScrollY.current;
      if (y < 60 || isOpen) {
        setHidden(false);
      } else if (delta > 0 && y > 80) {
        setHidden(true);
      } else if (delta < -10) {
        setHidden(false);
      }
      if (Math.abs(delta) > 10 || y < 60) lastScrollY.current = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToServices: true } });
    } else {
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
    setIsOpen(false);
  };

  const scrollToReviews = (e: React.MouseEvent) => {
    e.preventDefault();

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToReviews: true } });
    } else {
      const reviewsSection = document.getElementById('reviews');
      if (reviewsSection) {
        reviewsSection.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
    setIsOpen(false);
  };

  const handleGetStarted = useRef(
    createClickThrottle(() => {
      setContactOpen(true);
      setIsOpen(false);
    }, 250)
  ).current;

  useEffect(() => {
    if (location.pathname === '/' && location.state) {
      window.history.replaceState({}, document.title);
      setTimeout(() => {
        if (location.state.scrollToReviews) {
          const reviewsSection = document.getElementById('reviews');
          if (reviewsSection) {
            reviewsSection.scrollIntoView({
              behavior: 'smooth',
            });
          }
        } else if (location.state.scrollToServices) {
          const servicesSection = document.getElementById('services');
          if (servicesSection) {
            servicesSection.scrollIntoView({
              behavior: 'smooth',
            });
          }
        }
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <>
      <header
        ref={ref}
        className={`py-2.5 sm:py-3 ${
          isOpen
            ? 'bg-[#0B0F1A] border-b border-white/10'
            : scrolled
              ? 'bg-white/[0.04] backdrop-blur-xl border-b border-white/10 shadow-md'
              : 'bg-white/[0.02] backdrop-blur-md border-b border-white/[0.05]'
        } ${
          hidden && !isOpen
            ? '-translate-y-full opacity-0'
            : 'translate-y-0 opacity-100'
        } fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ease-in-out`}
      >
        <div className="zg-container">
          <div className="flex justify-between items-center gap-4">
            <Link
              to="/"
              aria-label="Zogago Visuals Home"
              className="z-50 inline-flex items-center group shrink-0"
            >
              <ZogagoLogo
                variant="full"
                className="h-7 sm:h-8 md:h-9 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <div className="hidden md:flex items-center gap-3.5 lg:gap-4 text-sm font-medium">
              <Link
                to="/"
                className="text-white/90 hover:text-primary transition-colors whitespace-nowrap"
              >
                Home
              </Link>
              <a
                href="#services"
                onClick={scrollToServices}
                className="text-white/90 hover:text-primary transition-colors whitespace-nowrap"
              >
                Services
              </a>
              <Link
                to="/case-studies"
                className="text-white/90 hover:text-primary transition-colors whitespace-nowrap"
              >
                Case Studies
              </Link>
              <Link
                to="/about"
                className="text-white/90 hover:text-primary transition-colors whitespace-nowrap"
              >
                About
              </Link>
              <Link
                to="/faq"
                className="text-white/90 hover:text-primary transition-colors whitespace-nowrap"
              >
                FAQ
              </Link>
              <Link
                to="/reviews"
                className="text-white/90 hover:text-primary transition-colors whitespace-nowrap"
              >
                Reviews
              </Link>

              {/* Get Started button */}
              <Button
                onClick={handleGetStarted}
                className="button-glow transition-all duration-300 ml-1 px-4 py-2 text-sm h-9"
              >
                <span>Get Started</span>
              </Button>
            </div>

            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:bg-white/10"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-viewport opaque mobile navigation drawer rendered outside header transform context */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-[55] bg-[#0B0F1A] pt-24 pb-8 px-6 md:hidden flex flex-col justify-between overflow-y-auto"
          >
            <div className="flex flex-col divide-y divide-white/10">
              <Link
                to="/"
                className="py-4 text-lg font-medium text-white hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <div className="py-4 flex flex-col space-y-3">
                <a
                  href="#services"
                  className="text-lg font-medium text-white hover:text-primary transition-colors"
                  onClick={scrollToServices}
                >
                  Services
                </a>
                <Link
                  to="/services"
                  className="text-white/75 hover:text-primary transition-colors text-sm pl-3 border-l border-white/15"
                  onClick={() => setIsOpen(false)}
                >
                  All Services Overview
                </Link>
              </div>
              <Link
                to="/case-studies"
                className="py-4 text-lg font-medium text-white hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Case Studies
              </Link>
              <Link
                to="/about"
                className="py-4 text-lg font-medium text-white hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/faq"
                className="py-4 text-lg font-medium text-white hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
              <Link
                to="/reviews"
                className="py-4 text-lg font-medium text-white hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Reviews
              </Link>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <Button onClick={handleGetStarted} className="button-glow w-full py-6 text-base">
                <span>Get Started</span>
              </Button>
              <PWAInstallButton className="w-full justify-center py-2.5" />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Contact Form Popup */}
      <ContactFormPopup
        open={contactOpen}
        onOpenChange={setContactOpen}
        geminiApiKey={geminiApiKey}
        onApiKeyChange={setGeminiApiKey}
      />
    </>
  );
};

export default Navbar;
