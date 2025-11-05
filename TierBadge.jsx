import React, { useState } from 'react';
import { Crown, Zap, Info } from 'lucide-react';
import { useApp } from './AppContext';
import { getTierConfig, getUsagePercentage, TIER_NAMES } from './utils/tierConfig';
import './TierBadge.css';

const TierBadge = ({ showUsage = false, onClick }) => {
  const { licenseTier, vendors, assessments, triggerUpgradeModal } = useApp();
  const [showTooltip, setShowTooltip] = useState(false);
  
  const tierConfig = getTierConfig(licenseTier);
  const vendorUsagePercent = getUsagePercentage(licenseTier, vendors.length, 'vendors');
  const assessmentUsagePercent = getUsagePercentage(licenseTier, assessments.length, 'assessments');

  const getTierIcon = () => {
    switch (licenseTier) {
      case TIER_NAMES.ENTERPRISE:
        return <Crown size={16} />;
      case TIER_NAMES.PRO:
        return <Zap size={16} />;
      default:
        return <Info size={16} />;
    }
  };

  const getTierClass = () => {
    switch (licenseTier) {
      case TIER_NAMES.ENTERPRISE:
        return 'tier-badge-enterprise';
      case TIER_NAMES.PRO:
        return 'tier-badge-pro';
      default:
        return 'tier-badge-free';
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (licenseTier === TIER_NAMES.FREE || licenseTier === TIER_NAMES.PRO) {
      triggerUpgradeModal('Unlock more features with an upgrade!');
    }
  };

  return (
    <div 
      className={`tier-badge ${getTierClass()}`}
      onClick={handleClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="tier-badge-main">
        {getTierIcon()}
        <span className="tier-badge-name">{tierConfig.displayName}</span>
        {(licenseTier === TIER_NAMES.FREE || licenseTier === TIER_NAMES.PRO) && (
          <span className="tier-badge-upgrade">Upgrade</span>
        )}
      </div>

      {showTooltip && (
        <div className="tier-badge-tooltip">
          <div className="tooltip-header">
            <strong>{tierConfig.displayName}</strong>
            {tierConfig.price && <span>{tierConfig.price}</span>}
          </div>

          {showUsage && licenseTier !== TIER_NAMES.ENTERPRISE && licenseTier !== TIER_NAMES.PRO && (
            <div className="tooltip-usage">
              <div className="usage-row">
                <span>Vendors:</span>
                <span className={vendorUsagePercent >= 80 ? 'usage-warning' : ''}>
                  {vendors.length} / {tierConfig.limits.maxVendors}
                </span>
              </div>
              {vendorUsagePercent > 0 && (
                <div className="usage-bar">
                  <div 
                    className={`usage-bar-fill ${vendorUsagePercent >= 80 ? 'usage-bar-warning' : ''}`}
                    style={{ width: `${vendorUsagePercent}%` }}
                  />
                </div>
              )}

              <div className="usage-row">
                <span>Assessments:</span>
                <span className={assessmentUsagePercent >= 80 ? 'usage-warning' : ''}>
                  {assessments.length} / {tierConfig.limits.maxAssessments}
                </span>
              </div>
              {assessmentUsagePercent > 0 && (
                <div className="usage-bar">
                  <div 
                    className={`usage-bar-fill ${assessmentUsagePercent >= 80 ? 'usage-bar-warning' : ''}`}
                    style={{ width: `${assessmentUsagePercent}%` }}
                  />
                </div>
              )}
            </div>
          )}

          {(licenseTier === TIER_NAMES.FREE || licenseTier === TIER_NAMES.PRO) && (
            <div className="tooltip-action">
              Click to upgrade
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TierBadge;

