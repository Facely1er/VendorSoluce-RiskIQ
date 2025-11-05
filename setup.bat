@echo off
REM VendorSoluce RiskIQ - Quick Setup Script (Windows)

echo ========================================
echo VendorSoluce RiskIQ - Setup
echo ========================================
echo.

REM Check if node is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo Step 1: Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Step 2: Installing Stripe package...
call npm install stripe
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install Stripe package
    pause
    exit /b 1
)

echo.
echo Step 3: Checking for .env file...
if not exist .env (
    echo Creating .env file from template...
    copy env.example .env
    echo.
    echo IMPORTANT: Edit .env file and add your Stripe secret key!
    echo Get your key from: https://dashboard.stripe.com/test/apikeys
    echo.
    pause
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Edit .env file and add your STRIPE_SECRET_KEY
echo 2. Run: node setup-stripe-products.js
echo 3. Copy the output to your .env file
echo 4. Run: npm run dev
echo.
echo See SETUP_INSTRUCTIONS.md for detailed guide
echo ========================================
pause

