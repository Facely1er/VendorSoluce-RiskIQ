import React, { createContext, useContext, useState, useEffect } from 'react';

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

  // Load data from localStorage on mount
  useEffect(() => {
    const savedVendors = localStorage.getItem('vendors');
    const savedAssessments = localStorage.getItem('assessments');
    const savedTheme = localStorage.getItem('theme');

    if (savedVendors) setVendors(JSON.parse(savedVendors));
    if (savedAssessments) setAssessments(JSON.parse(savedAssessments));
    if (savedTheme) setTheme(savedTheme);
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

  const addVendor = (vendor) => {
    const newVendor = {
      ...vendor,
      id: `vendor-${Date.now()}`,
      createdAt: new Date().toISOString(),
      lastAssessment: null,
      riskScore: calculateRiskScore(vendor)
    };
    setVendors(prev => [...prev, newVendor]);
    showToast('Success', 'Vendor added successfully', 'success');
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
    toggleTheme,
    addVendor,
    updateVendor,
    deleteVendor,
    addAssessment,
    deleteAssessment,
    showToast,
    generateSampleVendors,
    clearAllData,
    calculateRiskScore
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
