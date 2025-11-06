// Environment variable validation utility

import logger from './logger';

/**
 * Validates that required environment variables are set
 * @param {array} requiredVars - Array of required environment variable names
 * @returns {object} - Validation result
 */
export const validateEnvVars = (requiredVars = []) => {
  const missing = [];
  const invalid = [];
  const warnings = [];

  requiredVars.forEach(varName => {
    const value = import.meta.env[varName];
    
    if (!value || value.trim() === '') {
      missing.push(varName);
    } else if (value.includes('your_') || value.includes('xxxxx') || value.includes('placeholder')) {
      invalid.push(varName);
    }
  });

  // Check for common optional but recommended vars
  const optionalVars = {
    VITE_LICENSE_API_URL: 'License API endpoint (optional)',
    VITE_STRIPE_PRO_PAYMENT_LINK: 'Stripe Pro payment link (optional for testing)',
    VITE_STRIPE_ENTERPRISE_PAYMENT_LINK: 'Stripe Enterprise payment link (optional for testing)'
  };

  Object.keys(optionalVars).forEach(varName => {
    const value = import.meta.env[varName];
    if (value && (value.includes('test_') || value.includes('your_'))) {
      warnings.push({
        var: varName,
        message: `${optionalVars[varName]} appears to be a placeholder value`
      });
    }
  });

  const isValid = missing.length === 0 && invalid.length === 0;

  if (!isValid) {
    logger.warn('Environment variable validation failed:', { missing, invalid });
  }

  if (warnings.length > 0) {
    warnings.forEach(warning => {
      logger.warn(`Environment variable warning: ${warning.var} - ${warning.message}`);
    });
  }

  return {
    valid: isValid,
    missing,
    invalid,
    warnings
  };
};

/**
 * Get environment variable with fallback
 * @param {string} varName - Environment variable name
 * @param {any} fallback - Fallback value if not set
 * @returns {any} - Environment variable value or fallback
 */
export const getEnvVar = (varName, fallback = null) => {
  const value = import.meta.env[varName];
  return value && value.trim() !== '' ? value : fallback;
};

/**
 * Check if running in production
 * @returns {boolean}
 */
export const isProduction = () => {
  return import.meta.env.PROD === true || import.meta.env.MODE === 'production';
};

/**
 * Check if running in development
 * @returns {boolean}
 */
export const isDevelopment = () => {
  return import.meta.env.DEV === true || import.meta.env.MODE === 'development';
};

/**
 * Validate Stripe configuration
 * @returns {object} - Validation result
 */
export const validateStripeConfig = () => {
  const required = [];
  const optional = [];

  // Check required Stripe vars (only if payment links are being used)
  const stripeLinks = [
    import.meta.env.VITE_STRIPE_PRO_PAYMENT_LINK,
    import.meta.env.VITE_STRIPE_ENTERPRISE_PAYMENT_LINK
  ];

  const hasPaymentLinks = stripeLinks.some(link => link && !link.includes('test_your'));

  if (hasPaymentLinks) {
    // If payment links are configured, check publishable key
    if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY.includes('your_')) {
      required.push('VITE_STRIPE_PUBLISHABLE_KEY');
    }
  }

  return {
    valid: required.length === 0,
    required,
    optional,
    message: required.length === 0 
      ? 'Stripe configuration is valid' 
      : `Missing required Stripe configuration: ${required.join(', ')}`
  };
};

/**
 * Initialize and validate environment
 * Called on app startup
 */
export const initializeEnvironment = () => {
  const envCheck = validateEnvVars([]); // No required vars by default

  // Validate Stripe config if payment links are used
  const stripeCheck = validateStripeConfig();

  if (!stripeCheck.valid && isProduction()) {
    logger.warn('Stripe configuration may be incomplete for production');
  }

  return {
    env: envCheck,
    stripe: stripeCheck,
    isProduction: isProduction(),
    isDevelopment: isDevelopment()
  };
};

