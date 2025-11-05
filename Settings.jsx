import React, { useState, useEffect } from 'react';
import { Crown, Zap, Info, Check, ExternalLink, Settings as SettingsIcon, Key, ShieldCheck, AlertCircle } from 'lucide-react';
import { useApp } from './AppContext';
import { TIER_NAMES, TIER_CONFIG, getTierConfig } from './utils/tierConfig';
import { activateLicense, deactivateLicense, getStoredLicense, maskLicenseKey, generateDemoLicense } from './utils/licenseValidator';
import './Settings.css';

const Settings = () => {
  const { licenseTier, setLicenseTier, vendors, assessments, triggerUpgradeModal, showToast } = useApp();
  const [whiteLabelSettings, setWhiteLabelSettings] = useState({
    companyName: 'VendorSoluce',
    logoUrl: '',
    primaryColor: '#33691E',
    showBranding: true
  });

  // License activation state
  const [licenseKey, setLicenseKey] = useState('');
  const [isActivating, setIsActivating] = useState(false);
  const [storedLicense, setStoredLicense] = useState(null);
  const [showLicenseInput, setShowLicenseInput] = useState(false);

  const currentTier = getTierConfig(licenseTier);

  // Load stored license on mount
  useEffect(() => {
    const license = getStoredLicense();
    setStoredLicense(license);
  }, [licenseTier]);

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

  // License activation handlers
  const handleActivateLicense = async () => {
    if (!licenseKey.trim()) {
      showToast('Error', 'Please enter a license key', 'error');
      return;
    }

    setIsActivating(true);

    try {
      const result = await activateLicense(licenseKey.trim(), true);
      
      if (result.success) {
        setLicenseTier(result.tier);
        setStoredLicense(getStoredLicense());
        setLicenseKey('');
        setShowLicenseInput(false);
        showToast('Success', result.message, 'success');
        
        if (result.warning) {
          setTimeout(() => {
            showToast('Notice', result.warning, 'info');
          }, 2000);
        }
      } else {
        showToast('Activation Failed', result.error, 'error');
      }
    } catch (error) {
      showToast('Error', 'Failed to activate license. Please try again.', 'error');
    } finally {
      setIsActivating(false);
    }
  };

  const handleDeactivateLicense = () => {
    if (!window.confirm('Are you sure you want to deactivate your license? You will revert to the Free tier.')) {
      return;
    }

    const result = deactivateLicense();
    
    if (result.success) {
      setLicenseTier(TIER_NAMES.FREE);
      setStoredLicense(null);
      showToast('Success', result.message, 'success');
    } else {
      showToast('Error', result.message, 'error');
    }
  };

  const handleGenerateDemoKey = () => {
    const demoKey = generateDemoLicense('pro');
    setLicenseKey(demoKey);
    showToast('Demo Key Generated', 'This is for testing only. In production, purchase a license from our website.', 'info');
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

      {/* License Activation Section */}
      <div className="settings-section">
        <h3><Key size={20} /> License Activation</h3>
        <p className="section-description">
          Activate your purchased license to unlock Pro or Enterprise features
        </p>

        {storedLicense ? (
          // License is activated
          <div className="license-status-card activated">
            <div className="license-header">
              <ShieldCheck size={32} color="#10b981" />
              <div>
                <h4>License Active</h4>
                <p>Your {storedLicense.tier.toUpperCase()} license is activated</p>
              </div>
            </div>

            <div className="license-details">
              <div className="license-detail-row">
                <span className="label">License Key:</span>
                <span className="value mono">{maskLicenseKey(storedLicense.key)}</span>
              </div>
              {storedLicense.data && storedLicense.data.email && (
                <div className="license-detail-row">
                  <span className="label">Registered to:</span>
                  <span className="value">{storedLicense.data.email}</span>
                </div>
              )}
              {storedLicense.data && storedLicense.data.validatedAt && (
                <div className="license-detail-row">
                  <span className="label">Activated:</span>
                  <span className="value">{new Date(storedLicense.data.validatedAt).toLocaleDateString()}</span>
                </div>
              )}
              {storedLicense.data && storedLicense.data.online === false && (
                <div className="license-warning">
                  <AlertCircle size={16} />
                  <span>License validated offline. Some features may require online validation.</span>
                </div>
              )}
            </div>

            <button 
              className="btn btn-danger"
              onClick={handleDeactivateLicense}
            >
              Deactivate License
            </button>
          </div>
        ) : (
          // No license activated
          <div className="license-status-card inactive">
            <div className="license-header">
              <Info size={32} color="#6b7280" />
              <div>
                <h4>No Active License</h4>
                <p>You're currently using the Free tier</p>
              </div>
            </div>

            {!showLicenseInput ? (
              <div className="license-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowLicenseInput(true)}
                >
                  <Key size={18} />
                  Activate License
                </button>
                <p className="help-text">
                  Don't have a license? <a href="https://vendorsoluce.com/pricing" target="_blank" rel="noopener noreferrer">Purchase one here</a>
                </p>
              </div>
            ) : (
              <div className="license-input-section">
                <div className="form-group">
                  <label>Enter License Key</label>
                  <input
                    type="text"
                    value={licenseKey}
                    onChange={(e) => setLicenseKey(e.target.value.toUpperCase())}
                    placeholder="PRO-XXXX-XXXX-XXXX-XXXX"
                    className="license-input mono"
                    disabled={isActivating}
                  />
                  <small className="help-text">
                    Format: TIER-XXXX-XXXX-XXXX-XXXX (e.g., PRO-A3F5-8D2C-1E9B-4F7A)
                  </small>
                </div>

                <div className="license-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={handleActivateLicense}
                    disabled={isActivating || !licenseKey.trim()}
                  >
                    {isActivating ? 'Activating...' : 'Activate'}
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowLicenseInput(false);
                      setLicenseKey('');
                    }}
                    disabled={isActivating}
                  >
                    Cancel
                  </button>
                  {process.env.NODE_ENV === 'development' && (
                    <button 
                      className="btn btn-secondary"
                      onClick={handleGenerateDemoKey}
                      disabled={isActivating}
                    >
                      Generate Demo Key
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

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

