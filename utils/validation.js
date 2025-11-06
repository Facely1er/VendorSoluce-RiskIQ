// Input validation and sanitization utilities

/**
 * Sanitize string input to prevent XSS attacks
 * @param {string} input - Input string to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeString = (input) => {
  if (!input || typeof input !== 'string') return '';
  
  // Remove potentially dangerous characters
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers (onclick=, etc.)
    .trim();
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {object} - Validation result
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }

  const trimmed = email.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: 'Email is required' };
  }

  // RFC 5322 compliant email regex (simplified)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Invalid email format' };
  }

  if (trimmed.length > 254) {
    return { valid: false, error: 'Email is too long' };
  }

  return { valid: true, value: trimmed.toLowerCase() };
};

/**
 * Validate vendor name
 * @param {string} name - Vendor name to validate
 * @returns {object} - Validation result
 */
export const validateVendorName = (name) => {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Vendor name is required' };
  }

  const trimmed = sanitizeString(name).trim();
  
  if (trimmed.length === 0) {
    return { valid: false, error: 'Vendor name is required' };
  }

  if (trimmed.length < 2) {
    return { valid: false, error: 'Vendor name must be at least 2 characters' };
  }

  if (trimmed.length > 100) {
    return { valid: false, error: 'Vendor name must be less than 100 characters' };
  }

  return { valid: true, value: trimmed };
};

/**
 * Validate contract value
 * @param {string|number} value - Contract value to validate
 * @returns {object} - Validation result
 */
export const validateContractValue = (value) => {
  if (value === '' || value === null || value === undefined) {
    return { valid: true, value: 0 }; // Optional field
  }

  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) {
    return { valid: false, error: 'Contract value must be a number' };
  }

  if (numValue < 0) {
    return { valid: false, error: 'Contract value cannot be negative' };
  }

  if (numValue > 999999999999) {
    return { valid: false, error: 'Contract value is too large' };
  }

  return { valid: true, value: Math.round(numValue) };
};

/**
 * Validate assessment score
 * @param {number|string} score - Score to validate (0-100)
 * @returns {object} - Validation result
 */
export const validateScore = (score) => {
  const numScore = typeof score === 'string' ? parseInt(score) : score;
  
  if (isNaN(numScore)) {
    return { valid: false, error: 'Score must be a number' };
  }

  if (numScore < 0 || numScore > 100) {
    return { valid: false, error: 'Score must be between 0 and 100' };
  }

  return { valid: true, value: Math.round(numScore) };
};

/**
 * Validate text field (notes, findings, etc.)
 * @param {string} text - Text to validate
 * @param {object} options - Validation options
 * @returns {object} - Validation result
 */
export const validateTextField = (text, options = {}) => {
  const {
    required = false,
    maxLength = 10000,
    minLength = 0
  } = options;

  if (!text || typeof text !== 'string') {
    if (required) {
      return { valid: false, error: 'This field is required' };
    }
    return { valid: true, value: '' };
  }

  const sanitized = sanitizeString(text).trim();

  if (required && sanitized.length === 0) {
    return { valid: false, error: 'This field is required' };
  }

  if (sanitized.length < minLength) {
    return { valid: false, error: `Text must be at least ${minLength} characters` };
  }

  if (sanitized.length > maxLength) {
    return { valid: false, error: `Text must be less than ${maxLength} characters` };
  }

  return { valid: true, value: sanitized };
};

/**
 * Validate vendor form data
 * @param {object} formData - Vendor form data
 * @returns {object} - Validation result
 */
export const validateVendorForm = (formData) => {
  const errors = {};
  const validated = {};

  // Validate name
  const nameValidation = validateVendorName(formData.name);
  if (!nameValidation.valid) {
    errors.name = nameValidation.error;
  } else {
    validated.name = nameValidation.value;
  }

  // Validate category
  const validCategories = ['strategic', 'operational', 'tactical'];
  if (!formData.category || !validCategories.includes(formData.category)) {
    errors.category = 'Please select a valid category';
  } else {
    validated.category = formData.category;
  }

  // Validate email (optional)
  if (formData.contact && formData.contact.trim()) {
    const emailValidation = validateEmail(formData.contact);
    if (!emailValidation.valid) {
      errors.contact = emailValidation.error;
    } else {
      validated.contact = emailValidation.value;
    }
  } else {
    validated.contact = '';
  }

  // Validate contract value (optional)
  const valueValidation = validateContractValue(formData.contractValue);
  if (!valueValidation.valid) {
    errors.contractValue = valueValidation.error;
  } else {
    validated.contractValue = valueValidation.value;
  }

  // Validate other optional fields
  validated.sector = sanitizeString(formData.sector || '').trim();
  validated.location = sanitizeString(formData.location || '').trim();
  validated.dataTypes = sanitizeString(formData.dataTypes || '').trim();
  
  const notesValidation = validateTextField(formData.notes || '', { maxLength: 5000 });
  validated.notes = notesValidation.valid ? notesValidation.value : '';

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    data: validated
  };
};

/**
 * Validate assessment form data
 * @param {object} formData - Assessment form data
 * @returns {object} - Validation result
 */
export const validateAssessmentForm = (formData) => {
  const errors = {};
  const validated = {};

  // Validate vendor ID
  if (!formData.vendorId || formData.vendorId.trim() === '') {
    errors.vendorId = 'Please select a vendor';
  } else {
    validated.vendorId = formData.vendorId.trim();
  }

  // Validate template ID
  const validTemplates = ['nist_basic', 'soc2_quick', 'gdpr_compliance', 'iso27001', 'hipaa_security'];
  if (!formData.templateId || !validTemplates.includes(formData.templateId)) {
    errors.templateId = 'Please select a valid assessment template';
  } else {
    validated.templateId = formData.templateId;
  }

  // Validate scores
  const scoreFields = ['securityScore', 'complianceScore', 'financialScore', 'operationalScore'];
  scoreFields.forEach(field => {
    const scoreValidation = validateScore(formData[field]);
    if (!scoreValidation.valid) {
      errors[field] = scoreValidation.error;
    } else {
      validated[field] = scoreValidation.value;
    }
  });

  // Validate assessment type
  const validTypes = ['initial', 'periodic', 'event-driven'];
  if (!formData.assessmentType || !validTypes.includes(formData.assessmentType)) {
    validated.assessmentType = 'initial'; // Default
  } else {
    validated.assessmentType = formData.assessmentType;
  }

  // Validate findings (optional)
  const findingsValidation = validateTextField(formData.findings || '', { maxLength: 10000 });
  validated.findings = findingsValidation.valid ? findingsValidation.value : '';

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    data: validated
  };
};

