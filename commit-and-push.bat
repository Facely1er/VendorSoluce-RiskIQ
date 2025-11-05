@echo off
echo ========================================
echo VendorSoluce-RiskIQ - Git Commit Script
echo ========================================
echo.

echo [1/4] Adding all files...
git add .
if %errorlevel% neq 0 (
    echo ERROR: Failed to add files. Make sure Git is installed and in PATH.
    pause
    exit /b 1
)
echo ✓ Files added successfully
echo.

echo [2/4] Creating commit...
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
if %errorlevel% neq 0 (
    echo ERROR: Failed to create commit.
    pause
    exit /b 1
)
echo ✓ Commit created successfully
echo.

echo [3/4] Setting main branch...
git branch -M main
echo ✓ Branch set to main
echo.

echo [4/4] Ready to push to remote
echo.
echo ========================================
echo NEXT STEPS:
echo ========================================
echo 1. Create a repository on GitHub/GitLab/Bitbucket
echo 2. Copy the repository URL
echo 3. Run: git remote add origin YOUR_REPO_URL
echo 4. Run: git push -u origin main
echo.
echo Or run the script: setup-remote.bat (after creating repo)
echo.
pause

