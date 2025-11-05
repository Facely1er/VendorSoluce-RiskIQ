# VendorSoluce-RiskIQ - Git Commit Script (PowerShell)
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "VendorSoluce-RiskIQ - Git Commit Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is available
try {
    $gitVersion = git --version 2>&1
    Write-Host "Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Git is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[1/4] Adding all files..." -ForegroundColor Yellow
git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to add files" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✓ Files added successfully" -ForegroundColor Green
Write-Host ""

Write-Host "[2/4] Creating commit..." -ForegroundColor Yellow
$commitMessage = @"
feat: Complete project enhancement with VendorSoluce design system

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
- Update documentation
"@

git commit -m $commitMessage
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to create commit" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✓ Commit created successfully" -ForegroundColor Green
Write-Host ""

Write-Host "[3/4] Setting main branch..." -ForegroundColor Yellow
git branch -M main
Write-Host "✓ Branch set to main" -ForegroundColor Green
Write-Host ""

Write-Host "[4/4] Ready to push to remote" -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "NEXT STEPS:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "1. Create a repository on GitHub/GitLab/Bitbucket" -ForegroundColor White
Write-Host "2. Copy the repository URL" -ForegroundColor White
Write-Host "3. Run: git remote add origin YOUR_REPO_URL" -ForegroundColor White
Write-Host "4. Run: git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "Or run: .\setup-remote.ps1 (after creating repo)" -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter to exit"

