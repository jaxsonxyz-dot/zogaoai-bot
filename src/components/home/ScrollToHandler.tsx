
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToHandlerProps {
  showContent: boolean;
}

const ScrollToHandler: React.FC<ScrollToHandlerProps> = ({ showContent }) => {
  const location = useLocation();
  
  // Effect to handle scrolling to sections when directed from other pages
  useEffect(() => {
    if (showContent && location.state) {
      // Clear the state to prevent scrolling on refresh
      window.history.replaceState({}, document.title);
      
      // Delay to ensure the section is loaded
      setTimeout(() => {
        if (location.state.scrollToReviews) {
          const reviewsSection = document.getElementById('reviews');
          if (reviewsSection) {
            reviewsSection.scrollIntoView({
              behavior: 'smooth'
            });
          }
        } else if (location.state.scrollToServices) {
          const servicesSection = document.getElementById('services');
          if (servicesSection) {
            servicesSection.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      }, 300);
    }
  }, [showContent, location.state]);

  return null;
};

export default ScrollToHandler;
