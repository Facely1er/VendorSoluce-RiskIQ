@echo off
echo ========================================
echo Setup Remote Repository
echo ========================================
echo.
echo Enter your repository URL:
echo Example: https://github.com/USERNAME/REPO.git
echo or: git@github.com:USERNAME/REPO.git
echo.
set /p REPO_URL="Repository URL: "

if "%REPO_URL%"=="" (
    echo ERROR: Repository URL cannot be empty
    pause
    exit /b 1
)

echo.
echo Adding remote repository...
git remote add origin %REPO_URL%
if %errorlevel% neq 0 (
    echo.
    echo WARNING: Remote may already exist. Removing and re-adding...
    git remote remove origin
    git remote add origin %REPO_URL%
    if %errorlevel% neq 0 (
        echo ERROR: Failed to add remote repository
        pause
        exit /b 1
    )
)
echo ✓ Remote added successfully
echo.

echo Pushing to remote repository...
git push -u origin main
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to push. Common issues:
    echo - Repository doesn't exist yet
    echo - Authentication required (you may need to enter credentials)
    echo - Network connection issue
    echo.
    echo You can push manually later with: git push -u origin main
    pause
    exit /b 1
)

echo.
echo ========================================
echo SUCCESS!
echo ========================================
echo Your code has been pushed to: %REPO_URL%
echo.
pause

