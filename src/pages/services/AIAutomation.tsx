import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import ServiceShowcase from '../../components/services/ServiceShowcase';
import ServiceHero from '../../components/services/ServiceHero';
import ServiceRelatedCaseStudies from '@/components/services/ServiceRelatedCaseStudies';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=1600`;

const services = [
  { id: 1, title: 'WhatsApp & Chat Automation', description: 'Support bots, lead qualification and automated replies that run around the clock.', imageUrl: img('photo-1611746872915-64382b5c76da'), route: '/contact', galleryImages: [] },
  { id: 2, title: 'LinkedIn Outreach Automation', description: 'Automated networking and messaging sequences that keep your pipeline moving.', imageUrl: img('photo-1611944212129-29977ae1398c'), route: '/contact', galleryImages: [] },
  { id: 3, title: 'Custom AI Agents & Workflows', description: 'Knowledge-base assistants, data processing and tool integrations built around your business.', imageUrl: img('photo-1677442136019-21780ecad995'), route: '/contact', galleryImages: [] },
];

const AIAutomation = () => (
  <>
    <Navbar />
    <div className="relative bg-zogago-dark">
      <ServiceHero
        title="AI Agents & Automation"
        description="Automate repetitive tasks, streamline operations and scale engagement with custom AI agents and multi-channel workflows."
      />
      <div id="services">
        <ServiceShowcase title="Our Automation Services" subtitle="WhatsApp, LinkedIn and custom AI workflows" services={services} />
      </div>
      <ServiceRelatedCaseStudies serviceSlug="ai-automation" pageTitle="AI Agents & Automation" />
    </div>
    <Footer />
  </>
);

export default AIAutomation;
