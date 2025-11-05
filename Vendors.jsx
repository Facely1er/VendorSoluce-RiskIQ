import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, X } from 'lucide-react';
import { useApp } from './AppContext';
import { getRiskLevel, getRiskBadgeClass, formatCurrency, formatDate } from './helpers';
import './Vendors.css';

const Vendors = () => {
  const { vendors, addVendor, updateVendor, deleteVendor } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    sector: '',
    location: '',
    contractValue: '',
    contact: '',
    dataTypes: '',
    notes: ''
  });

  const filteredVendors = vendors.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (v.sector && v.sector.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !categoryFilter || v.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenModal = (vendor = null) => {
    if (vendor) {
      setEditingVendor(vendor);
      setFormData({
        name: vendor.name,
        category: vendor.category,
        sector: vendor.sector || '',
        location: vendor.location || '',
        contractValue: vendor.contractValue || '',
        contact: vendor.contact || '',
        dataTypes: vendor.dataTypes || '',
        notes: vendor.notes || ''
      });
    } else {
      setEditingVendor(null);
      setFormData({
        name: '',
        category: '',
        sector: '',
        location: '',
        contractValue: '',
        contact: '',
        dataTypes: '',
        notes: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingVendor(null);
    setFormData({
      name: '',
      category: '',
      sector: '',
      location: '',
      contractValue: '',
      contact: '',
      dataTypes: '',
      notes: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const vendorData = {
      ...formData,
      contractValue: parseInt(formData.contractValue) || 0
    };

    if (editingVendor) {
      updateVendor(editingVendor.id, vendorData);
    } else {
      addVendor(vendorData);
    }

    handleCloseModal();
  };

  const handleDelete = (vendorId, vendorName) => {
    if (window.confirm(`Are you sure you want to delete ${vendorName}?`)) {
      deleteVendor(vendorId);
    }
  };

  return (
    <div className="page-content vendors-page">
      <div className="page-header">
        <div>
          <h2>Vendor Management</h2>
          <p>Manage and monitor your vendor relationships</p>
        </div>
      </div>

      <div className="vendor-controls">
        <div className="search-bar">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            <option value="strategic">Strategic</option>
            <option value="operational">Operational</option>
            <option value="tactical">Tactical</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={20} />
          Add Vendor
        </button>
      </div>

      {filteredVendors.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3>No Vendors Found</h3>
          <p>
            {searchTerm || categoryFilter
              ? 'Try adjusting your search filters'
              : 'Add your first vendor to get started with risk management'}
          </p>
          <button className="btn btn-primary" onClick={() => handleOpenModal()}>
            Add Vendor
          </button>
        </div>
      ) : (
        <div className="vendors-grid">
          {filteredVendors.map(vendor => (
            <div key={vendor.id} className="vendor-card">
              <div className="vendor-header">
                <h3>{vendor.name}</h3>
                <div className="vendor-badges">
                  <span className={`badge ${getRiskBadgeClass(vendor.riskScore)}`}>
                    {getRiskLevel(vendor.riskScore)}
                  </span>
                </div>
              </div>

              <div className="vendor-info">
                <div className="info-item">
                  <span className="label">Category:</span>
                  <span className="value">{vendor.category}</span>
                </div>
                <div className="info-item">
                  <span className="label">Risk Score:</span>
                  <span className="value">{vendor.riskScore}</span>
                </div>
                {vendor.sector && (
                  <div className="info-item">
                    <span className="label">Sector:</span>
                    <span className="value">{vendor.sector}</span>
                  </div>
                )}
                <div className="info-item">
                  <span className="label">Contract:</span>
                  <span className="value">{formatCurrency(vendor.contractValue)}</span>
                </div>
                {vendor.location && (
                  <div className="info-item">
                    <span className="label">Location:</span>
                    <span className="value">{vendor.location}</span>
                  </div>
                )}
                <div className="info-item">
                  <span className="label">Last Assessment:</span>
                  <span className="value">{formatDate(vendor.lastAssessment)}</span>
                </div>
              </div>

              {vendor.notes && (
                <div className="vendor-notes">
                  <strong>Notes:</strong>
                  <p>{vendor.notes}</p>
                </div>
              )}

              <div className="vendor-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleOpenModal(vendor)}
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDelete(vendor.id, vendor.name)}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vendor Modal */}
      {showModal && (
        <div className="modal active" onClick={(e) => e.target.className === 'modal active' && handleCloseModal()}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingVendor ? 'Edit Vendor' : 'Add New Vendor'}</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Vendor Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="strategic">Strategic</option>
                    <option value="operational">Operational</option>
                    <option value="tactical">Tactical</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Sector</label>
                  <input
                    type="text"
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    placeholder="e.g., Technology, Finance"
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., USA, UK"
                  />
                </div>

                <div className="form-group">
                  <label>Contract Value ($)</label>
                  <input
                    type="number"
                    value={formData.contractValue}
                    onChange={(e) => setFormData({ ...formData, contractValue: e.target.value })}
                    min="0"
                    placeholder="0"
                  />
                </div>

                <div className="form-group">
                  <label>Contact Email</label>
                  <input
                    type="email"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="contact@vendor.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Data Types</label>
                <input
                  type="text"
                  value={formData.dataTypes}
                  onChange={(e) => setFormData({ ...formData, dataTypes: e.target.value })}
                  placeholder="e.g., PII, Financial, PHI (comma separated)"
                />
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Additional notes about this vendor..."
                  rows="4"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingVendor ? 'Update Vendor' : 'Add Vendor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vendors;
