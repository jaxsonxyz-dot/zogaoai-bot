import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';

const paymentMethods = [
  {
    name: 'Bitcoin',
    icon: '/lovable-uploads/93608a72-b8c2-4a4b-8838-5d4aed9a11bd.png',
  },
  {
    name: 'Ethereum',
    icon: '/lovable-uploads/963e0c1b-b113-4286-a6dd-0f2dfce14740.png',
  },
  {
    name: 'Solana',
    icon: '/lovable-uploads/e6642539-98f6-4f65-942b-bb7fa012c989.png',
  },
  {
    name: 'USDT',
    icon: '/lovable-uploads/db3c9cd8-ddd4-45bc-be3f-eb4afcdab213.png',
  },
  {
    name: 'Skrill',
    icon: '/lovable-uploads/0dbb71d6-7cce-4191-bf82-7a893fc103bb.png',
  },
  {
    name: 'Bank Transfer',
    icon: '/lovable-uploads/adbb332a-9714-4b21-b4cb-bcb999329e8f.png',
  },
  {
    name: 'Credit Card',
    icon: '/lovable-uploads/6cc18300-bb59-4d06-9973-e7cbbb875547.png',
  },
  {
    name: 'PayPal',
    icon: '/lovable-uploads/dc67f022-0fef-4253-968c-80a9d4a05bf7.png',
  },
];

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-zogago-dark text-zogago-light">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="zg-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
              <h1 className="zg-heading-xl">Terms and Conditions</h1>
              <Link to="/">
                <Button
                  variant="outline"
                  className="button-glow-outline flex items-center gap-2"
                >
                  <Home size={18} />
                  Back to Home
                </Button>
              </Link>
            </div>

            <div className="space-y-6 text-zogago-light/90">
              <p className="text-sm text-zogago-light/65">
                Last updated: April 2025
              </p>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-zogago-blue">
                  Transparency &amp; Quality Service
                </h2>
                <p>
                  We are committed to providing clear communication, fair pricing,
                  and high-quality web development, e-commerce, AI automation,
                  graphic design, photo editing, and 3D architectural visualization
                  services. Our process ensures full transparency from initial
                  discussions to project completion.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-zogago-blue">
                  Payment Policy
                </h2>
                <p>
                  A 50% upfront payment is required before work begins. Clients may
                  choose to pay the full amount upfront if preferred. For larger
                  projects, an initial payment of 30% may be accepted, depending on
                  the project scope.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-zogago-blue">
                  Payment Methods
                </h2>
                <p>We accept the following payment methods:</p>
                <div className="flex flex-wrap gap-3 my-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.name}
                      className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5"
                    >
                      <img
                        src={method.icon}
                        alt={method.name}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                        className="h-5 w-5 object-contain"
                      />
                      <span className="text-sm">{method.name}</span>
                    </div>
                  ))}
                </div>
                <p>
                  We also support cryptocurrency payments for fast international
                  processing and enhanced security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-zogago-blue">
                  Order Process
                </h2>
                <p>
                  All project discussions and inquiries must be sent via email or
                  through the Contact Us page on our website. Our team will review
                  and respond promptly before confirming your order.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-zogago-blue">
                  Project Timeline &amp; Revisions
                </h2>
                <p>
                  A clear time frame will be provided before starting the project.
                  After final delivery, additional revisions will be charged at $20
                  per revision. Clients must communicate all requirements before
                  placing an order to avoid unnecessary revisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-zogago-blue">
                  Payment Verification
                </h2>
                <p>
                  Payments are typically verified within an hour of receipt. For
                  standard bank transfers, verification may take up to 3 business
                  days depending on your financial institution. If a payment has not
                  been received after 3 business days, our team will contact you
                  directly to assist. We also support major cryptocurrencies (BTC,
                  USDT, SOL, ETH) and Skrill for fast international verification and
                  secure processing.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
