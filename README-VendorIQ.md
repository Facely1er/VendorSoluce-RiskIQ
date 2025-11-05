# VendorIQ Pro - Enterprise Risk Management Platform

## Overview
VendorIQ Pro is a comprehensive vendor risk management platform designed to help organizations assess, monitor, and manage third-party vendor risks across their supply chain.

## Files Included

### 1. vendoriq-pro-refined.html
**Production-Ready Version**
- Clean slate with no pre-loaded data
- Perfect for actual implementation
- All data saved to browser's localStorage
- Full CRUD operations for vendors and assessments
- Complete reporting and analytics suite

**Features:**
- ✅ Dark navy theme with green accents (VendorSource styling)
- ✅ Vendor management with risk scoring
- ✅ Assessment tracking and compliance monitoring
- ✅ Advanced analytics and visualizations
- ✅ Data import/export (JSON & CSV)
- ✅ Backup and restore functionality
- ✅ Multiple report generation options

### 2. vendoriq-pro-demo.html
**Demo Version with Sample Data**
- Pre-loaded with 15 diverse vendors
- Includes 14 completed assessments
- Instant visualization of all features
- Perfect for presentations and testing
- "Reload Demo Data" button to reset to original state

**Sample Data Includes:**
- Strategic vendors (5) - High-value, critical operations
- Operational vendors (6) - Day-to-day business functions
- Tactical vendors (4) - Lower-risk, support services
- Mix of risk levels from low (22) to critical (92)
- Various industries: Technology, Healthcare, Finance, Logistics, etc.
- Different data sensitivity levels: PII, PHI, Financial, Confidential, IP

## Key Features

### Dashboard
- Real-time metrics cards showing vendor counts by risk level
- Interactive risk distribution charts (doughnut, bar, line)
- Visual trend analysis
- Quick access statistics

### Vendor Management
- Complete vendor profiles with detailed information
- Automated risk score calculation based on:
  - Vendor category (Strategic/Operational/Tactical)
  - Data types processed (PHI, PII, Financial, etc.)
  - Contract value
  - Assessment recency
- Smart search and filtering
- Quick edit and delete functions

### Risk Assessment
- Comprehensive assessment framework
- Multiple assessment types: Initial, Annual, Compliance, Incident
- Four-dimensional scoring:
  - Security Score (0-100)
  - Compliance Score (0-100)
  - Financial Score (0-100)
  - Operational Score (0-100)
- Detailed findings documentation
- Assessment history tracking

### Analytics
- Average risk score calculations
- Vendor category distribution
- Sector-based risk analysis (radar chart)
- Contract value distribution (pie chart)
- Monthly assessment tracking
- Custom date range analysis

### Reporting
Four pre-configured report types:
1. **Executive Summary** - Comprehensive overview with key metrics
2. **High Risk Report** - Detailed analysis of high/critical risk vendors
3. **Assessment Summary** - Complete assessment history and findings
4. **Financial Analysis** - Contract values and spending breakdown

All reports downloadable as formatted text files.

### Data Management
- **Export**: JSON or CSV format
- **Import**: Bulk import from JSON or CSV
- **Backup**: Complete system backup with version control
- **Restore**: Full data restoration from backup files
- **Clear All**: Secure data deletion with confirmation
- Sample data generators for testing

## Risk Scoring Algorithm

The platform uses a sophisticated risk scoring algorithm that considers:

1. **Category Weight** (up to 30 points)
   - Strategic: +30 (highest risk)
   - Operational: +20
   - Tactical: +10 (lowest risk)

2. **Data Sensitivity** (up to 40 points)
   - PHI (Protected Health Information): +15
   - Financial Data: +10
   - PII (Personally Identifiable Information): +10
   - Intellectual Property: +5

3. **Contract Value** (up to 10 points)
   - >$500K: +10
   - >$100K: +5

4. **Assessment Recency** (up to 15 points)
   - Never assessed: +15
   - >180 days: +10
   - >90 days: +5

**Risk Levels:**
- 🔴 Critical: 80-100
- 🟠 High: 70-79
- 🔵 Medium: 40-69
- 🟢 Low: 0-39

## Technology Stack

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Charts**: Chart.js v4.4.0
- **Fonts**: Inter (Google Fonts)
- **Storage**: Browser localStorage
- **Architecture**: Single-page application (SPA)
- **Responsive**: Mobile-first design

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Color Scheme (VendorSource Theme)

**Primary Colors:**
- Background: Dark Navy (#0a1628 → #1a2332)
- Primary Accent: Vibrant Green (#4ade80)
- Text: Light Gray (#e2e8f0)

**Status Colors:**
- Success: Green (#4ade80)
- Warning: Yellow (#fbbf24)
- Danger: Red (#ef4444)
- Info: Blue (#3b82f6)

## Getting Started

### For Demo Version:
1. Open `vendoriq-pro-demo.html` in your browser
2. Explore the pre-loaded data across all tabs
3. Try editing vendors, adding assessments, generating reports
4. Use "Reload Demo Data" to reset at any time

### For Production Version:
1. Open `vendoriq-pro-refined.html` in your browser
2. Start by adding your first vendor
3. Create assessments for your vendors
4. Monitor the dashboard as data accumulates
5. Export/backup regularly

## Data Privacy

- All data stored locally in browser
- No external servers or APIs
- No data transmission
- Clear data function available
- Export for secure backup

## Use Cases

1. **Vendor Risk Assessment Teams**
   - Centralized vendor tracking
   - Risk score monitoring
   - Compliance documentation

2. **Procurement Departments**
   - Vendor evaluation
   - Contract value tracking
   - Strategic vendor identification

3. **Compliance Officers**
   - Regulatory alignment (NIST, ISO, PCI-DSS, HIPAA)
   - Audit trail maintenance
   - Assessment documentation

4. **Executive Leadership**
   - Risk dashboards
   - Executive reporting
   - Strategic vendor oversight

## Best Practices

1. **Regular Assessments**
   - Strategic vendors: Quarterly
   - Operational vendors: Semi-annually
   - Tactical vendors: Annually

2. **Data Backups**
   - Weekly backups recommended
   - Export before major changes
   - Keep backup files secure

3. **Risk Thresholds**
   - Review all critical (80+) vendors monthly
   - High risk (70-79) vendors quarterly
   - Medium/Low as scheduled

4. **Documentation**
   - Detailed assessment findings
   - Remediation action items
   - Follow-up dates

## Support & Customization

This is a standalone HTML application that can be:
- Customized for specific industry requirements
- Integrated with existing systems
- Extended with additional metrics
- Branded for your organization

## Version History

- **v2.0** - VendorSource dark theme implementation
- **v1.5** - Demo version with sample data
- **v1.0** - Initial release

## License

Custom implementation for ERMITS Corporation.

---

**Need Help?**
- Check the built-in tooltips and help text
- Review sample data patterns in demo version
- Refer to the NIST CSF framework documentation

**Ready to Deploy?**
Simply host these HTML files on any web server or use them locally. No installation, no dependencies, no backend required.
