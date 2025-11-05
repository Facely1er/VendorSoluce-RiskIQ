import React, { useState } from 'react';
import { Crown, Zap, Info, Check, ExternalLink, Settings as SettingsIcon } from 'lucide-react';
import { useApp } from './AppContext';
import { TIER_NAMES, TIER_CONFIG, getTierConfig } from './utils/tierConfig';
import './Settings.css';

const Settings = () => {
  const { licenseTier, setLicenseTier, vendors, assessments, triggerUpgradeModal } = useApp();
  const [whiteLabelSettings, setWhiteLabelSettings] = useState({
    companyName: 'VendorSoluce',
    logoUrl: '',
    primaryColor: '#33691E',
    showBranding: true
  });

  const currentTier = getTierConfig(licenseTier);

  const handleTierChange = (newTier) => {
    if (newTier !== licenseTier) {
      if (window.confirm(`Switch to ${TIER_CONFIG[newTier].displayName}? This is for demo purposes only.`)) {
        setLicenseTier(newTier);
      }
    }
  };

  const handleUpgradeClick = (tier) => {
    const tierConfig = TIER_CONFIG[tier];
    if (tierConfig.stripeLink) {
      window.open(tierConfig.stripeLink, '_blank');
    } else {
      triggerUpgradeModal('Contact sales for custom pricing');
    }
  };

  return (
    <div className="page-content settings-page">
      <div className="page-header">
        <div>
          <h2>Settings</h2>
          <p>Manage your account and preferences</p>
        </div>
      </div>

      {/* Current Plan Section */}
      <div className="settings-section">
        <h3>Current Plan</h3>
        <div className="current-plan-card">
          <div className="plan-header">
            <div className="plan-icon">
              {licenseTier === TIER_NAMES.ENTERPRISE ? <Crown size={32} /> :
               licenseTier === TIER_NAMES.PRO ? <Zap size={32} /> : <Info size={32} />}
            </div>
            <div>
              <h4>{currentTier.displayName}</h4>
              {currentTier.price && <p className="plan-price">{currentTier.price} {currentTier.priceDetail && `(${currentTier.priceDetail})`}</p>}
            </div>
          </div>

          <div className="usage-summary">
            <h5>Usage Summary</h5>
            <div className="usage-grid">
              <div className="usage-item">
                <span className="usage-label">Vendors</span>
                <span className="usage-value">
                  {vendors.length} / {currentTier.limits.maxVendors === Infinity ? '∞' : currentTier.limits.maxVendors}
                </span>
              </div>
              <div className="usage-item">
                <span className="usage-label">Assessments</span>
                <span className="usage-value">
                  {assessments.length} / {currentTier.limits.maxAssessments === Infinity ? '∞' : currentTier.limits.maxAssessments}
                </span>
              </div>
              <div className="usage-item">
                <span className="usage-label">Users</span>
                <span className="usage-value">
                  1 / {currentTier.limits.maxUsers === Infinity ? '∞' : currentTier.limits.maxUsers}
                </span>
              </div>
            </div>
          </div>

          <div className="plan-features">
            <h5>Plan Features</h5>
            <ul>
              <li><Check size={16} /> {currentTier.features.canExportCSV ? 'CSV Export' : 'No CSV Export'}</li>
              <li><Check size={16} /> {currentTier.features.canExportJSON ? 'JSON Export' : 'No JSON Export'}</li>
              <li><Check size={16} /> {currentTier.features.canExportPDF ? 'PDF Export' : 'No PDF Export'}</li>
              <li><Check size={16} /> {currentTier.features.canUseTemplates.length} Assessment Template(s)</li>
              <li><Check size={16} /> {currentTier.features.hasAdvancedReports ? 'Advanced Reports' : 'Basic Reports'}</li>
              {currentTier.features.canWhiteLabel && <li><Check size={16} /> White-Label Capability</li>}
              {currentTier.features.hasPrioritySupport && <li><Check size={16} /> Priority Support</li>}
            </ul>
          </div>
        </div>
      </div>

      {/* Tier Demo Selector (for testing) */}
      <div className="settings-section">
        <h3>Demo: Switch License Tier</h3>
        <p className="section-description">For demonstration purposes, you can switch between tiers. In production, this would require a Stripe purchase.</p>
        <div className="tier-selector-grid">
          {Object.values(TIER_NAMES).map(tier => {
            const config = TIER_CONFIG[tier];
            return (
              <div 
                key={tier}
                className={`tier-card ${licenseTier === tier ? 'active' : ''}`}
                onClick={() => handleTierChange(tier)}
              >
                <div className="tier-card-header">
                  <h4>{config.displayName}</h4>
                  {config.price && <p className="tier-price">{config.price}</p>}
                </div>
                {licenseTier === tier && (
                  <div className="active-badge">
                    <Check size={16} /> Current Plan
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upgrade Options */}
      {(licenseTier === TIER_NAMES.FREE || licenseTier === TIER_NAMES.PRO) && (
        <div className="settings-section">
          <h3>Upgrade Your Plan</h3>
          <p className="section-description">Unlock more features and capabilities</p>
          <div className="upgrade-options">
            {licenseTier === TIER_NAMES.FREE && (
              <>
                <div className="upgrade-card">
                  <div className="upgrade-header">
                    <Zap size={24} />
                    <h4>Professional</h4>
                  </div>
                  <p className="upgrade-price">{TIER_CONFIG[TIER_NAMES.PRO].price}</p>
                  <p className="upgrade-detail">{TIER_CONFIG[TIER_NAMES.PRO].priceDetail}</p>
                  <ul className="upgrade-features">
                    {TIER_CONFIG[TIER_NAMES.PRO].benefits?.slice(0, 4).map((benefit, idx) => (
                      <li key={idx}><Check size={14} /> {benefit}</li>
                    ))}
                  </ul>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleUpgradeClick(TIER_NAMES.PRO)}
                  >
                    Upgrade to Pro <ExternalLink size={16} />
                  </button>
                </div>

                <div className="upgrade-card">
                  <div className="upgrade-header">
                    <Crown size={24} />
                    <h4>Enterprise</h4>
                  </div>
                  <p className="upgrade-price">{TIER_CONFIG[TIER_NAMES.ENTERPRISE].price}</p>
                  <p className="upgrade-detail">{TIER_CONFIG[TIER_NAMES.ENTERPRISE].priceDetail}</p>
                  <ul className="upgrade-features">
                    {TIER_CONFIG[TIER_NAMES.ENTERPRISE].benefits?.slice(0, 4).map((benefit, idx) => (
                      <li key={idx}><Check size={14} /> {benefit}</li>
                    ))}
                  </ul>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleUpgradeClick(TIER_NAMES.ENTERPRISE)}
                  >
                    Upgrade to Enterprise <ExternalLink size={16} />
                  </button>
                </div>
              </>
            )}

            {licenseTier === TIER_NAMES.PRO && (
              <div className="upgrade-card">
                <div className="upgrade-header">
                  <Crown size={24} />
                  <h4>Enterprise</h4>
                </div>
                <p className="upgrade-price">{TIER_CONFIG[TIER_NAMES.ENTERPRISE].price}</p>
                <p className="upgrade-detail">{TIER_CONFIG[TIER_NAMES.ENTERPRISE].priceDetail}</p>
                <ul className="upgrade-features">
                  {TIER_CONFIG[TIER_NAMES.ENTERPRISE].benefits?.map((benefit, idx) => (
                    <li key={idx}><Check size={14} /> {benefit}</li>
                  ))}
                </ul>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleUpgradeClick(TIER_NAMES.ENTERPRISE)}
                >
                  Upgrade to Enterprise <ExternalLink size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* White-Label Settings (Enterprise Only) */}
      {currentTier.features.canWhiteLabel && (
        <div className="settings-section">
          <h3>White-Label Settings</h3>
          <p className="section-description">Customize the branding for your organization</p>
          <div className="white-label-form">
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                value={whiteLabelSettings.companyName}
                onChange={(e) => setWhiteLabelSettings({...whiteLabelSettings, companyName: e.target.value})}
                placeholder="Your Company Name"
              />
            </div>
            <div className="form-group">
              <label>Logo URL</label>
              <input
                type="url"
                value={whiteLabelSettings.logoUrl}
                onChange={(e) => setWhiteLabelSettings({...whiteLabelSettings, logoUrl: e.target.value})}
                placeholder="https://example.com/logo.png"
              />
            </div>
            <div className="form-group">
              <label>Primary Color</label>
              <input
                type="color"
                value={whiteLabelSettings.primaryColor}
                onChange={(e) => setWhiteLabelSettings({...whiteLabelSettings, primaryColor: e.target.value})}
              />
            </div>
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={whiteLabelSettings.showBranding}
                  onChange={(e) => setWhiteLabelSettings({...whiteLabelSettings, showBranding: e.target.checked})}
                />
                Show VendorSoluce Branding
              </label>
            </div>
            <button className="btn btn-primary">Save White-Label Settings</button>
          </div>
        </div>
      )}

      {/* Support Section */}
      <div className="settings-section">
        <h3>Support & Resources</h3>
        <div className="support-links">
          <a href="mailto:support@vendorsoluce.com" className="support-link">
            <SettingsIcon size={20} />
            <div>
              <strong>Email Support</strong>
              <p>support@vendorsoluce.com</p>
            </div>
          </a>
          <a href="/docs" className="support-link">
            <SettingsIcon size={20} />
            <div>
              <strong>Documentation</strong>
              <p>User guides and API docs</p>
            </div>
          </a>
          {currentTier.features.hasPrioritySupport && (
            <a href="tel:+15551234567" className="support-link">
              <SettingsIcon size={20} />
              <div>
                <strong>Priority Support</strong>
                <p>+1 (555) 123-4567</p>
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;

