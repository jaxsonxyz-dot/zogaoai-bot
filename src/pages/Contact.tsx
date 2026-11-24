import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Send } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useToast } from '@/hooks/use-toast';
import { saveContactMessage } from '@/lib/storage';
import { triggerConfetti } from '@/utils/animations/confettiAnimation';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { getOfflineNotice } from '@/utils/pwaHelpers';

const serviceOptions = [
  { id: 'webDevelopment', label: 'Web Design & Development', shortLabel: 'Web Dev' },
  { id: 'ecommerce', label: 'E-Commerce & Shopify', shortLabel: 'E-commerce' },
  { id: 'aiAutomation', label: 'AI Agents & Automation', shortLabel: 'AI & Auto' },
  { id: 'graphicsDesign', label: 'Graphics & Brand Identity', shortLabel: 'Graphics' },
  { id: 'photoEditing', label: 'Photo Editing & Retouching', shortLabel: 'Photo Edit' },
  { id: 'architecture', label: 'Architecture Visualization', shortLabel: 'Architecture' },
];

const Contact = () => {
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
  const submittingRef = useRef(false);
  const isOnline = useOnlineStatus();
  const offlineNotice = getOfflineNotice(isOnline);

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
      return { ...prev, services };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Synchronous lock: prevents 50-100 rapid clicks from firing duplicate submissions
    if (submittingRef.current || isSubmitting) return;

    if (!acceptTerms) {
      toast({
        title: 'Terms Required',
        description:
          'Please accept the Terms and Conditions and Privacy Policy to continue.',
        variant: 'destructive',
        duration: 2500,
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
      setFormData({
        name: '',
        email: '',
        message: '',
        services: [],
      });
      setAcceptTerms(false);
      navigate('/thank-you', {
        state: { name: submittedName },
        replace: true,
      });
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-zogago-dark py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zogago-blue to-zogago-purple">
              Contact Us
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-zogago-light/70 max-w-3xl mx-auto px-2">
              Get in touch with our team for inquiries, collaborations, or to discuss
              your next project.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card p-4 sm:p-6 md:p-8 border border-white/10"
            >
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label
                    htmlFor="contact-page-name"
                    className="block text-sm font-medium text-zogago-light/80 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="contact-page-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-zogago-light focus:outline-none focus:ring-2 focus:ring-zogago-blue transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-page-email"
                    className="block text-sm font-medium text-zogago-light/80 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="contact-page-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-zogago-light focus:outline-none focus:ring-2 focus:ring-zogago-blue transition-all"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zogago-light/80 mb-2">
                    Services (Select all that apply)
                  </label>
                  <div
                    role="group"
                    aria-label="Select services of interest"
                    className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5"
                  >
                    {serviceOptions.map((service) => {
                      const selected = formData.services.includes(service.id);
                      return (
                        <button
                          key={service.id}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => handleServiceToggle(service.id)}
                          className={`flex items-center justify-center text-center px-2 py-2.5 sm:px-2.5 sm:py-3 rounded-md cursor-pointer transition-all min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zogago-blue ${
                            selected
                              ? 'bg-zogago-blue/20 border border-zogago-blue/60 text-white'
                              : 'bg-white/5 border border-white/10 text-zogago-light/85 hover:bg-gradient-to-r hover:from-zogago-blue/20 hover:via-zogago-purple/20 hover:to-zogago-pink/20'
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
                  <label
                    htmlFor="contact-page-message"
                    className="block text-sm font-medium text-zogago-light/80 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-page-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-zogago-light focus:outline-none focus:ring-2 focus:ring-zogago-blue transition-all"
                    placeholder="Tell us about your project..."
                    required
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="contact-page-terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    className="bg-white/10 border-white/20 mt-1"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="contact-page-terms"
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

                <Button
                  type="submit"
                  disabled={isSubmitting || !isOnline}
                  className="button-glow w-full disabled:opacity-60 disabled:pointer-events-none"
                >
                  <span className="flex items-center justify-center">
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </span>
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
