import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle, Sparkles, Clock, ShieldCheck, Layers } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import GlitchText from '../ui/GlitchText';
import { useToast } from '@/hooks/use-toast';
import { saveContactMessage } from '@/lib/storage';
import { Checkbox } from '@/components/ui/checkbox';
import { triggerConfetti } from '@/utils/animations/confettiAnimation';
import { useGeminiAI } from '@/hooks/useGeminiAI';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { getOfflineNotice } from '@/utils/pwaHelpers';

interface AboutProps {
  geminiApiKey?: string;
  onApiKeyChange?: (key: string) => void;
}

const serviceOptions = [
  {
    id: 'webDevelopment',
    label: 'Web Design & Development',
    shortLabel: 'Web Dev',
  },
  {
    id: 'ecommerce',
    label: 'E-Commerce & Shopify',
    shortLabel: 'E-commerce',
  },
  {
    id: 'aiAutomation',
    label: 'AI Agents & Automation',
    shortLabel: 'AI & Auto',
  },
  {
    id: 'graphicsDesign',
    label: 'Graphics & Brand Identity',
    shortLabel: 'Graphics',
  },
  {
    id: 'photoEditing',
    label: 'Photo Editing & Retouching',
    shortLabel: 'Photo Edit',
  },
  {
    id: 'architecture',
    label: 'Architecture Visualization',
    shortLabel: 'Architecture',
  },
];

const onboardingSteps = [
  {
    step: '01',
    title: '24-Hour Brief & Brand Review',
    description:
      'We review your goals, current site or visual assets, and target audience before our first reply—no generic sales scripts.',
  },
  {
    step: '02',
    title: 'Clear Scope, Deliverables & Timeline',
    description:
      'You receive a transparent action plan outlining exact deliverables, milestone dates, and upfront pricing.',
  },
  {
    step: '03',
    title: 'Direct Specialist Execution',
    description:
      'Collaborate directly with your project lead through live interactive previews from initial concept to final launch.',
  },
];

