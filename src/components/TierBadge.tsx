import React from 'react';
import { Zap, Shield, Crown, Info } from 'lucide-react';
import { tierService } from '../services/tierService';
import type { TierLevel } from '../services/tierService';

interface TierBadgeProps {
  showRemaining?: boolean;
  onUpgrade?: () => void;
  className?: string;
}

const TierBadge: React.FC<TierBadgeProps> = ({
  showRemaining = true,
  onUpgrade,
  className = '',
}) => {
  const tierInfo = tierService.getCurrentTier();
  const tierName = tierService.getTierDisplayName(tierInfo.tier);

  const getTierConfig = (tier: TierLevel) => {
    switch (tier) {
      case 'free':
        return {
          icon: <Info className="w-4 h-4" />,
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-300',
        };
      case 'pro':
        return {
          icon: <Zap className="w-4 h-4" />,
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-700',
          borderColor: 'border-blue-300',
        };
      case 'enterprise':
        return {
          icon: <Crown className="w-4 h-4" />,
          bgColor: 'bg-purple-100',
          textColor: 'text-purple-700',
          borderColor: 'border-purple-300',
        };
      default:
        return {
          icon: <Info className="w-4 h-4" />,
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-300',
        };
    }
  };

  const config = getTierConfig(tierInfo.tier);
  const remaining = tierInfo.remainingAnalyses;

  return (
    <div
      className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg border ${config.bgColor} ${config.textColor} ${config.borderColor} ${className}`}
    >
      <div className="flex-shrink-0">{config.icon}</div>
      <span className="text-sm font-medium">{tierName}</span>
      {showRemaining && tierInfo.tier === 'free' && remaining !== undefined && (
        <span className="text-xs opacity-75">
          ({remaining} remaining)
        </span>
      )}
      {tierInfo.tier === 'free' && onUpgrade && (
        <button
          onClick={onUpgrade}
          className="ml-2 text-xs underline hover:no-underline"
        >
          Upgrade
        </button>
      )}
    </div>
  );
};

export default TierBadge;

