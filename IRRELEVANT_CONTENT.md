# Irrelevant Content for Current Phase

This document identifies content files that are not relevant to the current phase focusing on **Vendor Risk IQ** and **Risk Radar**.

## Status Reports & Summary Documents
These are historical status reports from development/implementation phases and should be archived or removed:

### Development Status Reports
- `ASSETS_NEEDED_FIXED.md` - Historical asset tracking report
- `ASSETS_NEEDED.md` - Historical asset tracking report
- `BUILD_FIX_SUMMARY.md` - Historical build fix summary
- `CONTENT_ALIGNMENT_REPORT.md` - Historical content alignment report
- `CRITICAL_ISSUES_FIXED.md` - Historical issues tracking
- `FINAL_COMPLETION_REPORT.md` - Historical completion report
- `IMPLEMENTATION_COMPLETE.md` - Historical implementation status
- `IMPLEMENTATION_SUMMARY.md` - Historical implementation summary
- `MISSING_FILES_REPORT.md` - Historical file tracking report
- `PRODUCTION_READINESS_REPORT.md` - Historical readiness assessment
- `QUICK_FIXES_SUMMARY.md` - Historical fixes summary
- `REMAINING_TASKS_COMPLETE.md` - Historical task tracking
- `SMOKE_TEST_REPORT.md` - Historical testing report
- `STATUS_SUMMARY.md` - Historical status summary

### Git/Deployment Status Documents
- `GIT_SETUP.md` - Git setup instructions (should be in main README if needed)
- `GIT_STATUS.md` - Historical git status snapshot
- `GITHUB_DESKTOP_CHECK.md` - Historical GitHub Desktop check
- `DEPLOYMENT.md` - Contains outdated references to "VendorIQ Pro"; should be updated if kept

### Link Verification & Structure Reports
- `LINK_VERIFICATION_REPORT.md` - Historical link verification
- `PROJECT_STRUCTURE.md` - Outdated project structure documentation (structure should be in main README)
- `VERSION-COMPARISON.md` - Historical HTML version comparison (references old HTML files)

### Old HTML Files (Standalone Versions)
These are standalone HTML versions that predate the React application:
- `vendoriq-minimal-test.html` - Old standalone test version
- `vendoriq-pro-demo.html` - Old standalone demo version
- `vendoriq-pro-fixed.html` - Old standalone fixed version
- `vendoriq-pro-redesigned.html` - Old standalone redesigned version
- `vendoriq-pro-refined.html` - Old standalone refined version
- `test-diagnostic.html` - Old diagnostic page

**Note**: These HTML files may be kept for reference or historical purposes but are not part of the active React application.

### Documentation Files Needing Updates
Files that reference old branding or need content updates:

- `README-VendorIQ.md` - References old "VendorIQ Pro" branding (should be updated or consolidated into main README)
- `README_STRIPE.md` - Stripe integration docs (relevant if Stripe is in use, but may reference old branding)
- `STRIPE_SETUP_GUIDE.md` - Stripe setup guide (relevant if Stripe is in use)
- `TROUBLESHOOTING-GUIDE.md` - References old HTML files and "VendorIQ Pro" branding
- `DEMO-DATA-OVERVIEW.md` - References old HTML demo version

### Git/Commit Helper Scripts (Optional)
These may be kept or removed based on workflow preferences:
- `COMMIT_COMMANDS.md` - Git commit helper
- `COMMIT_MESSAGE.txt` - Commit message template
- `commit-and-push.bat` - Windows commit script
- `commit-and-push.ps1` - PowerShell commit script
- `commit-staged-changes.ps1` - PowerShell staging script
- `QUICK_COMMIT_GUIDE.md` - Quick commit guide
- `setup-remote.bat` - Windows setup script
- `setup-remote.ps1` - PowerShell setup script

### Setup Scripts
- `setup.bat` - Windows setup script (may be relevant)
- `setup.sh` - Unix setup script (may be relevant)

### Workspace Files
- `VendorSoluce-RiskIQ.code-workspace` - VS Code workspace file (keep if used)

### Distribution Guides
- `DOWNLOADABLE_DISTRIBUTION_GUIDE.md` - May be relevant for deployment but check for outdated content
- `QUICK_GO_LIVE_GUIDE.md` - May be relevant for deployment but check for outdated content
- `QUICK_START.md` - May be relevant but check if superseded by main README
- `SETUP_INSTRUCTIONS.md` - May be relevant but check if consolidated with main README

### Guides That May Need Updates
- `SAAS_MIGRATION_ROADMAP.md` - May be relevant for future phases
- `GO_LIVE_READINESS_REPORT.md` - Historical readiness report

## Recommended Actions

### Immediate Removal
1. **Status Reports**: All `*_REPORT.md`, `*_SUMMARY.md`, `*_COMPLETE.md` files can be archived or removed
2. **Historical Git Status**: `GIT_STATUS.md`, `GITHUB_DESKTOP_CHECK.md`
3. **Old HTML Files**: Consider archiving or removing the standalone HTML versions

### Review & Update
1. **Troubleshooting Guide**: Update to reference React app instead of HTML files
2. **Deployment Guides**: Update branding references
3. **Setup Instructions**: Consolidate with main README if redundant

### Keep (But May Need Updates)
1. **Main README.md**: Updated ✓
2. **Setup scripts**: Keep if used in workflows
3. **Stripe docs**: Keep if Stripe integration is active
4. **Workspace files**: Keep if used

## Content Alignment Checklist

- [x] Main README.md updated with Vendor Risk IQ and Risk Radar focus
- [x] Navigation.jsx updated
- [x] Dashboard.jsx updated (title changed to Risk Radar)
- [x] Assessments.jsx updated (title changed to Vendor Risk IQ)
- [x] HomePage components updated
- [x] package.json description updated
- [ ] Review and update remaining documentation files
- [ ] Archive or remove status report files
- [ ] Decide on old HTML files (archive vs. delete)
