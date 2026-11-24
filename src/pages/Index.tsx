import React, { useState } from 'react';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import ProfessionalServices from '../components/home/ProfessionalServices';
import ShowreelSection from '../components/home/ShowreelSection';
import HowWeWork from '../components/home/HowWeWork';
import OurApproach from '../components/home/OurApproach';
import Statistics from '../components/home/Statistics';
import HomeIntro from '../components/home/HomeIntro';
import HomeContainer from '../components/home/HomeContainer';
import ScrollToHandler from '../components/home/ScrollToHandler';
import { useContactForm } from '../hooks/useContactForm';

const Index = () => {
  const [showContent, setShowContent] = useState(false);
  const { contactOpen, setContactOpen, geminiApiKey, setGeminiApiKey } = useContactForm();
  
  const handleIntroComplete = () => {
    setShowContent(true);
  };

  return (
    <>
      <HomeIntro onIntroComplete={handleIntroComplete} />
      
      <HomeContainer 
        showContent={showContent} 
        contactOpen={contactOpen}
        setContactOpen={setContactOpen}
        geminiApiKey={geminiApiKey}
        onApiKeyChange={setGeminiApiKey}
      >
        <Hero />
        <ProfessionalServices />
        <ShowreelSection />
        <HowWeWork />
        <Statistics />
        <OurApproach />
        <About geminiApiKey={geminiApiKey} onApiKeyChange={setGeminiApiKey} />
      </HomeContainer>
      
      <ScrollToHandler showContent={showContent} />
    </>
  );
};

export default Index;
