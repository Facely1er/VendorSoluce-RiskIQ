// License Tier Configuration and Stripe Payment Links

export const TIER_NAMES = {
  FREE: 'free',
  PRO: 'pro',
  ENTERPRISE: 'enterprise'
};

export const TIER_CONFIG = {
  [TIER_NAMES.FREE]: {
    name: 'Free',
    displayName: 'Free Edition',
    price: '$0',
    limits: {
      maxVendors: 5,
      maxAssessments: 10,
      maxUsers: 1,
    },
    features: {
      canExportCSV: true,
      canExportJSON: false,
      canExportPDF: false,
      hasWatermark: true,
      canUseTemplates: ['nist_basic'],
      hasVendorSoluceBranding: true,
      canWhiteLabel: false,
      hasPrioritySupport: false,
      hasAdvancedReports: false
    },
    stripeLink: null // No payment needed for free
  },
  
  [TIER_NAMES.PRO]: {
    name: 'Pro',
    displayName: 'Professional',
    price: '$149',
    priceDetail: 'one-time payment',
    limits: {
      maxVendors: Infinity,
      maxAssessments: Infinity,
      maxUsers: 5,
    },
    features: {
      canExportCSV: true,
      canExportJSON: true,
      canExportPDF: true,
      hasWatermark: false,
      canUseTemplates: ['nist_basic', 'soc2_quick', 'gdpr_compliance', 'iso27001', 'hipaa_security'],
      hasVendorSoluceBranding: true,
      canWhiteLabel: false,
      hasPrioritySupport: false,
      hasAdvancedReports: true
    },
    stripeLink: import.meta.env.VITE_STRIPE_PRO_PAYMENT_LINK || 'https://buy.stripe.com/test_your-pro-license-link',
    benefits: [
      'Unlimited vendors',
      'Unlimited assessments',
      'PDF & JSON export',
      'All assessment templates',
      'Advanced reporting',
      'No watermarks',
      'Lifetime updates'
    ]
  },
  
  [TIER_NAMES.ENTERPRISE]: {
    name: 'Enterprise',
    displayName: 'Enterprise Edition',
    price: '$449',
    priceDetail: 'one-time payment',
    limits: {
      maxVendors: Infinity,
      maxAssessments: Infinity,
      maxUsers: Infinity,
    },
    features: {
      canExportCSV: true,
      canExportJSON: true,
      canExportPDF: true,
      hasWatermark: false,
      canUseTemplates: ['nist_basic', 'soc2_quick', 'gdpr_compliance', 'iso27001', 'hipaa_security'],
      hasVendorSoluceBranding: false, // Can be customized
      canWhiteLabel: true,
      hasPrioritySupport: true,
      hasAdvancedReports: true
    },
    stripeLink: import.meta.env.VITE_STRIPE_ENTERPRISE_PAYMENT_LINK || 'https://buy.stripe.com/test_your-enterprise-license-link',
    benefits: [
      'Everything in Pro',
      'Unlimited users',
      'White-label capability',
      'Custom branding',
      'Priority support',
      'Dedicated account manager',
      'Custom integrations',
      'Lifetime updates'
    ]
  }
};

// Helper functions
export const getTierConfig = (tierName) => {
  return TIER_CONFIG[tierName] || TIER_CONFIG[TIER_NAMES.FREE];
};

export const canAddVendor = (tierName, currentCount) => {
  const config = getTierConfig(tierName);
  return currentCount < config.limits.maxVendors;
};

export const canAddAssessment = (tierName, currentCount) => {
  const config = getTierConfig(tierName);
  return currentCount < config.limits.maxAssessments;
};

export const canExportPDF = (tierName) => {
  const config = getTierConfig(tierName);
  return config.features.canExportPDF;
};

export const canExportJSON = (tierName) => {
  const config = getTierConfig(tierName);
  return config.features.canExportJSON;
};

export const hasWatermark = (tierName) => {
  const config = getTierConfig(tierName);
  return config.features.hasWatermark;
};

export const canUseTemplate = (tierName, templateId) => {
  const config = getTierConfig(tierName);
  return config.features.canUseTemplates.includes(templateId);
};

export const getAvailableTemplates = (tierName) => {
  const config = getTierConfig(tierName);
  return config.features.canUseTemplates;
};

export const canWhiteLabel = (tierName) => {
  const config = getTierConfig(tierName);
  return config.features.canWhiteLabel;
};

export const getUsagePercentage = (tierName, current, type) => {
  const config = getTierConfig(tierName);
  const limit = type === 'vendors' ? config.limits.maxVendors : config.limits.maxAssessments;
  
  if (limit === Infinity) return 0; // No limit
  
  return Math.min(100, Math.round((current / limit) * 100));
};

export const isApproachingLimit = (tierName, current, type) => {
  const percentage = getUsagePercentage(tierName, current, type);
  return percentage >= 80 && percentage < 100;
};

export const isAtLimit = (tierName, current, type) => {
  const percentage = getUsagePercentage(tierName, current, type);
  return percentage >= 100;
};

export const getUpgradeRecommendation = (currentTier) => {
  if (currentTier === TIER_NAMES.FREE) {
    return TIER_NAMES.PRO;
  }
  if (currentTier === TIER_NAMES.PRO) {
    return TIER_NAMES.ENTERPRISE;
  }
  return null; // Already at top tier
};

