import React, { useState } from 'react';
import { FileDown, FileText, Download, Calendar, Filter, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from './AppContext';
import { formatDate } from './helpers';
import './Dashboard.css'; // Reuse dashboard styles

const Reports = () => {
  const { vendors, assessments } = useApp();
  const [selectedReportType, setSelectedReportType] = useState('all');

  const reportTypes = [
    { id: 'all', label: 'All Reports', icon: FileText },
    { id: 'vendors', label: 'Vendor Reports', icon: FileText },
    { id: 'assessments', label: 'Assessment Reports', icon: FileText },
    { id: 'risk', label: 'Risk Reports', icon: FileText }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title-section">
          <Link to="/dashboard" className="back-link">
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </Link>
          <div className="dashboard-title-group">
            <FileDown size={32} className="dashboard-icon" />
            <div>
              <h1 className="dashboard-title">Reports</h1>
              <p className="dashboard-subtitle">Generate and download comprehensive vendor risk reports</p>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Report Type Filter */}
        <div className="dashboard-section">
          <div className="filter-bar">
            {reportTypes.map(type => (
              <button
                key={type.id}
                className={`filter-button ${selectedReportType === type.id ? 'active' : ''}`}
                onClick={() => setSelectedReportType(type.id)}
              >
                <type.icon size={18} />
                <span>{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Reports */}
        <div className="dashboard-section">
          <h2 className="section-title">Quick Reports</h2>
          <div className="reports-grid">
            <div className="report-card">
              <div className="report-icon">
                <FileText size={32} />
              </div>
              <h3>Vendor Summary Report</h3>
              <p>Complete overview of all vendors including risk scores and assessment status</p>
              <button className="btn btn-primary">
                <Download size={18} />
                Generate Report
              </button>
            </div>

            <div className="report-card">
              <div className="report-icon">
                <FileText size={32} />
              </div>
              <h3>Risk Assessment Report</h3>
              <p>Detailed risk analysis for all vendors with scoring breakdown</p>
              <button className="btn btn-primary">
                <Download size={18} />
                Generate Report
              </button>
            </div>

            <div className="report-card">
              <div className="report-icon">
                <FileText size={32} />
              </div>
              <h3>Compliance Report</h3>
              <p>Compliance status and audit trail for all vendor assessments</p>
              <button className="btn btn-primary">
                <Download size={18} />
                Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="dashboard-section">
          <h2 className="section-title">Available Reports</h2>
          <div className="section-content">
            {vendors.length === 0 && assessments.length === 0 ? (
              <div className="info-box">
                <p>No reports available. Add vendors and assessments to generate reports.</p>
                <div className="action-buttons">
                  <Link to="/vendors" className="btn btn-primary">
                    Add Vendors
                  </Link>
                  <Link to="/assessments" className="btn btn-secondary">
                    Create Assessment
                  </Link>
                </div>
              </div>
            ) : (
              <div className="info-box">
                <p>
                  <strong>Total Vendors:</strong> {vendors.length} | 
                  <strong> Total Assessments:</strong> {assessments.length}
                </p>
                <p>Reports can be generated from the Dashboard or individual vendor/assessment pages.</p>
                <div className="action-buttons">
                  <Link to="/dashboard" className="btn btn-primary">
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

