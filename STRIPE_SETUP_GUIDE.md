# Stripe Setup Guide for VendorSoluce RiskIQ

This guide will walk you through setting up Stripe for your VendorSoluce RiskIQ monetization.

## Prerequisites

- A Stripe account (sign up at https://stripe.com if you don't have one)
- Node.js installed
- Access to your Stripe API keys

## Step 1: Get Your Stripe API Keys

1. Log in to your Stripe Dashboard: https://dashboard.stripe.com
2. Navigate to **Developers** → **API keys**
3. Copy your **Publishable key** (starts with `pk_test_...` for test mode)
4. Copy your **Secret key** (starts with `sk_test_...` for test mode)

⚠️ **Important**: Keep your secret key private! Never commit it to version control.

## Step 2: Install Stripe Package

```bash
npm install stripe
```

## Step 3: Set Up Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and add your Stripe secret key:
```env
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
```

## Step 4: Run the Stripe Setup Script

This script will create all necessary products, prices, and payment links in Stripe:

```bash
# Set your Stripe secret key as an environment variable
export STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here

# Run the setup script
node setup-stripe-products.js
```

The script will:
- ✅ Create Professional product ($149 one-time)
- ✅ Create Enterprise product ($449 one-time)
- ✅ Create add-on products (users, vendors, SBOM scans, consulting)
- ✅ Generate payment links for each product
- ✅ Output all configuration details

## Step 5: Update Your .env File

After running the script, copy the output and update your `.env` file with:

```env
# Stripe Keys
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key

# Product IDs (from script output)
VITE_STRIPE_PRO_PRODUCT_ID=prod_xxxxx
VITE_STRIPE_ENTERPRISE_PRODUCT_ID=prod_xxxxx

# Price IDs (from script output)
VITE_STRIPE_PRO_PRICE_ID=price_xxxxx
VITE_STRIPE_ENTERPRISE_PRICE_ID=price_xxxxx

# Payment Links (from script output)
VITE_STRIPE_PRO_PAYMENT_LINK=https://buy.stripe.com/test_xxxxx
VITE_STRIPE_ENTERPRISE_PAYMENT_LINK=https://buy.stripe.com/test_xxxxx
```

## Step 6: Verify Configuration

The payment links are automatically configured in `utils/tierConfig.js` to use environment variables.

You can verify by checking that these lines exist:
```javascript
stripeLink: import.meta.env.VITE_STRIPE_PRO_PAYMENT_LINK || '...'
```

## Step 7: Test Your Setup

1. Start the development server:
```bash
npm run dev
```

2. Navigate to the Settings page or trigger the Upgrade modal

3. Click "Upgrade to Pro" - it should open the Stripe payment link

4. Use Stripe test cards to complete a test purchase:
   - Card number: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

## What Gets Created in Stripe

### Products & Prices

| Product | Price | Type |
|---------|-------|------|
| Professional | $149.00 | One-time |
| Enterprise | $449.00 | One-time |
| Additional Users | $10.00/month | Recurring |
| Additional Vendors (10 pack) | $5.00/month | Recurring |
| SBOM Scan Pack (10 scans) | $40.00 | One-time |
| Compliance Consulting | $200.00/month | Recurring |

### Payment Links

Two payment links are created:
- Professional tier payment link
- Enterprise tier payment link

These links can be shared directly or embedded in your app.

## Production Deployment

When ready for production:

1. **Switch to Live Mode** in Stripe Dashboard

2. **Re-run the setup script** with your live API key:
```bash
export STRIPE_SECRET_KEY=sk_live_your_live_secret_key
node setup-stripe-products.js
```

3. **Update environment variables** in your production hosting:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables
   - Other: Use your platform's environment variable settings

4. **Update success URL** to your production domain:
   - Edit `setup-stripe-products.js`
   - Change `https://vendorsoluce.com` to your actual domain
   - Re-run the script

## Webhooks (Optional - for Future SaaS Version)

For automatic license activation, set up webhooks:

1. Go to **Developers** → **Webhooks** in Stripe Dashboard
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copy the webhook signing secret
5. Add to `.env`: `STRIPE_WEBHOOK_SECRET=whsec_...`

## Troubleshooting

### "Invalid API key" Error
- Verify your secret key starts with `sk_test_` or `sk_live_`
- Make sure there are no extra spaces or quotes
- Check you're using the correct key for test/live mode

### Payment Link Not Opening
- Verify the environment variable is set correctly
- Check browser console for errors
- Ensure the payment link URL is valid

### Products Not Showing in Stripe
- Check you're viewing the correct mode (test vs live)
- Verify the script ran without errors
- Check Stripe Dashboard → Products

## Support

For Stripe-specific issues:
- Stripe Documentation: https://stripe.com/docs
- Stripe Support: https://support.stripe.com

For VendorSoluce RiskIQ issues:
- Email: support@vendorsoluce.com
- Documentation: /docs

## Next Steps

After Stripe is set up:

1. ✅ Test purchasing with test cards
2. ✅ Customize success/cancel URLs
3. ✅ Set up webhook handling (for automated license activation)
4. ✅ Configure email notifications
5. ✅ Add analytics tracking
6. ✅ Launch! 🚀

