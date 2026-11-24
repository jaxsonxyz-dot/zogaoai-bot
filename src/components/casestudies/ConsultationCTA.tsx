import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ConsultationCTA: React.FC = () => (
  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zogago-blue/10 via-white/[0.02] to-zogago-purple/10 p-8 md:p-14">
    <span className="mb-3 block font-mono text-xs uppercase tracking-[0.3em] text-zogago-blue/70">Executive Consultation</span>
    <h2 className="max-w-3xl text-3xl md:text-5xl font-bold tracking-tight text-white">
      Ready to elevate your brand to this standard?
    </h2>
    <p className="mt-5 max-w-2xl text-zogago-light/70">
      We craft complete brand identities, vector systems, and scalable design languages for ambitious founders worldwide.
    </p>
    <Link
      to="/contact"
      className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-zogago-blue to-zogago-purple px-7 py-3.5 font-medium text-white transition-transform hover:scale-[1.03]"
    >
      Start Your Brand Transformation <ArrowRight size={18} />
    </Link>
  </div>
);

export default ConsultationCTA;
