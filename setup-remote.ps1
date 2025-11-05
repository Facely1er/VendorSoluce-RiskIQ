# Setup Remote Repository (PowerShell)
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Remote Repository" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is available
try {
    git --version | Out-Null
} catch {
    Write-Host "ERROR: Git is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Enter your repository URL:" -ForegroundColor Yellow
Write-Host "Example: https://github.com/USERNAME/REPO.git" -ForegroundColor Gray
Write-Host "or: git@github.com:USERNAME/REPO.git" -ForegroundColor Gray
Write-Host ""

$repoUrl = Read-Host "Repository URL"

if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host "ERROR: Repository URL cannot be empty" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Adding remote repository..." -ForegroundColor Yellow
try {
    git remote add origin $repoUrl 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "WARNING: Remote may already exist. Removing and re-adding..." -ForegroundColor Yellow
        git remote remove origin 2>&1 | Out-Null
        git remote add origin $repoUrl 2>&1 | Out-Null
        if ($LASTEXITCODE -ne 0) {
            throw "Failed to add remote"
        }
    }
    Write-Host "✓ Remote added successfully" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Failed to add remote repository" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Pushing to remote repository..." -ForegroundColor Yellow
git push -u origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ERROR: Failed to push. Common issues:" -ForegroundColor Red
    Write-Host "- Repository doesn't exist yet" -ForegroundColor Yellow
    Write-Host "- Authentication required (you may need to enter credentials)" -ForegroundColor Yellow
    Write-Host "- Network connection issue" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "You can push manually later with: git push -u origin main" -ForegroundColor Gray
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "SUCCESS!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Your code has been pushed to: $repoUrl" -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to exit"

