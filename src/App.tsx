import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/layout/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import OfflineIndicator from "./components/pwa/OfflineIndicator";
import ZogagoChatBot from "./components/chat/ZogagoChatBot";
import Index from "./pages/Index";
import "./index.css";

// Lazy-load secondary routes so initial mobile/slow-3G bundle loads significantly faster
const NotFound = lazy(() => import("./pages/NotFound"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const AIAutomation = lazy(() => import("./pages/services/AIAutomation"));
const PhotoEditing = lazy(() => import("./pages/services/PhotoEditing"));
const WebDevelopment = lazy(() => import("./pages/services/WebDevelopment"));
const Ecommerce = lazy(() => import("./pages/services/Ecommerce"));
const GraphicsDesign = lazy(() => import("./pages/services/GraphicsDesign"));
const Architecture = lazy(() => import("./pages/services/Architecture"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));
const FAQPage = lazy(() => import("./pages/FAQ"));
const ReviewsPage = lazy(() => import("./pages/Reviews"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000,
      gcTime: 180_000,
      refetchOnWindowFocus: false,
    },
  },
});

const RouteFallback = () => (
  <div
    className="min-h-screen bg-zogago-dark flex items-center justify-center"
    role="status"
    aria-label="Loading page"
  >
    <div className="w-9 h-9 rounded-full border-2 border-white/15 border-t-zogago-blue animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ScrollToTop />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <OfflineIndicator />
        <div className="bg-zogago-dark min-h-screen">
          <ErrorBoundary>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/reviews" element={<ReviewsPage />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Service routes */}
                <Route path="/services/ai-automation" element={<AIAutomation />} />
                <Route path="/services/photo-editing" element={<PhotoEditing />} />
                <Route path="/services/seo" element={<Navigate to="/services/ai-automation" replace />} />
                <Route path="/services/web-development" element={<WebDevelopment />} />
                <Route path="/services/ecommerce" element={<Ecommerce />} />
                <Route path="/services/graphics-design" element={<GraphicsDesign />} />
                <Route path="/services/architecture" element={<Architecture />} />
                <Route path="/services/brand-strategy" element={<Navigate to="/services/graphics-design" replace />} />
                <Route path="/services/social-media-marketing" element={<Navigate to="/services/photo-editing" replace />} />

                {/* Case studies */}
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>
        <ZogagoChatBot />
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
