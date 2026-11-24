
import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Facebook, Instagram, Linkedin, ChevronRight, Twitter } from 'lucide-react';
import GlitchText from '../components/ui/GlitchText';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SubmitReview from '../components/review/SubmitReview';
import { Dialog, DialogContent } from "@/components/ui/dialog";

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.state?.name || '';
  const [showDialog, setShowDialog] = React.useState(true);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect to home if user directly visits this page without submitting the form
  useEffect(() => {
    if (!location.state) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [location.state, navigate]);

  // Add staggered animation for elements
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-stagger');
    
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('opacity-100', 'translate-y-0');
        element.classList.remove('opacity-0', 'translate-y-10');
      }, 300 * (index + 1));
    });
  }, []);

  return (
    <div className="min-h-screen bg-zogago-dark text-zogago-light">
      <Navbar />
      
      {/* Thank You Popup Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="glass-card border-white/10 bg-zogago-dark/90 text-zogago-light p-8 max-w-md">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-zogago-blue/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-zogago-blue animate-pulse-slow" />
            </div>
            
            <h2 className="text-2xl font-bold mb-2">
              <GlitchText 
                text="Thank You!" 
                className="text-gradient-blue" 
                intensity="low" 
                glitchInterval={3000}
              />
            </h2>
            
            <p className="text-zogago-light/80 mb-4">
              {name ? `Hey ${name}! ` : ''}
              Your message has been sent successfully!
            </p>
            
            <button
              onClick={() => setShowDialog(false)}
              className="button-glow px-4 py-2 w-full"
            >
              <span className="relative z-10">Continue</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Main content starts at the top of the page */}
      <main className="zg-container flex flex-col py-10 min-h-[70vh]">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-16">
            <div className="w-20 h-20 rounded-full bg-zogago-blue/10 flex items-center justify-center mx-auto mb-8 animate-stagger opacity-0 translate-y-10 transition-all duration-700">
              <CheckCircle className="w-12 h-12 text-zogago-blue animate-pulse-slow" />
            </div>
            
            <h1 className="zg-heading-lg mb-4 animate-stagger opacity-0 translate-y-10 transition-all duration-700">
              <GlitchText 
                text="Thank You!" 
                className="text-gradient-blue" 
                intensity="low" 
                glitchInterval={5000}
              />
            </h1>
            
            <p className="zg-paragraph max-w-2xl mx-auto mb-6 animate-stagger opacity-0 translate-y-10 transition-all duration-700">
              {name ? `Hey ${name}! ` : ''}
              Thank you for reaching out! We will contact you as soon as possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="animate-stagger opacity-0 translate-y-10 transition-all duration-700" style={{ transitionDelay: '300ms' }}>
              <SubmitReview />
              
              <div className="glass-card p-6 md:p-8 rounded-xl">
                <h3 className="text-xl md:text-2xl font-bold mb-6">Connect With Us</h3>
                
                <div className="space-y-6">
                  <p className="text-zogago-light/80">
                    Follow us on social media to stay updated with our latest projects and announcements.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href="https://www.instagram.com/zogagovisuals/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-[#11B3EEE6]/20 transition-colors"
                    >
                      <Instagram className="w-5 h-5 text-zogago-purple" />
                      <span>Instagram</span>
                    </a>
                    
                    <a 
                      href="https://www.facebook.com/profile.php?id=61574806213572" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-[#11B3EEE6]/20 transition-colors"
                    >
                      <Facebook className="w-5 h-5 text-zogago-blue" />
                      <span>Facebook</span>
                    </a>
                    
                    <a 
                      href="https://x.com/zogagovisuals?s=03" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-[#11B3EEE6]/20 transition-colors"
                    >
                      <Twitter className="w-5 h-5 text-zogago-blue" />
                      <span>X (Twitter)</span>
                    </a>
                    
                    <a 
                      href="https://www.linkedin.com/in/zogago-6b2009358?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-[#11B3EEE6]/20 transition-colors"
                    >
                      <Linkedin className="w-5 h-5 text-zogago-blue" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-stagger opacity-0 translate-y-10 transition-all duration-700" style={{ transitionDelay: '600ms' }}>
              <div className="glass-card p-6 md:p-8 rounded-xl h-full">
                <h3 className="text-xl md:text-2xl font-bold mb-6">Explore Our Services</h3>
                
                <div className="space-y-5 mb-8">
                  <p className="text-zogago-light/80">
                    Discover the range of creative and digital services we offer to help your business grow.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: "Web Design & Dev", path: "/services/web-development" },
                      { name: "Branding & Design", path: "/services/graphics-design" },
                      { name: "E-Commerce & Shopify", path: "/services/ecommerce" },
                      { name: "Photo Editing", path: "/services/photo-editing" },
                      { name: "3D Architecture", path: "/services/architecture" },
                      { name: "AI & Automation", path: "/services/ai-automation" },
                    ].map((service, index) => (
                      <Link
                        key={index}
                        to={service.path}
                        className="group flex items-center justify-between px-4 py-3 rounded-lg bg-white/5 hover:bg-[#11B3EEE6]/20 transition-colors"
                      >
                        <span>{service.name}</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-white/10 pt-6">
                  <h4 className="font-medium mb-4">Important Links</h4>
                  
                  <div className="space-y-3">
                    <Link 
                      to="/privacy-policy"
                      className="text-zogago-light/80 hover:text-zogago-blue transition-colors flex items-center"
                    >
                      <ChevronRight className="w-4 h-4 mr-2" />
                      Privacy Policy
                    </Link>

                    <Link 
                      to="/terms-and-conditions"
                      className="text-zogago-light/80 hover:text-zogago-blue transition-colors flex items-center"
                    >
                      <ChevronRight className="w-4 h-4 mr-2" />
                      Terms &amp; Conditions
                    </Link>
                    
                    <Link 
                      to="/"
                      className="text-zogago-light/80 hover:text-zogago-blue transition-colors flex items-center"
                    >
                      <ChevronRight className="w-4 h-4 mr-2" />
                      Return to Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ThankYou;
