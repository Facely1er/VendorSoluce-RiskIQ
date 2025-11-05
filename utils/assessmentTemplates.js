// Assessment Templates Library

export const ASSESSMENT_TEMPLATES = {
  nist_basic: {
    id: 'nist_basic',
    name: 'NIST Basic Assessment',
    description: 'Basic 4-category risk assessment based on NIST guidelines',
    tier: 'free', // Available to all tiers
    categories: [
      {
        id: 'security',
        name: 'Security',
        description: 'Information security controls and practices',
        weight: 0.25
      },
      {
        id: 'compliance',
        name: 'Compliance',
        description: 'Regulatory and policy compliance',
        weight: 0.25
      },
      {
        id: 'financial',
        name: 'Financial',
        description: 'Financial stability and risk',
        weight: 0.25
      },
      {
        id: 'operational',
        name: 'Operational',
        description: 'Operational capabilities and reliability',
        weight: 0.25
      }
    ]
  },
  
  soc2_quick: {
    id: 'soc2_quick',
    name: 'SOC 2 Quick Assessment',
    description: 'Quick assessment based on SOC 2 Trust Service Criteria',
    tier: 'pro',
    categories: [
      {
        id: 'security',
        name: 'Security',
        description: 'Protection against unauthorized access',
        weight: 0.25
      },
      {
        id: 'availability',
        name: 'Availability',
        description: 'System availability and reliability',
        weight: 0.20
      },
      {
        id: 'processing_integrity',
        name: 'Processing Integrity',
        description: 'System processing completeness and accuracy',
        weight: 0.20
      },
      {
        id: 'confidentiality',
        name: 'Confidentiality',
        description: 'Protection of confidential information',
        weight: 0.20
      },
      {
        id: 'privacy',
        name: 'Privacy',
        description: 'Personal information protection',
        weight: 0.15
      }
    ]
  },
  
  gdpr_compliance: {
    id: 'gdpr_compliance',
    name: 'GDPR Compliance Check',
    description: 'Assessment focused on GDPR data protection requirements',
    tier: 'pro',
    categories: [
      {
        id: 'data_protection',
        name: 'Data Protection',
        description: 'Data protection by design and default',
        weight: 0.30
      },
      {
        id: 'data_subject_rights',
        name: 'Data Subject Rights',
        description: 'Support for data subject access requests',
        weight: 0.25
      },
      {
        id: 'security_measures',
        name: 'Security Measures',
        description: 'Technical and organizational security',
        weight: 0.25
      },
      {
        id: 'breach_response',
        name: 'Breach Response',
        description: 'Data breach notification procedures',
        weight: 0.20
      }
    ]
  },
  
  iso27001: {
    id: 'iso27001',
    name: 'ISO 27001 Security Assessment',
    description: 'Information security management based on ISO 27001',
    tier: 'pro',
    categories: [
      {
        id: 'information_security_policies',
        name: 'Information Security Policies',
        description: 'Security policy framework',
        weight: 0.15
      },
      {
        id: 'access_control',
        name: 'Access Control',
        description: 'Access management and control',
        weight: 0.20
      },
      {
        id: 'cryptography',
        name: 'Cryptography',
        description: 'Cryptographic controls',
        weight: 0.15
      },
      {
        id: 'physical_security',
        name: 'Physical Security',
        description: 'Physical and environmental security',
        weight: 0.15
      },
      {
        id: 'operations_security',
        name: 'Operations Security',
        description: 'Operational procedures and controls',
        weight: 0.20
      },
      {
        id: 'incident_management',
        name: 'Incident Management',
        description: 'Security incident management',
        weight: 0.15
      }
    ]
  },
  
  hipaa_security: {
    id: 'hipaa_security',
    name: 'HIPAA Security Assessment',
    description: 'Healthcare security assessment based on HIPAA requirements',
    tier: 'pro',
    categories: [
      {
        id: 'administrative_safeguards',
        name: 'Administrative Safeguards',
        description: 'Security management processes',
        weight: 0.30
      },
      {
        id: 'physical_safeguards',
        name: 'Physical Safeguards',
        description: 'Physical access controls',
        weight: 0.25
      },
      {
        id: 'technical_safeguards',
        name: 'Technical Safeguards',
        description: 'Technical security controls',
        weight: 0.30
      },
      {
        id: 'breach_notification',
        name: 'Breach Notification',
        description: 'Breach notification procedures',
        weight: 0.15
      }
    ]
  }
};

// Helper functions
export const getTemplate = (templateId) => {
  return ASSESSMENT_TEMPLATES[templateId] || ASSESSMENT_TEMPLATES.nist_basic;
};

export const getAllTemplates = () => {
  return Object.values(ASSESSMENT_TEMPLATES);
};

export const getTemplatesByTier = (tier) => {
  return Object.values(ASSESSMENT_TEMPLATES).filter(template => {
    if (tier === 'enterprise' || tier === 'pro') {
      return true; // Pro and Enterprise get all templates
    }
    return template.tier === 'free';
  });
};

export const getTemplateCategories = (templateId) => {
  const template = getTemplate(templateId);
  return template.categories;
};

export const initializeAssessmentScores = (templateId) => {
  const template = getTemplate(templateId);
  const scores = {};
  
  template.categories.forEach(category => {
    scores[category.id] = 70; // Default score
  });
  
  return scores;
};

export const calculateWeightedScore = (templateId, scores) => {
  const template = getTemplate(templateId);
  let weightedSum = 0;
  
  template.categories.forEach(category => {
    const score = scores[category.id] || 0;
    weightedSum += score * category.weight;
  });
  
  return Math.round(weightedSum);
};

export const getTemplateIcon = (templateId) => {
  const icons = {
    nist_basic: '📋',
    soc2_quick: '🔒',
    gdpr_compliance: '🇪🇺',
    iso27001: '🛡️',
    hipaa_security: '🏥'
  };
  return icons[templateId] || '📄';
};

