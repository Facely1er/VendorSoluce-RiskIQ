#!/bin/bash
# VendorSoluce RiskIQ - Quick Setup Script (Mac/Linux)

echo "========================================"
echo "VendorSoluce RiskIQ - Setup"
echo "========================================"
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

echo "Step 1: Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi

echo ""
echo "Step 2: Installing Stripe package..."
npm install stripe
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install Stripe package"
    exit 1
fi

echo ""
echo "Step 3: Checking for .env file..."
if [ ! -f .env ]; then
    echo "Creating .env file from template..."
    cp env.example .env
    echo ""
    echo "IMPORTANT: Edit .env file and add your Stripe secret key!"
    echo "Get your key from: https://dashboard.stripe.com/test/apikeys"
    echo ""
    read -p "Press enter to continue..."
fi

echo ""
echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Edit .env file and add your STRIPE_SECRET_KEY"
echo "2. Run: export STRIPE_SECRET_KEY=sk_test_your_key && node setup-stripe-products.js"
echo "3. Copy the output to your .env file"
echo "4. Run: npm run dev"
echo ""
echo "See SETUP_INSTRUCTIONS.md for detailed guide"
echo "========================================"

