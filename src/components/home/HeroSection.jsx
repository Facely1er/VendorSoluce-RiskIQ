import React from 'react';
import { Link } from 'react-router-dom';
import { Target, CheckCircle, Zap, Eye, Shield } from 'lucide-react';
import Button from '../ui/Button';
import './home.css';

const HeroSection = () => {
  // Detect theme
  const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark' ||
    localStorage.getItem('theme') === 'dark' ||
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  return (
    <section className="hero-section">
      {/* Background Image */}
      <div 
        className="hero-background"
        style={{
          backgroundImage: 'url("/background_hero_section.png")',
          backgroundSize: 'auto 65%',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      
      {/* Dynamic Theme Overlay */}
      <div 
        className="hero-overlay"
        style={{
          backgroundColor: '#1a2e1a',
          opacity: 0.85
        }}
      ></div>
      
      {/* Content */}
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title animate-fade-in-up animate-delay-100">
              Comprehensive Vendor Risk Management <br />
              for Modern Organizations
            </h1>
            
            <p className="hero-subtitle animate-fade-in-up animate-delay-300">
              Assess, monitor, and mitigate third-party vendor risks through comprehensive inherent risk assessment, onboarding due diligence determination, and continuous risk monitoring.
            </p>
            
            <div className="hero-carousel animate-fade-in-up animate-delay-500">
              <p className="hero-carousel-text">
                All in one platform.
              </p>
            </div>
            
            <div className="hero-ctas animate-fade-in-up animate-delay-700">
              <Link to="/dashboard">
                <Button variant="secondary" size="lg" className="hero-cta-primary">
                  <Target className="hero-icon" size={20} />
                  Start Assessment
                </Button>
              </Link>
              <Link to="/vendors">
                <Button variant="outline" size="lg" className="hero-cta-secondary">
                  <Shield className="hero-icon" size={20} />
                  View Dashboard
                </Button>
              </Link>
            </div>
            
            {/* Key Benefits */}
            <div className="hero-benefits animate-fade-in-up animate-delay-900">
              <div className="hero-benefit-card">
                <div className="hero-benefit-icon">
                  <Zap size={32} color="#FCD34D" />
                </div>
                <h3 className="hero-benefit-title">Fast Implementation</h3>
                <div className="hero-benefit-list">
                  <div className="hero-benefit-item">
                    <CheckCircle size={16} color="#86EFAC" />
                    <span>Quick setup in minutes</span>
                  </div>
                  <div className="hero-benefit-item">
                    <CheckCircle size={16} color="#86EFAC" />
                    <span>No technical expertise required</span>
                  </div>
                  <div className="hero-benefit-item">
                    <CheckCircle size={16} color="#86EFAC" />
                    <span>Guided onboarding process</span>
                  </div>
                </div>
              </div>
              
              <div className="hero-benefit-card animate-fade-in-up animate-delay-1100">
                <div className="hero-benefit-icon">
                  <Eye size={32} color="#93C5FD" />
                </div>
                <h3 className="hero-benefit-title">Complete Visibility</h3>
                <div className="hero-benefit-list">
                  <div className="hero-benefit-item">
                    <CheckCircle size={16} color="#86EFAC" />
                    <span>Real-time risk monitoring</span>
                  </div>
                  <div className="hero-benefit-item">
                    <CheckCircle size={16} color="#86EFAC" />
                    <span>Comprehensive vendor profiles</span>
                  </div>
                  <div className="hero-benefit-item">
                    <CheckCircle size={16} color="#86EFAC" />
                    <span>Automated compliance tracking</span>
                  </div>
                </div>
              </div>
              
              <div className="hero-benefit-card animate-fade-in-up animate-delay-1300">
                <div className="hero-benefit-icon">
                  <Shield size={32} color="#86EFAC" />
                </div>
                <h3 className="hero-benefit-title">Enterprise Security</h3>
                <div className="hero-benefit-list">
                  <div className="hero-benefit-item">
                    <CheckCircle size={16} color="#86EFAC" />
                    <span>NIST 800-161 compliance</span>
                  </div>
                  <div className="hero-benefit-item">
                    <CheckCircle size={16} color="#86EFAC" />
                    <span>Federal-grade security</span>
                  </div>
                  <div className="hero-benefit-item">
                    <CheckCircle size={16} color="#86EFAC" />
                    <span>Automated risk scoring</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

