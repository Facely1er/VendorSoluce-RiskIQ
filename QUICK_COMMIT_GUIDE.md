# Quick Commit Guide 🚀

## Quick Start (Choose One Method)

### Method 1: Use Scripts (Easiest)

#### Windows Batch Files:
1. **Commit your changes:**
   ```bash
   commit-and-push.bat
   ```

2. **After creating a GitHub/GitLab repository, set up remote:**
   ```bash
   setup-remote.bat
   ```
   (You'll be prompted to enter your repository URL)

#### PowerShell Scripts:
1. **Commit your changes:**
   ```powershell
   .\commit-and-push.ps1
   ```

2. **After creating a GitHub/GitLab repository, set up remote:**
   ```powershell
   .\setup-remote.ps1
   ```

### Method 2: Manual Commands

If scripts don't work, use these commands directly:

```bash
# 1. Add all files
git add .

# 2. Create commit
git commit -m "feat: Complete project enhancement with VendorSoluce design system

- Add comprehensive design system with brand colors and risk level colors
- Create reusable UI components (Button, Card)
- Implement homepage sections (Hero, Value Proposition, Features, CTA)
- Add Footer component with 4-column layout
- Enhance Header with VendorSoluce branding
- Add dropdown navigation menus and mobile hamburger menu
- Integrate HomePage route
- Fix all import paths
- Add animations and hover effects
- Create public directory for assets
- Update documentation"

# 3. Set main branch
git branch -M main

# 4. Create repository on GitHub/GitLab, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Create Remote Repository

### GitHub (Recommended)
1. Go to: https://github.com/new
2. Repository name: `VendorSoluce-RiskIQ`
3. Description: "Enterprise Vendor Risk Management Platform"
4. Choose Public or Private
5. **DO NOT** check "Initialize with README" (we already have files)
6. Click "Create repository"
7. Copy the repository URL

### GitLab
1. Go to: https://gitlab.com/projects/new
2. Create blank project
3. Set name and visibility
4. Copy the repository URL

## Troubleshooting

### Git Not Found
- Install Git: https://git-scm.com/download/win
- Or use: `winget install Git.Git`
- Restart your terminal after installation

### Authentication Required
If prompted for credentials:
- **GitHub**: Use Personal Access Token (not password)
  - Create token: https://github.com/settings/tokens
  - Use token as password when prompted
- **GitLab**: Use Personal Access Token or SSH keys

### Remote Already Exists
```bash
git remote remove origin
git remote add origin YOUR_REPO_URL
```

## What Gets Committed

✅ All source code files
✅ New components and pages
✅ Updated design system
✅ Documentation files
✅ Configuration files

❌ `node_modules/` (excluded via .gitignore)
❌ Build outputs (excluded via .gitignore)
❌ Environment files (excluded via .gitignore)

## Next Steps After Commit

1. ✅ Code is committed locally
2. 🔄 Create remote repository
3. 🔄 Push to remote
4. 📝 Update README.md with repository URL
5. 🎉 Share your repository!

