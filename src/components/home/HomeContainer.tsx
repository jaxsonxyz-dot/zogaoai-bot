
import React from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

interface HomeContainerProps {
  children: React.ReactNode;
  showContent: boolean;
  contactOpen: boolean;
  setContactOpen: (open: boolean) => void;
  geminiApiKey?: string;
  onApiKeyChange?: (key: string) => void;
}

const HomeContainer: React.FC<HomeContainerProps> = ({
  children,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-zogago-dark text-zogago-light">
      <Navbar />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default HomeContainer;
