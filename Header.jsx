import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Shield } from 'lucide-react';
import { useApp } from './AppContext';
import './Header.css';

const Header = () => {
  const { vendors, assessments, theme, toggleTheme } = useApp();
  
  const criticalCount = vendors.filter(v => v.riskScore >= 60).length;
  
  return (
    <header className="app-header">
      <div className="container">
        <div className="header-content">
          <div className="brand">
            <Link to="/" className="brand-link">
              <img 
                src="/vendorsoluce.png" 
                alt="VendorSoluce Logo" 
                className="brand-logo" 
              />
              <div className="brand-text">
                <h1 className="brand-title">VendorSoluce™</h1>
                <p className="brand-tagline">A Supply Chain Assurance</p>
                <p className="brand-tagline-secondary">by ERMITS</p>
              </div>
            </Link>
          </div>
          
          <div className="header-actions">
            <div className="header-stats">
              <div className="header-stat">
                <div className="header-stat-value">{vendors.length}</div>
                <div className="header-stat-label">Vendors</div>
              </div>
              <div className="header-stat">
                <div className="header-stat-value">{criticalCount}</div>
                <div className="header-stat-label">High Risk</div>
              </div>
              <div className="header-stat">
                <div className="header-stat-value">{assessments.length}</div>
                <div className="header-stat-label">Assessments</div>
              </div>
            </div>
            
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
