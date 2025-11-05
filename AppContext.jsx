import React, { createContext, useContext, useState, useEffect } from 'react';
import { TIER_NAMES, getTierConfig, canAddVendor, canAddAssessment } from './utils/tierConfig';
import { checkLicenseStatus } from './utils/licenseValidator';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [vendors, setVendors] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [theme, setTheme] = useState('light');
  const [toast, setToast] = useState(null);
  const [licenseTier, setLicenseTierState] = useState(TIER_NAMES.FREE);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadInitialData = async () => {
      const savedVendors = localStorage.getItem('vendors');
      const savedAssessments = localStorage.getItem('assessments');
      const savedTheme = localStorage.getItem('theme');

      if (savedVendors) setVendors(JSON.parse(savedVendors));
      if (savedAssessments) setAssessments(JSON.parse(savedAssessments));
      if (savedTheme) setTheme(savedTheme);

      // Check license status on app startup
      try {
        const licenseStatus = await checkLicenseStatus();
        
        if (licenseStatus.licensed) {
          setLicenseTierState(licenseStatus.tier);
          console.log('✅ License validated:', licenseStatus.message);
          
          // Show notification for expired license
          if (licenseStatus.expired) {
            setTimeout(() => {
              showToast('License Expired', licenseStatus.message, 'warning');
            }, 2000);
          }
        } else {
          // No valid license, use Free tier
          setLicenseTierState(TIER_NAMES.FREE);
          
          // Only show message if there was a license issue (not first time use)
          const savedLicenseTier = localStorage.getItem('licenseTier');
          if (savedLicenseTier && savedLicenseTier !== TIER_NAMES.FREE) {
            console.log('⚠️ License validation failed, reverting to Free tier');
            setTimeout(() => {
              showToast('Notice', licenseStatus.message || 'Using Free tier', 'info');
            }, 2000);
          }
        }
      } catch (error) {
        console.error('Error checking license status:', error);
        // Fallback to saved tier or Free
        const savedLicenseTier = localStorage.getItem('licenseTier');
        setLicenseTierState(savedLicenseTier || TIER_NAMES.FREE);
      }
    };

    loadInitialData();
  }, []);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Save vendors to localStorage
  useEffect(() => {
    if (vendors.length > 0 || localStorage.getItem('vendors')) {
      localStorage.setItem('vendors', JSON.stringify(vendors));
    }
  }, [vendors]);

  // Save assessments to localStorage
  useEffect(() => {
    if (assessments.length > 0 || localStorage.getItem('assessments')) {
      localStorage.setItem('assessments', JSON.stringify(assessments));
    }
  }, [assessments]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // License tier management
  const setLicenseTier = (tier) => {
    setLicenseTierState(tier);
    localStorage.setItem('licenseTier', tier);
    showToast('Updated', `License upgraded to ${getTierConfig(tier).displayName}`, 'success');
  };

  const getLicenseTier = () => {
    return licenseTier;
  };

  const getTierLimits = () => {
    return getTierConfig(licenseTier).limits;
  };

  const getTierFeatures = () => {
    return getTierConfig(licenseTier).features;
  };

  const canAddNewVendor = () => {
    return canAddVendor(licenseTier, vendors.length);
  };

  const canAddNewAssessment = () => {
    return canAddAssessment(licenseTier, assessments.length);
  };

  const triggerUpgradeModal = (reason) => {
    setShowUpgradeModal(true);
    showToast('Limit Reached', reason, 'warning');
  };

  const closeUpgradeModal = () => {
    setShowUpgradeModal(false);
  };

  const addVendor = (vendor) => {
    // Check tier limits
    if (!canAddNewVendor()) {
      const limits = getTierLimits();
      triggerUpgradeModal(`You've reached your vendor limit (${limits.maxVendors}). Upgrade to add more vendors.`);
      return false;
    }

    const newVendor = {
      ...vendor,
      id: `vendor-${Date.now()}`,
      createdAt: new Date().toISOString(),
      lastAssessment: null,
      riskScore: calculateRiskScore(vendor)
    };
    setVendors(prev => [...prev, newVendor]);
    showToast('Success', 'Vendor added successfully', 'success');
    return true;
  };

  const updateVendor = (vendorId, updates) => {
    setVendors(prev => prev.map(v => 
      v.id === vendorId 
        ? { ...v, ...updates, riskScore: calculateRiskScore({ ...v, ...updates }) }
        : v
    ));
    showToast('Success', 'Vendor updated successfully', 'success');
  };

  const deleteVendor = (vendorId) => {
    setVendors(prev => prev.filter(v => v.id !== vendorId));
    setAssessments(prev => prev.filter(a => a.vendorId !== vendorId));
    showToast('Deleted', 'Vendor removed successfully', 'warning');
  };

  const addAssessment = (assessment) => {
    // Check tier limits
    if (!canAddNewAssessment()) {
      const limits = getTierLimits();
      triggerUpgradeModal(`You've reached your assessment limit (${limits.maxAssessments}). Upgrade to add more assessments.`);
      return false;
    }

    const newAssessment = {
      ...assessment,
      id: `assessment-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setAssessments(prev => [...prev, newAssessment]);
    
    // Update vendor's last assessment date
    updateVendor(assessment.vendorId, {
      lastAssessment: newAssessment.createdAt
    });
    
    showToast('Success', 'Assessment saved successfully', 'success');
    return true;
  };

  const deleteAssessment = (assessmentId) => {
    setAssessments(prev => prev.filter(a => a.id !== assessmentId));
    showToast('Deleted', 'Assessment removed', 'warning');
  };

  const calculateRiskScore = (vendor) => {
    let score = 30; // Base score
    
    // Category risk
    if (vendor.category === 'strategic') score += 30;
    else if (vendor.category === 'operational') score += 20;
    else score += 10;
    
    // Contract value risk
    if (vendor.contractValue > 500000) score += 25;
    else if (vendor.contractValue > 100000) score += 15;
    else score += 5;
    
    // Data type risk
    if (vendor.dataTypes) {
      const types = vendor.dataTypes.toLowerCase();
      if (types.includes('pii') || types.includes('phi') || types.includes('financial')) {
        score += 20;
      }
    }
    
    // Assessment recency
    if (vendor.lastAssessment) {
      const daysSince = Math.floor((Date.now() - new Date(vendor.lastAssessment)) / (1000 * 60 * 60 * 24));
      if (daysSince > 180) score += 15;
      else if (daysSince > 90) score += 10;
      else score -= 10;
    } else {
      score += 20;
    }
    
    return Math.min(100, Math.max(0, score));
  };

  const showToast = (title, message, type = 'info') => {
    setToast({ title, message, type, id: Date.now() });
    setTimeout(() => setToast(null), 4000);
  };

  const generateSampleVendors = (count) => {
    const names = ['TechCorp', 'DataSystems', 'CloudServe', 'SecureNet', 'FinTech', 
                  'HealthCare', 'LogisTrans', 'ConsultPro', 'DevOps', 'InfoSec'];
    const categories = ['strategic', 'operational', 'tactical'];
    const sectors = ['Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Retail'];
    const locations = ['USA', 'UK', 'Germany', 'Canada', 'France'];
    
    const samples = [];
    for (let i = 0; i < count; i++) {
      const vendor = {
        id: `sample-${Date.now()}-${i}`,
        name: `${names[i % names.length]} ${Math.floor(Math.random() * 100) + 1}`,
        category: categories[Math.floor(Math.random() * categories.length)],
        sector: sectors[Math.floor(Math.random() * sectors.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        contractValue: Math.floor(Math.random() * 500000) + 50000,
        contact: `contact@vendor${i}.com`,
        dataTypes: 'PII, Financial',
        notes: 'Sample vendor for testing',
        createdAt: new Date().toISOString(),
        lastAssessment: null
      };
      vendor.riskScore = calculateRiskScore(vendor);
      samples.push(vendor);
    }
    
    setVendors(prev => [...prev, ...samples]);
    showToast('Loaded', `${count} sample vendors added`, 'success');
  };

  const clearAllData = () => {
    setVendors([]);
    setAssessments([]);
    localStorage.removeItem('vendors');
    localStorage.removeItem('assessments');
    showToast('Cleared', 'All data deleted', 'warning');
  };

  const value = {
    vendors,
    assessments,
    theme,
    toast,
    licenseTier,
    showUpgradeModal,
    toggleTheme,
    addVendor,
    updateVendor,
    deleteVendor,
    addAssessment,
    deleteAssessment,
    showToast,
    generateSampleVendors,
    clearAllData,
    calculateRiskScore,
    // License tier functions
    setLicenseTier,
    getLicenseTier,
    getTierLimits,
    getTierFeatures,
    canAddNewVendor,
    canAddNewAssessment,
    triggerUpgradeModal,
    closeUpgradeModal
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
