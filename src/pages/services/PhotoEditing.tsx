import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import ServiceShowcase from '../../components/services/ServiceShowcase';
import ServiceHero from '../../components/services/ServiceHero';
import ServiceRelatedCaseStudies from '@/components/services/ServiceRelatedCaseStudies';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=1600`;

const services = [
  { id: 1, title: 'Portrait & Beauty Retouching', description: 'Acne and blemish removal, natural skin smoothing and detail cleanup.', imageUrl: img('photo-1531746020798-e6953c6e8e04'), route: '/contact', galleryImages: [] },
  { id: 2, title: 'Color Grading & Enhancement', description: 'Tone correction, lighting fixes and consistent color styles across a shoot.', imageUrl: img('photo-1452587925148-ce544e77e70d'), route: '/contact', galleryImages: [] },
  { id: 3, title: 'Background Removal & Posters', description: 'Clean cutouts, studio backgrounds, compositing and promotional posters.', imageUrl: img('photo-1626785774573-4b799315345d'), route: '/contact', galleryImages: [] },
];

const PhotoEditing = () => (
  <>
    <Navbar />
    <div className="relative bg-zogago-dark">
      <ServiceHero
        title="Photo Editing & Retouching"
        description="High-end photo editing, beauty retouching and commercial visuals for creators, brands and e-commerce."
      />
      <div id="services">
        <ServiceShowcase title="Our Editing Services" subtitle="Retouching, color, cutouts and posters" services={services} />
      </div>
      <ServiceRelatedCaseStudies serviceSlug="photo-editing" pageTitle="Photo Editing & Retouching" />
    </div>
    <Footer />
  </>
);

export default PhotoEditing;
