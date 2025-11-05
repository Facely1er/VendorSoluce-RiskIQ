# Git Repository Setup Instructions

## Prerequisites

Ensure Git is installed on your system:
- Download from: https://git-scm.com/download/win
- Or use: `winget install Git.Git` (Windows Package Manager)

## Initial Git Setup

### 1. Initialize Git Repository

```bash
git init
```

### 2. Configure Git (if not already done)

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 3. Add All Files

```bash
git add .
```

### 4. Create Initial Commit

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

## Create Remote Repository

### Option 1: GitHub (Recommended)

1. Go to https://github.com/new
2. Repository name: `VendorSoluce-RiskIQ` (or your preferred name)
3. Description: "Enterprise Vendor Risk Management Platform"
4. Choose public or private
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Option 2: GitLab

1. Go to https://gitlab.com/projects/new
2. Create a new project
3. Choose "Create blank project"
4. Set project name and visibility
5. Click "Create project"

### Option 3: Bitbucket

1. Go to https://bitbucket.org/repo/create
2. Create a new repository
3. Set repository name and access level
4. Click "Create repository"

## Connect to Remote Repository

After creating the remote repository, connect your local repository:

### For GitHub/GitLab/Bitbucket:

```bash
# Add remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Or use SSH (if you have SSH keys set up)
git remote add origin git@github.com:YOUR_USERNAME/REPO_NAME.git

# Verify remote was added
git remote -v
```

## Push to Remote

```bash
# Push to remote repository
git branch -M main
git push -u origin main
```

## Commit Message Convention

This project uses conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## Future Commits

For future changes:

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: add new feature description"

# Push to remote
git push
```

## Troubleshooting

### If Git is not recognized:
1. Install Git from https://git-scm.com/download/win
2. Restart your terminal/IDE
3. Verify installation: `git --version`

### If remote already exists:
```bash
# Remove existing remote
git remote remove origin

# Add new remote
git remote add origin YOUR_REPO_URL
```

### If you need to update remote URL:
```bash
git remote set-url origin YOUR_NEW_REPO_URL
```

