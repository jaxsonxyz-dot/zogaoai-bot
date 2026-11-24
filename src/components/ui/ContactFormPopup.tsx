import React, { useState, useRef } from 'react';
import { Send, CheckCircle, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import GlitchText from './GlitchText';
import { useToast } from '@/hooks/use-toast';
import { saveContactMessage } from '@/lib/storage';
import { Checkbox } from '@/components/ui/checkbox';
import { triggerConfetti } from '@/utils/animations/confettiAnimation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGeminiAI } from '@/hooks/useGeminiAI';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { getOfflineNotice } from '@/utils/pwaHelpers';

interface ContactFormPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

const ContactFormPopup: React.FC<ContactFormPopupProps> = ({
  open,
  onOpenChange,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
  const geminiAI = useGeminiAI();

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
    // Synchronous lock: blocks 50-100 simultaneous clicks in the same millisecond
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
      onOpenChange(false);
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
        state: {
          name: submittedName,
        },
        replace: true,
      });
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-zogago-dark border border-white/10 text-zogago-light max-h-[90vh]">
        <DialogTitle className="sr-only">Contact Us</DialogTitle>
        <DialogDescription className="sr-only">
          Share your project details and select the creative or digital services you need.
        </DialogDescription>
        <ScrollArea className="h-[calc(90vh-80px)] pr-4">
          <div className="space-y-6">
            <div className="flex items-center justify-between pt-2">
              <h2 className="text-2xl font-bold">
                <GlitchText
                  text="Contact Us"
                  intensity="low"
                  glitchInterval={8000}
                  rgbShift={true}
                />
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="popup-name"
                  className="block text-sm font-medium text-zogago-light/80 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="popup-name"
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
                  htmlFor="popup-email"
                  className="block text-sm font-medium text-zogago-light/80 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="popup-email"
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
                  className="grid grid-cols-2 gap-2"
                >
                  {serviceOptions.map((service) => {
                    const selected = formData.services.includes(service.id);
                    return (
                      <button
                        key={service.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => handleServiceToggle(service.id)}
                        className={`flex items-center justify-center text-center px-2 py-2.5 rounded-md cursor-pointer transition-all min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zogago-blue ${
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
                    htmlFor="popup-message"
                    className="block text-sm font-medium text-zogago-light/80"
                  >
                    Message
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
                  id="popup-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-zogago-light focus:outline-none focus:ring-2 focus:ring-zogago-blue transition-all"
                  placeholder={
                    geminiAI.isProcessing
                      ? 'Processing with AI...'
                      : 'Tell us about your project...'
                  }
                  required
                  disabled={geminiAI.isProcessing}
                />
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="popup-terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  className="bg-white/10 border-white/20 mt-1"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="popup-terms"
                    className="text-sm font-medium text-zogago-light/80 leading-tight cursor-pointer"
                  >
                    I accept the
                    <Link
                      to="/terms-and-conditions"
                      onClick={() => onOpenChange(false)}
                      className="text-zogago-blue hover:text-zogago-blue/80 mx-1 underline"
                    >
                      Terms and Conditions
                    </Link>
                    and
                    <Link
                      to="/privacy-policy"
                      onClick={() => onOpenChange(false)}
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
                className="button-glow w-full group mb-4 disabled:opacity-60 disabled:pointer-events-none"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormPopup;