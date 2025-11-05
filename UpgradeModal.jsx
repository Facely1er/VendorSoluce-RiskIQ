import React from 'react';
import { X, Check, Crown, Zap, Shield } from 'lucide-react';
import { useApp } from './AppContext';
import { TIER_NAMES, TIER_CONFIG } from './utils/tierConfig';
import './UpgradeModal.css';

const UpgradeModal = () => {
  const { showUpgradeModal, closeUpgradeModal, licenseTier, vendors, assessments } = useApp();

  if (!showUpgradeModal) return null;

  const currentTierConfig = TIER_CONFIG[licenseTier];
  const proTier = TIER_CONFIG[TIER_NAMES.PRO];
  const enterpriseTier = TIER_CONFIG[TIER_NAMES.ENTERPRISE];

  const handleUpgrade = (stripeLink) => {
    if (stripeLink) {
      window.open(stripeLink, '_blank');
    }
  };

  return (
    <div className="modal active upgrade-modal" onClick={closeUpgradeModal}>
      <div className="modal-content upgrade-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Upgrade Your Plan</h2>
            <p>Unlock more features and remove limits</p>
          </div>
          <button className="close-btn" onClick={closeUpgradeModal}>
            <X size={24} />
          </button>
        </div>

        {/* Current Usage */}
        <div className="current-usage">
          <h3>Your Current Usage</h3>
          <div className="usage-stats">
            <div className="usage-stat">
              <span className="usage-label">Vendors</span>
              <span className="usage-value">
                {vendors.length} / {currentTierConfig.limits.maxVendors === Infinity ? '∞' : currentTierConfig.limits.maxVendors}
              </span>
            </div>
            <div className="usage-stat">
              <span className="usage-label">Assessments</span>
              <span className="usage-value">
                {assessments.length} / {currentTierConfig.limits.maxAssessments === Infinity ? '∞' : currentTierConfig.limits.maxAssessments}
              </span>
            </div>
            <div className="usage-stat">
              <span className="usage-label">Current Plan</span>
              <span className="usage-value tier-badge-inline">{currentTierConfig.displayName}</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-grid">
          {/* Pro Tier */}
          <div className={`pricing-card ${licenseTier === TIER_NAMES.FREE ? 'recommended' : ''}`}>
            {licenseTier === TIER_NAMES.FREE && <div className="recommended-badge">Recommended</div>}
            <div className="pricing-header">
              <Zap className="tier-icon" size={32} />
              <h3>{proTier.displayName}</h3>
              <div className="price">{proTier.price}</div>
              <div className="price-detail">{proTier.priceDetail}</div>
            </div>

            <ul className="features-list">
              {proTier.benefits.map((benefit, idx) => (
                <li key={idx}>
                  <Check size={16} className="check-icon" />
                  {benefit}
                </li>
              ))}
            </ul>

            <button 
              className="btn btn-primary btn-upgrade"
              onClick={() => handleUpgrade(proTier.stripeLink)}
              disabled={licenseTier !== TIER_NAMES.FREE}
            >
              {licenseTier === TIER_NAMES.FREE ? 'Upgrade to Pro' : 'Current Plan'}
            </button>
          </div>

          {/* Enterprise Tier */}
          <div className={`pricing-card ${licenseTier === TIER_NAMES.PRO ? 'recommended' : ''}`}>
            {licenseTier === TIER_NAMES.PRO && <div className="recommended-badge">Upgrade</div>}
            <div className="pricing-header">
              <Crown className="tier-icon" size={32} />
              <h3>{enterpriseTier.displayName}</h3>
              <div className="price">{enterpriseTier.price}</div>
              <div className="price-detail">{enterpriseTier.priceDetail}</div>
            </div>

            <ul className="features-list">
              {enterpriseTier.benefits.map((benefit, idx) => (
                <li key={idx}>
                  <Check size={16} className="check-icon" />
                  {benefit}
                </li>
              ))}
            </ul>

            <button 
              className="btn btn-primary btn-upgrade"
              onClick={() => handleUpgrade(enterpriseTier.stripeLink)}
              disabled={licenseTier === TIER_NAMES.ENTERPRISE}
            >
              {licenseTier === TIER_NAMES.ENTERPRISE ? 'Current Plan' : 'Upgrade to Enterprise'}
            </button>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="feature-comparison">
          <h3>Feature Comparison</h3>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Free</th>
                <th>Pro</th>
                <th>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vendors</td>
                <td>{TIER_CONFIG[TIER_NAMES.FREE].limits.maxVendors}</td>
                <td>Unlimited</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td>Assessments</td>
                <td>{TIER_CONFIG[TIER_NAMES.FREE].limits.maxAssessments}</td>
                <td>Unlimited</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td>CSV Export</td>
                <td><Check size={16} className="check-green" /></td>
                <td><Check size={16} className="check-green" /></td>
                <td><Check size={16} className="check-green" /></td>
              </tr>
              <tr>
                <td>JSON Export</td>
                <td><X size={16} className="x-red" /></td>
                <td><Check size={16} className="check-green" /></td>
                <td><Check size={16} className="check-green" /></td>
              </tr>
              <tr>
                <td>PDF Export</td>
                <td><X size={16} className="x-red" /></td>
                <td><Check size={16} className="check-green" /></td>
                <td><Check size={16} className="check-green" /></td>
              </tr>
              <tr>
                <td>Assessment Templates</td>
                <td>1 Basic</td>
                <td>All 5 Templates</td>
                <td>All 5 Templates</td>
              </tr>
              <tr>
                <td>Watermarks</td>
                <td>Yes</td>
                <td>No</td>
                <td>No</td>
              </tr>
              <tr>
                <td>White-Label</td>
                <td><X size={16} className="x-red" /></td>
                <td><X size={16} className="x-red" /></td>
                <td><Check size={16} className="check-green" /></td>
              </tr>
              <tr>
                <td>Priority Support</td>
                <td><X size={16} className="x-red" /></td>
                <td><X size={16} className="x-red" /></td>
                <td><Check size={16} className="check-green" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Guarantee Badge */}
        <div className="guarantee-badge">
          <Shield size={20} />
          <span>30-Day Money-Back Guarantee</span>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;

