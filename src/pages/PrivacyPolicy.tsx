import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';

const PrivacyPolicy = () => {
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
              <h1 className="zg-heading-xl">Privacy Policy</h1>
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
                  1. Introduction
                </h2>
                <p>
                  Welcome to ZOGAGO. We respect your privacy and are committed to
                  protecting your personal data. This privacy policy will inform you
                  about how we look after your personal data when you visit our
                  website and tell you about your privacy rights and how the law
                  protects you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-zogago-blue">
                  2. Data Collection
                </h2>
                <p>
                  We may collect, use, store and transfer different kinds of personal
                  data about you which we have grouped together as follows:
                </p>
                <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                  <li>
                    Identity Data: includes name, username or similar identifier
                  </li>
                  <li>
                    Contact Data: includes email address and telephone numbers
                  </li>
                  <li>
                    Technical Data: includes internet protocol (IP) address, browser
                    type and version, time zone setting and location, browser plug-in
                    types and versions, operating system and platform
                  </li>
                  <li>
                    Usage Data: includes information about how you use our website
                    and services
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-zogago-blue">
                  3. How We Use Your Data
                </h2>
                <p>
                  We will only use your personal data when the law allows us to. Most
                  commonly, we will use your personal data in the following
                  circumstances:
                </p>
                <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                  <li>
                    Where we need to perform the contract we are about to enter into
                    or have entered into with you
                  </li>
                  <li>
                    Where it is necessary for our legitimate interests (or those of a
                    third party) and your interests and fundamental rights do not
                    override those interests
                  </li>
                  <li>Where we need to comply with a legal obligation</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-zogago-blue">
                  4. Contact Us
                </h2>
                <p>
                  If you have any questions about this privacy policy or our privacy
                  practices, please contact us at:
                </p>
                <p className="mt-2">
                  Email:{' '}
                  <a
                    href="mailto:contact@zogagovisuals.com"
                    className="text-zogago-blue hover:underline"
                  >
                    contact@zogagovisuals.com
                  </a>
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

export default PrivacyPolicy;
