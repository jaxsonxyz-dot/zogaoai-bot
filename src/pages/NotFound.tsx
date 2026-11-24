
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-zogago-dark flex flex-col items-center justify-center overflow-hidden py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center glass-card p-12 max-w-xl mx-4 relative z-10 border border-white/10"
        >
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zogago-blue to-zogago-purple">404</h1>
          <p className="text-xl text-white/80 mb-8">Oops! The page you're looking for doesn't exist.</p>
          <div className="flex justify-center">
            <Link to="/">
              <Button className="button-glow flex items-center gap-2">
                <Home className="w-4 h-4" />
                <span>Return to Home</span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