const About: React.FC<AboutProps> = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    services: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const submittingRef = useRef(false);
  const isOnline = useOnlineStatus();
  const offlineNotice = getOfflineNotice(isOnline);
  const geminiAI = useGeminiAI();

  useEffect(() => {
    const aboutEl = aboutRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll('.animate-hidden');
    animatedElements.forEach((el) => observer.observe(el));
    if (aboutEl) {
      observer.observe(aboutEl);
    }

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
      if (aboutEl) observer.unobserve(aboutEl);
      observer.disconnect();
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => {
      const services = prev.services.includes(serviceId)
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId];
      return {
        ...prev,
        services,
      };
    });
  };

  const handleExpandText = async () => {
    try {
      const expandedText = await geminiAI.expandText(formData.message);
      setFormData((prev) => ({
        ...prev,
        message: expandedText,
      }));
      toast({
        title: 'Text Expanded',
        description: 'Your message has been enhanced with AI assistance',
        duration: 1500,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to expand text',
        variant: 'destructive',
        duration: 2000,
      });
    }
  };

  const handleCorrectGrammar = async () => {
    try {
      const result = await geminiAI.correctGrammar(formData.message);
      if (!result.hasErrors) {
        toast({
          title: 'Grammar Check Complete',
          description: 'Your text is already grammatically correct!',
          duration: 1500,
        });
        return;
      }
      setFormData((prev) => ({
        ...prev,
        message: result.correctedText,
      }));
      toast({
        title: 'Grammar Corrected',
        description: 'Your message has been proofread by AI',
        duration: 1500,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to correct grammar',
        variant: 'destructive',
        duration: 2000,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Synchronous single-flight lock: blocks 50-100 simultaneous clicks in the same millisecond
    if (submittingRef.current || isSubmitting) return;

    if (!acceptTerms) {
      toast({
        title: 'Terms Required',
        description: 'Please accept the Terms and Conditions and Privacy Policy to continue',
        variant: 'destructive',
        duration: 2000,
      });
      return;
    }

    if (!isOnline) {
      toast({
        title: 'No Internet Connection',
        description: 'Reconnect to submit your inquiry directly to our team.',
        variant: 'destructive',
        duration: 3000,
      });
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);

    const submittedName = formData.name.trim();
    saveContactMessage({
      name: submittedName,
      email: formData.email.trim(),
      message: formData.message.trim(),
      services: formData.services,
    });

    toast({
      title: 'Message sent!',
      description: `Thanks ${submittedName}! We'll be in touch soon.`,
      duration: 3000,
    });

    triggerConfetti();

    setTimeout(() => {
      submittingRef.current = false;
      setIsSubmitting(false);
      navigate('/thank-you', {
        state: {
          name: submittedName,
        },
        replace: true,
      });
    }, 1500);
  };

  return (
    <section id="about" ref={aboutRef} className="zg-section relative overflow-hidden">
      <div className="zg-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: High-Converting Client Onboarding Roadmap (No duplicate header copy) */}
          <div className="animate-hidden animate-slide-from-left">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-xs sm:text-sm font-medium text-zogago-light/85">
                Start a Project · What Happens Next
              </p>
            </div>

            <h2 className="zg-heading-lg mb-5">
              Turn Your Brief Into a{' '}
              <span className="text-gradient-blue">High-Performing</span>{' '}
              <span className="text-gradient-purple">Reality.</span>
            </h2>

            <p className="zg-paragraph mb-8">
              Hiring a creative and digital partner should feel effortless. Tell us what you are building, and we will guide you from initial scope to launch with complete clarity.
            </p>

            {/* 3-Step Client Onboarding Roadmap */}
            <div className="space-y-4 mb-8">
              {onboardingSteps.map((item, i) => (
                <div
                  key={item.step}
                  className="flex items-start gap-4 animate-hidden animate-fade-in-up rounded-xl bg-white/[0.02] backdrop-blur-md p-4 border border-white/10 hover:border-zogago-blue/40 transition-colors"
                  style={{
                    animationDelay: `${i * 150}ms`,
                    zIndex: 2,
                  }}
                >
                  <span className="font-mono text-sm font-bold px-2.5 py-1 rounded-lg bg-zogago-blue/15 border border-zogago-blue/30 text-zogago-blue shrink-0 mt-0.5">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zogago-light/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Client Assurance Strip */}
            <div
              className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 animate-hidden animate-fade-in-up text-xs sm:text-sm text-zogago-light/80"
              style={{
                animationDelay: '500ms',
              }}
            >
              <div className="inline-flex items-center gap-2">
                <Clock className="w-4 h-4 text-zogago-blue" />
                <span className="font-medium">Reply Within 24h</span>
              </div>
              <div className="h-4 w-px bg-white/10 hidden sm:block" />
              <div className="inline-flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-zogago-purple" />
                <span className="font-medium">NDA &amp; IP Protection</span>
              </div>
              <div className="h-4 w-px bg-white/10 hidden sm:block" />
              <div className="inline-flex items-center gap-2">
                <Layers className="w-4 h-4 text-zogago-pink" />
                <span className="font-medium">Custom Scope &amp; Roadmap</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Project Planner & Contact Form */}
          <div
            id="contact"
            className="glass-card bg-white/[0.03] backdrop-blur-xl p-5 sm:p-7 scroll-mt-28 animate-hidden animate-slide-from-right border border-white/10"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold">
                <GlitchText
                  text="Project Inquiry"
                  intensity="low"
                  glitchInterval={8000}
                  rgbShift={true}
                />
              </h3>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zogago-blue">
                Free Consultation
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zogago-light/65 mb-5">
              Select the capabilities you need and share a few details about your goals.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label
                  htmlFor="about-name"
                  className="block text-sm font-medium text-zogago-light/80 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="about-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-zogago-light text-sm focus:outline-none focus:ring-2 focus:ring-zogago-blue transition-all"
                  placeholder="Your name or company"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="about-email"
                  className="block text-sm font-medium text-zogago-light/80 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="about-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-zogago-light text-sm focus:outline-none focus:ring-2 focus:ring-zogago-blue transition-all"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zogago-light/80 mb-2">
                  <span className="inline-flex items-center gap-1">
                    <span className="text-gradient-purple font-semibold">
                      What Can We Build Together?
                    </span>
                    <span className="animate-pulse">✨</span>
                  </span>
                </label>
                <div
                  role="group"
                  aria-label="Select services of interest"
                  className="grid grid-cols-2 sm:grid-cols-3 gap-1.5"
                >
                  {serviceOptions.map((service) => {
                    const selected = formData.services.includes(service.id);
                    return (
                      <button
                        key={service.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => handleServiceToggle(service.id)}
                        className={`flex items-center justify-center text-center p-2 rounded-md cursor-pointer transition-all min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zogago-blue ${
                          selected
                            ? 'bg-zogago-blue/20 border border-zogago-blue/60 text-white'
                            : 'bg-white/5 border border-white/10 text-zogago-light/85 hover:bg-[#11B3EEE6]/20'
                        }`}
                      >
                        <span className="text-xs sm:text-sm leading-snug">
                          <span className="sm:hidden">{service.shortLabel}</span>
                          <span className="hidden sm:inline">{service.label}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="about-message"
                    className="block text-sm font-medium text-zogago-light/80"
                  >
                    Project Goals &amp; Timeline
                  </label>

                  {geminiAI.hasApiKey && (
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={handleExpandText}
                        disabled={geminiAI.isProcessing || !formData.message}
                        className="text-xs flex items-center py-1 px-2 rounded bg-zogago-blue/10 text-zogago-blue hover:bg-[#11B3EEE6]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Sparkles className="w-3 h-3 mr-1" />
                        Expand
                      </button>
                      <button
                        type="button"
                        onClick={handleCorrectGrammar}
                        disabled={geminiAI.isProcessing || !formData.message}
                        className="text-xs flex items-center py-1 px-2 rounded bg-zogago-blue/10 text-zogago-blue hover:bg-[#11B3EEE6]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Fix Grammar
                      </button>
                    </div>
                  )}
                </div>

                <textarea
                  id="about-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-zogago-light text-sm focus:outline-none focus:ring-2 focus:ring-zogago-blue transition-all"
                  placeholder={
                    geminiAI.isProcessing
                      ? 'Processing with AI...'
                      : 'Tell us about your project, goals, or desired launch timeline...'
                  }
                  required
                  disabled={geminiAI.isProcessing}
                />
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="about-terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  className="bg-white/10 border-white/20 mt-1"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="about-terms"
                    className="text-sm font-medium text-zogago-light/80 leading-tight cursor-pointer"
                  >
                    I accept the
                    <Link
                      to="/terms-and-conditions"
                      className="text-zogago-blue hover:text-zogago-blue/80 mx-1 underline"
                    >
                      Terms and Conditions
                    </Link>
                    and
                    <Link
                      to="/privacy-policy"
                      className="text-zogago-blue hover:text-zogago-blue/80 mx-1 underline"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>

              {offlineNotice && (
                <p className="rounded-lg border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
                  {offlineNotice}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !isOnline}
                className="button-glow w-full group disabled:opacity-60 disabled:pointer-events-none"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Request Project Roadmap
                      <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;