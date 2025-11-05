import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ValuePropositionSection from '../components/home/ValuePropositionSection';
import FeatureSection from '../components/home/FeatureSection';
import CTASection from '../components/home/CTASection';

const HomePage = () => {
  return (
    <main className="homepage">
      <HeroSection />
      <ValuePropositionSection />
      <FeatureSection />
      <CTASection />
    </main>
  );
};

export default HomePage;

