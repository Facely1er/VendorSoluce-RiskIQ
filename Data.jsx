import React, { useState } from 'react';
import { Database, Upload, Download, FileJson, FileSpreadsheet, Trash2, RefreshCw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from './AppContext';
import { exportToCSV, exportToJSON } from './helpers';
import { canExportJSON } from './utils/tierConfig';
import './Dashboard.css'; // Reuse dashboard styles

const Data = () => {
  const { vendors, assessments, licenseTier, showToast, clearAllData, generateSampleVendors } = useApp();
  const [isExporting, setIsExporting] = useState(false);

  const handleExportJSON = () => {
    if (!canExportJSON(licenseTier)) {
      showToast('Upgrade Required', 'JSON export is available in Pro and Enterprise plans', 'warning');
      return;
    }

    try {
      setIsExporting(true);
      const data = {
        vendors,
        assessments,
        exportedAt: new Date().toISOString(),
        version: '2.0.0'
      };
      exportToJSON(data, `vendorsoluce-export-${Date.now()}.json`, licenseTier);
      showToast('Success', 'Data exported successfully', 'success');
    } catch (error) {
      showToast('Error', 'Failed to export data', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportCSV = () => {
    try {
      setIsExporting(true);
      const vendorHeaders = ['Name', 'Category', 'Sector', 'Location', 'Contract Value', 'Risk Score', 'Contact'];
      const vendorRows = vendors.map(v => [
        v.name || '',
        v.category || '',
        v.sector || '',
        v.location || '',
        v.contractValue || 0,
        v.riskScore || 0,
        v.contact || ''
      ]);
      const csvData = [vendorHeaders, ...vendorRows];
      exportToCSV(csvData.map(row => row.join(',')), `vendorsoluce-vendors-${Date.now()}.csv`, licenseTier);
      showToast('Success', 'Vendors exported successfully', 'success');
    } catch (error) {
      showToast('Error', 'Failed to export vendors', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = () => {
    showToast('Info', 'Import feature available via Settings > Data Management', 'info');
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all data? This action cannot be undone.')) {
      clearAllData();
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title-section">
          <Link to="/dashboard" className="back-link">
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </Link>
          <div className="dashboard-title-group">
            <Database size={32} className="dashboard-icon" />
            <div>
              <h1 className="dashboard-title">Data Management</h1>
              <p className="dashboard-subtitle">Export, import, and manage your vendor risk data</p>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Data Overview */}
        <div className="dashboard-stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
              <Database size={24} color="#3B82F6" />
            </div>
            <div className="stat-content">
              <div className="stat-value">{vendors.length}</div>
              <div className="stat-label">Vendors Stored</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
              <Database size={24} color="#10B981" />
            </div>
            <div className="stat-content">
              <div className="stat-value">{assessments.length}</div>
              <div className="stat-label">Assessments Stored</div>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="dashboard-section">
          <h2 className="section-title">Export Data</h2>
          <div className="export-grid">
            <div className="export-card">
              <div className="export-icon">
                <FileJson size={32} />
              </div>
              <h3>Export as JSON</h3>
              <p>Complete data backup in JSON format. Includes all vendors and assessments.</p>
              <button 
                className="btn btn-primary" 
                onClick={handleExportJSON}
                disabled={isExporting || vendors.length === 0}
              >
                <Download size={18} />
                {isExporting ? 'Exporting...' : 'Export JSON'}
              </button>
              {!canExportJSON(licenseTier) && (
                <p className="upgrade-hint">Requires Pro or Enterprise plan</p>
              )}
            </div>

            <div className="export-card">
              <div className="export-icon">
                <FileSpreadsheet size={32} />
              </div>
              <h3>Export as CSV</h3>
              <p>Vendor data in CSV format for spreadsheet applications like Excel.</p>
              <button 
                className="btn btn-primary" 
                onClick={handleExportCSV}
                disabled={isExporting || vendors.length === 0}
              >
                <Download size={18} />
                {isExporting ? 'Exporting...' : 'Export CSV'}
              </button>
            </div>
          </div>
        </div>

        {/* Import Options */}
        <div className="dashboard-section">
          <h2 className="section-title">Import Data</h2>
          <div className="section-content">
            <div className="info-box">
              <p>Import vendor and assessment data from JSON or CSV files.</p>
              <button className="btn btn-secondary" onClick={handleImport}>
                <Upload size={18} />
                Import Data
              </button>
              <p className="hint">Full import functionality available in Settings</p>
            </div>
          </div>
        </div>

        {/* Data Management Actions */}
        <div className="dashboard-section">
          <h2 className="section-title">Data Management</h2>
          <div className="management-actions">
            <button 
              className="btn btn-secondary"
              onClick={() => generateSampleVendors(5)}
            >
              <RefreshCw size={18} />
              Generate Sample Data
            </button>
            <button 
              className="btn btn-danger"
              onClick={handleClearAll}
              disabled={vendors.length === 0 && assessments.length === 0}
            >
              <Trash2 size={18} />
              Clear All Data
            </button>
          </div>
          {vendors.length === 0 && assessments.length === 0 && (
            <div className="info-box">
              <p>No data to manage. Add vendors and assessments to get started.</p>
              <div className="action-buttons">
                <Link to="/vendors" className="btn btn-primary">
                  Add Vendors
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Data;

