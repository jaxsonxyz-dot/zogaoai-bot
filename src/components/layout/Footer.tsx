import React, { useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Mail,
  ArrowUpRight,
  ArrowUp,
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
  Check,
  Copy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { createClickThrottle } from '@/utils/requestGuard';
import ZogagoLogo from '@/components/ui/ZogagoLogo';
import PWAInstallButton from '@/components/pwa/PWAInstallButton';

const Footer: React.FC = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = React.useState(false);

  const throttledCopy = useRef(
    createClickThrottle(() => {
      try {
        navigator.clipboard?.writeText('contact@zogagovisuals.com');
      } catch {
        // Ignore clipboard errors in restricted browsers
      }
      setCopied(true);
      toast({
        title: 'Email Copied',
        description: 'contact@zogagovisuals.com copied to clipboard',
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    }, 1000)
  ).current;

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    throttledCopy();
  };

  const handleContactClick = useRef(
    createClickThrottle(() => {
      if (location.pathname === '/') {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      navigate('/contact');
    }, 300)
  ).current;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="footer"
      className="relative border-t border-white/10 bg-white/[0.02] backdrop-blur-md bg-gradient-to-b from-zogago-dark/90 via-black/40 to-black/90 pt-16 md:pt-20 pb-10 text-zogago-light overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-32 left-1/4 w-[450px] h-[260px] rounded-full bg-zogago-blue/5 blur-[120px]" />
      <div className="pointer-events-none absolute -top-24 right-1/4 w-[420px] h-[260px] rounded-full bg-zogago-purple/5 blur-[130px]" />

      <div className="zg-container relative z-10">
        {/* Pre-Footer Action Banner */}
        <div className="mb-14 pb-12 border-b border-white/10">
          <div className="glass-card bg-white/[0.03] backdrop-blur-md p-8 md:p-10 relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="pointer-events-none absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-zogago-blue/10 to-zogago-purple/10 rounded-full blur-[80px]" />

            <div className="max-w-2xl relative z-10">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zogago-blue mb-2.5">
                Build What&apos;s Next
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white leading-tight mb-3">
                Have an idea?{' '}
                <span className="text-gradient-blue">Let&apos;s make it happen.</span>
              </h2>
              <p className="text-sm md:text-base text-zogago-light/70 leading-relaxed">
                From websites and e-commerce stores to brand identity, 3D
                visualization, and AI automation—let&apos;s turn your vision into a
                digital experience built for growth.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto relative z-10">
              <Button
                onClick={handleContactClick}
                className="button-glow group px-7 py-3 text-sm font-medium w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Let&apos;s Talk About Your Project
                  <ArrowUpRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Button>
              <a
                href="mailto:contact@zogagovisuals.com"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-white/15 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-zogago-blue/40 rounded-xl px-5 py-3 text-white text-sm"
                >
                  <Mail className="mr-2 w-4 h-4 text-zogago-blue" />
                  <span>Email Us</span>
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Main 4-Column Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
          {/* Column 1: Brand & Studio Identity (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link
              to="/"
              className="inline-flex items-center group mb-5"
              aria-label="Zogago Visuals Home"
            >
              <ZogagoLogo
                variant="full"
                className="h-9 sm:h-10 md:h-11 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <p className="text-sm text-zogago-light/70 leading-relaxed mb-6 max-w-sm">
              A creative and digital agency helping startups and growing businesses
              stand out with custom websites, Shopify stores, brand design, photo
              retouching, 3D visualization, and AI automation.
            </p>

            {/* Availability Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for new commissions</span>
            </div>

            {/* Social Connect */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zogago-light/50 mb-3">
                Connect
              </p>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/zogago-6b2009358?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zogago-light/70 hover:text-white hover:border-zogago-blue/50 hover:bg-zogago-blue/15 transition-all duration-300"
                >
                  <Linkedin size={17} />
                </a>
                <a
                  href="https://www.instagram.com/zogagovisuals/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zogago-light/70 hover:text-white hover:border-zogago-blue/50 hover:bg-zogago-blue/15 transition-all duration-300"
                >
                  <Instagram size={17} />
                </a>
                <a
                  href="https://x.com/zogagovisuals?s=03"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zogago-light/70 hover:text-white hover:border-zogago-blue/50 hover:bg-zogago-blue/15 transition-all duration-300"
                >
                  <Twitter size={17} />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61574806213572"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zogago-light/70 hover:text-white hover:border-zogago-blue/50 hover:bg-zogago-blue/15 transition-all duration-300"
                >
                  <Facebook size={17} />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Disciplines & Services (3 cols) */}
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zogago-blue mb-4">
              Disciplines
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/services/graphics-design"
                  className="text-zogago-light/70 hover:text-white hover:translate-x-1 inline-flex items-center transition-all duration-200"
                >
                  Graphics &amp; Brand Identity
                </Link>
              </li>
              <li>
                <Link
                  to="/services/web-development"
                  className="text-zogago-light/70 hover:text-white hover:translate-x-1 inline-flex items-center transition-all duration-200"
                >
                  Web Design &amp; Development
                </Link>
              </li>
              <li>
                <Link
                  to="/services/ai-automation"
                  className="text-zogago-light/70 hover:text-white hover:translate-x-1 inline-flex items-center transition-all duration-200"
                >
                  AI Agents &amp; Automation
                </Link>
              </li>
              <li>
                <Link
                  to="/services/ecommerce"
                  className="text-zogago-light/70 hover:text-white hover:translate-x-1 inline-flex items-center transition-all duration-200"
                >
                  E-Commerce Solutions
                </Link>
              </li>
              <li>
                <Link
                  to="/services/architecture"
                  className="text-zogago-light/70 hover:text-white hover:translate-x-1 inline-flex items-center transition-all duration-200"
                >
                  Architecture Visualization
                </Link>
              </li>
              <li>
                <Link
                  to="/services/photo-editing"
                  className="text-zogago-light/70 hover:text-white hover:translate-x-1 inline-flex items-center transition-all duration-200"
                >
                  Photo Retouching &amp; Post
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Studio Navigation (2 cols) */}
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zogago-purple mb-4">
              Studio
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-zogago-light/70 hover:text-white hover:translate-x-1 inline-flex items-center transition-all duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/case-studies"
                  className="text-zogago-light/70 hover:text-white hover:translate-x-1 inline-flex items-center transition-all duration-200"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-zogago-light/70 hover:text-white hover:translate-x-1 inline-flex items-center transition-all duration-200"
                >
                  All Services
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-zogago-light/70 hover:text-white hover:translate-x-1 inline-flex items-center transition-all duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-zogago-light/70 hover:text-white hover:translate-x-1 inline-flex items-center transition-all duration-200"
                >
                  FAQ &amp; Policies
                </Link>
              </li>
              <li>
                <Link
                  to="/reviews"
                  className="text-zogago-light/70 hover:text-white hover:translate-x-1 inline-flex items-center transition-all duration-200"
                >
                  Reviews &amp; Proof
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-zogago-light/70 hover:text-white hover:translate-x-1 inline-flex items-center transition-all duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Inquiries & Details (3 cols) */}
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zogago-pink mb-4">
              Direct Inquiries
            </p>
            <div className="space-y-4 text-sm">
              <div className="glass-card p-4 rounded-xl border border-white/10">
                <p className="text-xs text-zogago-light/60 mb-1.5">
                  Project Inquiries &amp; Briefs
                </p>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href="mailto:contact@zogagovisuals.com"
                    className="text-white hover:text-zogago-blue font-medium transition-colors break-all text-xs sm:text-sm"
                  >
                    contact@zogagovisuals.com
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="p-1.5 rounded-md hover:bg-white/10 text-zogago-light/60 hover:text-white transition-colors shrink-0"
                    title="Copy email"
                  >
                    {copied ? (
                      <Check size={14} className="text-emerald-400" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-zogago-light/60">
                <p>· Managed creative direction &amp; single point of contact</p>
                <p>· Fast turnarounds &amp; specialist-led delivery</p>
                <p>· Typical response time within 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal & Back to Top */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zogago-light/50">
          <p>© {new Date().getFullYear()} Zogago. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <PWAInstallButton />
            <Link
              to="/privacy-policy"
              className="hover:text-zogago-blue transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-white/20">·</span>
            <Link
              to="/terms-and-conditions"
              className="hover:text-zogago-blue transition-colors"
            >
              Terms &amp; Conditions
            </Link>
            <span className="text-white/20">·</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp
                size={13}
                className="transition-transform duration-200 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
