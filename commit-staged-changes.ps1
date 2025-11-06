# Commit and Push Staged Changes Script
# VendorSoluce-RiskIQ

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "VendorSoluce-RiskIQ - Commit & Push" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Try to find Git installation
$gitPaths = @(
    "C:\Program Files\Git\bin\git.exe",
    "C:\Program Files (x86)\Git\bin\git.exe",
    "${env:ProgramFiles}\Git\bin\git.exe",
    "${env:ProgramFiles(x86)}\Git\bin\git.exe",
    "git"
)

$gitExe = $null
foreach ($path in $gitPaths) {
    if (Get-Command $path -ErrorAction SilentlyContinue) {
        $gitExe = $path
        break
    }
}

if (-not $gitExe) {
    Write-Host "ERROR: Git is not found in PATH" -ForegroundColor Red
    Write-Host "Please ensure Git is installed and accessible" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Common solutions:" -ForegroundColor Yellow
    Write-Host "1. Install Git from: https://git-scm.com/download/win" -ForegroundColor White
    Write-Host "2. Add Git to PATH during installation" -ForegroundColor White
    Write-Host "3. Restart your terminal after installation" -ForegroundColor White
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Git found: $gitExe" -ForegroundColor Green
Write-Host ""

# Change to repository directory
$repoPath = "C:\Users\facel\Downloads\GitHub\VendorSoluce-RiskIQ"
if (-not (Test-Path $repoPath)) {
    Write-Host "ERROR: Repository path not found: $repoPath" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Set-Location $repoPath
Write-Host "Working directory: $repoPath" -ForegroundColor Green
Write-Host ""

# Check git status
Write-Host "[1/5] Checking git status..." -ForegroundColor Yellow
& $gitExe status --short
if ($LASTEXITCODE -ne 0) {
    Write-Host "WARNING: Git status check failed" -ForegroundColor Yellow
}
Write-Host ""

# Stage all changes
Write-Host "[2/5] Staging all changes..." -ForegroundColor Yellow
& $gitExe add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to stage files" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✓ Files staged successfully" -ForegroundColor Green
Write-Host ""

# Create commit with message
Write-Host "[3/5] Creating commit..." -ForegroundColor Yellow
$commitMessage = 'feat: Complete smoke testing and link verification

- Fix stale closure issues in AppContext with useCallback
- Add comprehensive error handling for localStorage operations
- Enhance calculateRiskScore with null safety checks
- Fix ErrorBoundary Router context dependency issue
- Add null safety for riskScore in Dashboard and Vendors
- Enhance Electron main process error handling
- Create missing pages: Analytics, Reports, Data
- Add routes for all new pages
- Verify all navigation links (14 items)
- Verify all footer links (13 items)
- Verify all home page CTA links
- Add CSS styles for new pages
- Complete link verification report

This commit ensures:
- Zero runtime errors from null/undefined access
- All links work correctly across the application
- All pages have complete content
- Robust error handling throughout
- Production-ready error prevention'

& $gitExe commit -m $commitMessage
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to create commit" -ForegroundColor Red
    Write-Host "This might mean there are no changes to commit." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✓ Commit created successfully" -ForegroundColor Green
Write-Host ""

# Check remote
Write-Host "[4/5] Checking remote configuration..." -ForegroundColor Yellow
$remote = & $gitExe remote get-url origin 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Remote origin found: $remote" -ForegroundColor Green
} else {
    Write-Host "WARNING: No remote origin configured" -ForegroundColor Yellow
    Write-Host "You will need to set up a remote before pushing" -ForegroundColor Yellow
}
Write-Host ""

# Push to main
Write-Host "[5/5] Pushing to main branch..." -ForegroundColor Yellow
& $gitExe push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to push to remote" -ForegroundColor Red
    Write-Host "This might mean:" -ForegroundColor Yellow
    Write-Host "  - Remote repository is not set up" -ForegroundColor White
    Write-Host "  - Authentication is required" -ForegroundColor White
    Write-Host "  - Network connection issue" -ForegroundColor White
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✓ Successfully pushed to main branch" -ForegroundColor Green
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "SUCCESS!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "All changes have been committed and pushed to main" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to exit"

