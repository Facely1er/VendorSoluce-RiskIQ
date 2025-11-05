import React, { useState } from 'react';
import { Plus, X, FileText } from 'lucide-react';
import { useApp } from './AppContext';
import { getRiskLevel, getRiskBadgeClass, formatDate } from './helpers';
import './Assessments.css';

const Assessments = () => {
  const { vendors, assessments, addAssessment, deleteAssessment } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    vendorId: '',
    assessmentType: 'initial',
    securityScore: 70,
    complianceScore: 70,
    financialScore: 70,
    operationalScore: 70,
    findings: ''
  });

  const handleOpenModal = () => {
    if (vendors.length === 0) {
      alert('Please add vendors before creating assessments');
      return;
    }
    setFormData({
      vendorId: '',
      assessmentType: 'initial',
      securityScore: 70,
      complianceScore: 70,
      financialScore: 70,
      operationalScore: 70,
      findings: ''
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const vendor = vendors.find(v => v.id === formData.vendorId);
    if (!vendor) {
      alert('Please select a vendor');
      return;
    }

    const assessmentData = {
      ...formData,
      vendorName: vendor.name,
      securityScore: parseInt(formData.securityScore),
      complianceScore: parseInt(formData.complianceScore),
      financialScore: parseInt(formData.financialScore),
      operationalScore: parseInt(formData.operationalScore)
    };

    addAssessment(assessmentData);
    handleCloseModal();
  };

  const handleDelete = (assessmentId, vendorName) => {
    if (window.confirm(`Delete assessment for ${vendorName}?`)) {
      deleteAssessment(assessmentId);
    }
  };

  const getAverageScore = (assessment) => {
    return Math.round(
      (assessment.securityScore + 
       assessment.complianceScore + 
       assessment.financialScore + 
       assessment.operationalScore) / 4
    );
  };

  return (
    <div className="page-content assessments-page">
      <div className="page-header">
        <div>
          <h2>Risk Assessments</h2>
          <p>Conduct and track vendor risk assessments</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenModal}>
          <Plus size={20} />
          New Assessment
        </button>
      </div>

      {assessments.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No Assessments Yet</h3>
          <p>Create your first assessment to evaluate vendor risks</p>
          <button className="btn btn-primary" onClick={handleOpenModal}>
            Create Assessment
          </button>
        </div>
      ) : (
        <div className="assessments-grid">
          {assessments.map(assessment => {
            const avgScore = getAverageScore(assessment);
            return (
              <div key={assessment.id} className="assessment-card">
                <div className="assessment-header">
                  <div className="assessment-title">
                    <FileText size={24} className="assessment-icon" />
                    <h3>{assessment.vendorName}</h3>
                  </div>
                  <span className={`badge ${getRiskBadgeClass(avgScore)}`}>
                    {getRiskLevel(avgScore)}
                  </span>
                </div>

                <div className="assessment-info">
                  <div className="info-item">
                    <span className="label">Type:</span>
                    <span className="value">{assessment.assessmentType}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Date:</span>
                    <span className="value">{formatDate(assessment.createdAt)}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Average Score:</span>
                    <span className="value score">{avgScore}</span>
                  </div>
                </div>

                <div className="score-breakdown">
                  <h4>Score Breakdown</h4>
                  <div className="score-grid">
                    <div className="score-item">
                      <span className="score-label">Security</span>
                      <div className="score-bar">
                        <div 
                          className="score-fill"
                          style={{ 
                            width: `${assessment.securityScore}%`,
                            backgroundColor: assessment.securityScore >= 70 ? 'var(--success-green)' : 'var(--warning-amber)'
                          }}
                        />
                      </div>
                      <span className="score-value">{assessment.securityScore}</span>
                    </div>
                    <div className="score-item">
                      <span className="score-label">Compliance</span>
                      <div className="score-bar">
                        <div 
                          className="score-fill"
                          style={{ 
                            width: `${assessment.complianceScore}%`,
                            backgroundColor: assessment.complianceScore >= 70 ? 'var(--success-green)' : 'var(--warning-amber)'
                          }}
                        />
                      </div>
                      <span className="score-value">{assessment.complianceScore}</span>
                    </div>
                    <div className="score-item">
                      <span className="score-label">Financial</span>
                      <div className="score-bar">
                        <div 
                          className="score-fill"
                          style={{ 
                            width: `${assessment.financialScore}%`,
                            backgroundColor: assessment.financialScore >= 70 ? 'var(--success-green)' : 'var(--warning-amber)'
                          }}
                        />
                      </div>
                      <span className="score-value">{assessment.financialScore}</span>
                    </div>
                    <div className="score-item">
                      <span className="score-label">Operational</span>
                      <div className="score-bar">
                        <div 
                          className="score-fill"
                          style={{ 
                            width: `${assessment.operationalScore}%`,
                            backgroundColor: assessment.operationalScore >= 70 ? 'var(--success-green)' : 'var(--warning-amber)'
                          }}
                        />
                      </div>
                      <span className="score-value">{assessment.operationalScore}</span>
                    </div>
                  </div>
                </div>

                {assessment.findings && (
                  <div className="assessment-findings">
                    <strong>Findings:</strong>
                    <p>{assessment.findings}</p>
                  </div>
                )}

                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(assessment.id, assessment.vendorName)}
                >
                  Delete Assessment
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Assessment Modal */}
      {showModal && (
        <div className="modal active" onClick={(e) => e.target.className === 'modal active' && handleCloseModal()}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>New Risk Assessment</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Select Vendor *</label>
                <select
                  value={formData.vendorId}
                  onChange={(e) => setFormData({ ...formData, vendorId: e.target.value })}
                  required
                >
                  <option value="">Choose a vendor...</option>
                  {vendors.map(vendor => (
                    <option key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Assessment Type</label>
                  <select
                    value={formData.assessmentType}
                    onChange={(e) => setFormData({ ...formData, assessmentType: e.target.value })}
                  >
                    <option value="initial">Initial Assessment</option>
                    <option value="annual">Annual Review</option>
                    <option value="compliance">Compliance Check</option>
                  </select>
                </div>
              </div>

              <div className="scores-section">
                <h3>Risk Scores (0-100)</h3>
                
                <div className="form-group">
                  <label>Security Score: {formData.securityScore}</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.securityScore}
                    onChange={(e) => setFormData({ ...formData, securityScore: e.target.value })}
                    className="score-slider"
                  />
                </div>

                <div className="form-group">
                  <label>Compliance Score: {formData.complianceScore}</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.complianceScore}
                    onChange={(e) => setFormData({ ...formData, complianceScore: e.target.value })}
                    className="score-slider"
                  />
                </div>

                <div className="form-group">
                  <label>Financial Score: {formData.financialScore}</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.financialScore}
                    onChange={(e) => setFormData({ ...formData, financialScore: e.target.value })}
                    className="score-slider"
                  />
                </div>

                <div className="form-group">
                  <label>Operational Score: {formData.operationalScore}</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.operationalScore}
                    onChange={(e) => setFormData({ ...formData, operationalScore: e.target.value })}
                    className="score-slider"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Findings & Recommendations</label>
                <textarea
                  value={formData.findings}
                  onChange={(e) => setFormData({ ...formData, findings: e.target.value })}
                  placeholder="Document key findings, risks identified, and recommendations..."
                  rows="4"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Assessment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assessments;
