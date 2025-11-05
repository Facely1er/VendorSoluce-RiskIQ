import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import './home.css';

const CTASection = () => {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2 className="cta-title">
          Ready to Transform Your Vendor Risk Management?
        </h2>
        <p className="cta-description">
          Start assessing vendor risks today with our comprehensive platform. Get started in minutes.
        </p>
        <div className="cta-buttons">
          <Link to="/assessments">
            <Button variant="primary" size="lg" className="cta-button-primary">
              Start Assessment
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="secondary" size="lg" className="cta-button-secondary">
              View Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

