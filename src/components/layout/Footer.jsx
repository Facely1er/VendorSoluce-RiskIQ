import React from 'react';
import { Link } from 'react-router-dom';
import {
  Target,
  FileSearch,
  TrendingUp,
  Users,
  Crown,
  FileText,
  Code,
  Building,
  MessageSquare,
  DollarSign,
  ArrowRight,
  HelpCircle,
  Shield
} from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          
          {/* Company Info */}
          <div className="footer-company">
            <div className="footer-logo-section">
              <img src="/vendorsoluce.png" alt="VendorSoluce Logo" className="footer-logo" />
              <div className="footer-brand-text">
                <span className="footer-brand-name">VendorSoluce™</span>
                <span className="footer-brand-tagline">A Supply Chain Assurance</span>
                <span className="footer-brand-tagline">by ERMITS</span>
              </div>
            </div>
            <p className="footer-company-description">
              Comprehensive supply chain risk management platform for modern organizations featuring assessments and automated compliance tools.
            </p>
          </div>

          {/* Solutions */}
          <div className="footer-column">
            <h3 className="footer-column-title">
              Solutions
            </h3>
            <ul className="footer-links">
              <li>
                <Link to="/assessments" className="footer-link">
                  <Target size={16} className="footer-link-icon" color="var(--vendorsoluce-green)" />
                  <span>Supply Chain Assessment</span>
                  <ArrowRight size={12} className="footer-link-arrow" />
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="footer-link">
                  <FileSearch size={16} className="footer-link-icon" color="var(--vendorsoluce-teal)" />
                  <span>Risk Analysis</span>
                  <ArrowRight size={12} className="footer-link-arrow" />
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="footer-link">
                  <TrendingUp size={16} className="footer-link-icon" color="var(--vendorsoluce-blue)" />
                  <span>Vendor Risk Dashboard</span>
                  <ArrowRight size={12} className="footer-link-arrow" />
                </Link>
              </li>
              <li>
                <Link to="/vendors" className="footer-link">
                  <Users size={16} className="footer-link-icon" color="var(--vendorsoluce-navy)" />
                  <span>Vendor Assessments</span>
                  <Crown size={12} className="footer-link-icon" color="#FCD34D" />
                  <ArrowRight size={12} className="footer-link-arrow" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-column">
            <h3 className="footer-column-title">
              Resources
            </h3>
            <ul className="footer-links">
              <li>
                <Link to="/dashboard" className="footer-link">
                  <FileText size={16} className="footer-link-icon" />
                  <span>Templates & Downloads</span>
                  <ArrowRight size={12} className="footer-link-arrow" />
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="footer-link">
                  <Code size={16} className="footer-link-icon" />
                  <span>API Documentation</span>
                  <ArrowRight size={12} className="footer-link-arrow" />
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="footer-link">
                  <Code size={16} className="footer-link-icon" />
                  <span>Integration Guides</span>
                  <ArrowRight size={12} className="footer-link-arrow" />
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="footer-link">
                  <HelpCircle size={16} className="footer-link-icon" />
                  <span>How It Works</span>
                  <ArrowRight size={12} className="footer-link-arrow" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-column">
            <h3 className="footer-column-title">
              Company
            </h3>
            <ul className="footer-links">
              <li>
                <Link to="/dashboard" className="footer-link">
                  <Building size={16} className="footer-link-icon" />
                  <span>About Us</span>
                  <ArrowRight size={12} className="footer-link-arrow" />
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="footer-link">
                  <MessageSquare size={16} className="footer-link-icon" />
                  <span>Contact</span>
                  <ArrowRight size={12} className="footer-link-arrow" />
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="footer-link">
                  <DollarSign size={16} className="footer-link-icon" />
                  <span>Pricing</span>
                  <ArrowRight size={12} className="footer-link-arrow" />
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="footer-link">
                  <Shield size={16} className="footer-link-icon" />
                  <span>Privacy Policy</span>
                  <ArrowRight size={12} className="footer-link-arrow" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              © 2025 ERMITS LLC. All rights reserved.
            </div>
            <div className="footer-cta">
              <Link to="/assessments" className="footer-cta-button">
                <Target size={16} />
                <span>Start Free Assessment</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

