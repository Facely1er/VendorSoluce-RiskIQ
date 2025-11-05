# Git Commit Commands

Run these commands in order to commit and push your changes:

## Step 1: Initialize Git (if not already done)
```bash
git init
```

## Step 2: Add All Files
```bash
git add .
```

## Step 3: Create Commit
```bash
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
```

## Step 4: Create Remote Repository
1. Go to GitHub: https://github.com/new
2. Create repository: `VendorSoluce-RiskIQ`
3. **DO NOT** initialize with README/gitignore
4. Copy the repository URL

## Step 5: Add Remote and Push
```bash
# Add remote (replace with your actual repository URL)
git remote add origin https://github.com/YOUR_USERNAME/VendorSoluce-RiskIQ.git

# Set main branch
git branch -M main

# Push to remote
git push -u origin main
```

## Alternative: Use SSH
If you have SSH keys configured:
```bash
git remote add origin git@github.com:YOUR_USERNAME/VendorSoluce-RiskIQ.git
git branch -M main
git push -u origin main
```

