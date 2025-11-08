import React, { useState } from 'react';
import { X, Zap, Shield, Crown, ArrowRight, CheckCircle } from 'lucide-react';
import { tierService } from '../services/tierService';
import type { TierLevel } from '../services/tierService';

interface UpgradePromptProps {
  variant?: 'limit-reached' | 'feature-locked' | 'upgrade-suggestion';
  feature?: string;
  onDismiss?: () => void;
  onUpgrade?: () => void;
  onNavigateToPricing?: () => void;
}

const UpgradePrompt: React.FC<UpgradePromptProps> = ({
  variant = 'upgrade-suggestion',
  feature,
  onDismiss,
  onUpgrade,
  onNavigateToPricing,
}) => {
  const [dismissed, setDismissed] = useState(false);
  const tierInfo = tierService.getCurrentTier();

  if (dismissed) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
    } else if (onNavigateToPricing) {
      onNavigateToPricing();
    }
  };

  const getVariantContent = () => {
    switch (variant) {
      case 'limit-reached':
        return {
          title: 'Monthly Analysis Limit Reached',
          message: `You've used all ${tierInfo.maxAnalyses || 1} free SBOM analysis${tierInfo.maxAnalyses === 1 ? '' : 'es'} this month.`,
          icon: <Zap className="w-6 h-6 text-yellow-500" />,
          color: 'yellow',
        };
      case 'feature-locked':
        return {
          title: 'Premium Feature',
          message: feature
            ? `${feature} is available in Pro and Enterprise tiers.`
            : 'This feature is available in Pro and Enterprise tiers.',
          icon: <Shield className="w-6 h-6 text-blue-500" />,
          color: 'blue',
        };
      case 'upgrade-suggestion':
      default:
        return {
          title: 'Upgrade to Pro',
          message: 'Unlock unlimited SBOM analyses, PDF exports, and executive reports.',
          icon: <Crown className="w-6 h-6 text-purple-500" />,
          color: 'purple',
        };
    }
  };

  const content = getVariantContent();
  const features = tierService.getTierFeatures('pro');

  const colorClasses = {
    yellow: {
      bg: 'bg-yellow-50 border-yellow-200',
      text: 'text-yellow-800',
      button: 'bg-yellow-600 hover:bg-yellow-700 text-white',
    },
    blue: {
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
    purple: {
      bg: 'bg-purple-50 border-purple-200',
      text: 'text-purple-800',
      button: 'bg-purple-600 hover:bg-purple-700 text-white',
    },
  };

  const colors = colorClasses[content.color as keyof typeof colorClasses] || colorClasses.purple;

  return (
    <div className={`rounded-lg border-2 ${colors.bg} ${colors.text} p-4 mb-4 relative`}>
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="flex items-start space-x-3 pr-6">
        <div className="flex-shrink-0 mt-1">{content.icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{content.title}</h3>
          <p className="text-sm mb-3">{content.message}</p>

          {variant === 'upgrade-suggestion' && (
            <div className="mb-3">
              <p className="text-sm font-medium mb-2">Pro features include:</p>
              <ul className="space-y-1">
                {features.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className="text-sm flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <button
              onClick={handleUpgrade}
              className={`${colors.button} px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2`}
            >
              <span>Upgrade Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleDismiss}
              className="text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePrompt;

