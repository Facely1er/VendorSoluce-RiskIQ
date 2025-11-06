import React from 'react';
import { BarChart3, TrendingUp, AlertTriangle, Activity, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from './AppContext';
import './Dashboard.css'; // Reuse dashboard styles

const Analytics = () => {
  const { vendors, assessments } = useApp();

  // Calculate analytics metrics
  const totalVendors = vendors.length;
  const totalAssessments = assessments.length;
  const avgRiskScore = vendors.length > 0
    ? Math.round(vendors.reduce((sum, v) => sum + (v.riskScore || 0), 0) / vendors.length)
    : 0;
  const criticalVendors = vendors.filter(v => (v.riskScore || 0) >= 80).length;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title-section">
          <Link to="/dashboard" className="back-link">
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </Link>
          <div className="dashboard-title-group">
            <BarChart3 size={32} className="dashboard-icon" />
            <div>
              <h1 className="dashboard-title">Analytics</h1>
              <p className="dashboard-subtitle">Comprehensive vendor risk analytics and insights</p>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Key Metrics */}
        <div className="dashboard-stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
              <BarChart3 size={24} color="#3B82F6" />
            </div>
            <div className="stat-content">
              <div className="stat-value">{totalVendors}</div>
              <div className="stat-label">Total Vendors</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
              <TrendingUp size={24} color="#10B981" />
            </div>
            <div className="stat-content">
              <div className="stat-value">{totalAssessments}</div>
              <div className="stat-label">Total Assessments</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
              <AlertTriangle size={24} color="#EF4444" />
            </div>
            <div className="stat-content">
              <div className="stat-value">{criticalVendors}</div>
              <div className="stat-label">Critical Risk Vendors</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}>
              <Activity size={24} color="#8B5CF6" />
            </div>
            <div className="stat-content">
              <div className="stat-value">{avgRiskScore}</div>
              <div className="stat-label">Average Risk Score</div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="dashboard-section">
          <h2 className="section-title">Risk Trend Analysis</h2>
          <div className="section-content">
            <p>Track vendor risk trends over time to identify patterns and potential issues.</p>
            <div className="info-box">
              <p>Analytics features are available in Pro and Enterprise plans. <Link to="/settings">Upgrade now</Link> to unlock advanced analytics.</p>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <h2 className="section-title">Vendor Performance Metrics</h2>
          <div className="section-content">
            <p>Monitor vendor performance metrics and compliance scores across your portfolio.</p>
          </div>
        </div>

        <div className="dashboard-section">
          <h2 className="section-title">Assessment Analytics</h2>
          <div className="section-content">
            <p>Analyze assessment completion rates, scores, and findings across all vendors.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

