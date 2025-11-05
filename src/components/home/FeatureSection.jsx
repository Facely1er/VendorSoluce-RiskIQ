import React from 'react';
import { Link } from 'react-router-dom';
import { FileJson, BarChart3, Zap, Shield } from 'lucide-react';
import Button from '../ui/Button';
import './home.css';

const FeatureSection = () => {
  const features = [
    {
      icon: <Shield size={32} color="var(--vendorsoluce-green)" />,
      title: 'Supply Chain Assessment',
      description: 'Comprehensive NIST SP 800-161 compliant assessment framework for vendor risk evaluation.',
      path: '/assessments'
    },
    {
      icon: <FileJson size={32} color="var(--vendorsoluce-light-green)" />,
      title: 'Risk Analysis',
      description: 'Advanced risk analysis tools with automated scoring and compliance tracking.',
      path: '/analytics'
    },
    {
      icon: <BarChart3 size={32} color="var(--vendorsoluce-green)" />,
      title: 'Vendor Dashboard',
      description: 'Real-time vendor risk monitoring with comprehensive analytics and reporting.',
      path: '/dashboard'
    },
    {
      icon: <Zap size={32} color="var(--vendorsoluce-light-green)" />,
      title: 'Automated Risk Scoring',
      description: 'AI-powered risk scoring with continuous monitoring and automated alerts.',
      path: '/vendors'
    }
  ];

  return (
    <section className="feature-section">
      <div className="feature-container">
        <div className="feature-header">
          <h2 className="feature-title">
            Powerful Features for Vendor Risk Management
          </h2>
          <p className="feature-description">
            Everything you need to assess, monitor, and mitigate vendor risks in one comprehensive platform.
          </p>
        </div>
        
        <div className="feature-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon-wrapper">
                {feature.icon}
              </div>
              <h3 className="feature-card-title">{feature.title}</h3>
              <p className="feature-card-description">{feature.description}</p>
              <Link to={feature.path}>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="feature-card-button"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

