# VendorSoluce RiskIQ - Complete Setup Instructions

## 🎉 Implementation Complete!

All monetization features have been successfully implemented. Follow these steps to get your app running with Stripe integration.

---

## 📋 What's Been Implemented

### ✅ All Features Complete:
- ✅ Three-tier licensing (Free, Pro $149, Enterprise $449)
- ✅ Usage limits enforcement (vendors & assessments)
- ✅ Upgrade modals with tier comparison
- ✅ PDF export for Pro+ users
- ✅ 5 assessment templates (tiered access)
- ✅ Watermarked exports for Free tier
- ✅ Tier badge and settings page
- ✅ Stripe payment link integration
- ✅ Environment variable configuration

---

## 🚀 Setup Steps (10 Minutes)

### Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- `jspdf` - PDF generation
- `jspdf-autotable` - PDF tables
- All existing dependencies

### Step 2: Install Stripe Package

```bash
npm install stripe
```

### Step 3: Get Your Stripe API Keys

1. Go to: https://dashboard.stripe.com/test/apikeys
2. Copy your **Publishable key** (starts with `pk_test_...`)
3. Copy your **Secret key** (starts with `sk_test_...`)

### Step 4: Create Environment File

```bash
# Copy the example file
cp env.example .env
```

Edit `.env` and add your Stripe secret key:

```env
STRIPE_SECRET_KEY=sk_test_51xxxxx_your_actual_secret_key_here
```

### Step 5: Run Stripe Setup Script

This creates all products, prices, and payment links in Stripe:

```bash
# Option A: Set environment variable inline (Mac/Linux)
export STRIPE_SECRET_KEY=sk_test_your_key_here && node setup-stripe-products.js

# Option B: PowerShell (Windows)
$env:STRIPE_SECRET_KEY="sk_test_your_key_here"; node setup-stripe-products.js
```

The script will output configuration - **copy everything** to your `.env` file.

### Step 6: Update .env with Script Output

After running the script, update your `.env` with the generated IDs:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key

VITE_STRIPE_PRO_PRODUCT_ID=prod_xxxxx
VITE_STRIPE_ENTERPRISE_PRODUCT_ID=prod_xxxxx

VITE_STRIPE_PRO_PRICE_ID=price_xxxxx
VITE_STRIPE_ENTERPRISE_PRICE_ID=price_xxxxx

VITE_STRIPE_PRO_PAYMENT_LINK=https://buy.stripe.com/test_xxxxx
VITE_STRIPE_ENTERPRISE_PAYMENT_LINK=https://buy.stripe.com/test_xxxxx
```

### Step 7: Start the App

```bash
npm run dev
```

Visit: http://localhost:5173

---

## 🧪 Testing Your Setup

### 1. Test Free Tier Limits

**Vendors:**
- Add 5 vendors ✅
- Try to add a 6th → Upgrade modal appears! ✨

**Assessments:**
- Create 10 assessments ✅
- Try to create 11th → Upgrade modal appears! ✨

### 2. Test Upgrade Flow

1. Click any "Upgrade" button
2. Stripe payment link opens
3. Use test card: **4242 4242 4242 4242**
4. Expiry: Any future date
5. CVC: Any 3 digits
6. Complete test purchase ✅

### 3. Test Pro Features

1. Go to **Settings** page
2. Click **"Pro"** in the tier selector
3. Now you can:
   - ✅ Add unlimited vendors
   - ✅ Add unlimited assessments
   - ✅ Export PDFs (no watermark)
   - ✅ Use all 5 assessment templates
   - ✅ Export JSON files

### 4. Test Enterprise Features

1. Go to **Settings** page
2. Click **"Enterprise"** in the tier selector
3. Now you get:
   - ✅ Everything in Pro
   - ✅ White-label settings appear
   - ✅ Priority support indicator
   - ✅ Unlimited users

---

## 📁 Files Created & Modified

### New Files (13):
```
utils/tierConfig.js              - Tier configuration
utils/assessmentTemplates.js     - 5 assessment templates
utils/pdfExport.js              - PDF generation
UpgradeModal.jsx                - Upgrade UI
UpgradeModal.css               - Modal styling
TierBadge.jsx                  - Tier display
TierBadge.css                 - Badge styling
Settings.jsx                  - Settings page
Settings.css                 - Settings styling
monetization-styles.css      - Additional styles
setup-stripe-products.js    - Stripe setup script
env.example                - Environment template
.gitignore                - Git ignore file
```

### Updated Files (9):
```
package.json        - Added jspdf dependencies
helpers.js         - Export with watermarks
AppContext.jsx    - License management
Vendors.jsx       - Limits & warnings
Assessments.jsx   - Templates & PDF export
Dashboard.jsx     - Export & tier badge
Header.jsx        - Tier badge & settings
App.jsx          - Routes & modals
index.css        - Import styles
```

---

## 💰 Pricing Structure

| Tier | Price | Vendors | Assessments | PDF Export | Templates |
|------|-------|---------|-------------|------------|-----------|
| Free | $0 | 5 | 10 | ❌ | 1 |
| Pro | $149 | ∞ | ∞ | ✅ | 5 |
| Enterprise | $449 | ∞ | ∞ | ✅ | 5 + White-label |

---

## 🎯 How It Works

### Free Tier Experience:
1. User signs up → Gets Free tier automatically
2. Adds vendors until limit (5)
3. Sees warning at 4/5 vendors (80%)
4. At 5/5 → "Add Vendor" button shows "Limit Reached"
5. Clicks → **Upgrade modal appears**
6. User sees tier comparison & clicks "Upgrade to Pro"
7. Stripe payment link opens → Purchase → Activated!

### Upgrade Modal Triggers:
- ✅ Attempting to add vendor at limit
- ✅ Attempting to add assessment at limit
- ✅ Clicking "Upgrade" button in header
- ✅ Clicking tier badge when not at max tier
- ✅ Trying to export PDF on Free tier
- ✅ Clicking "Upgrade now" in usage warnings

---

## 🔧 Configuration Files

### tierConfig.js
Contains all tier definitions, limits, and features.

```javascript
FREE: 5 vendors, 10 assessments, CSV only
PRO: Unlimited, PDF/JSON export, all templates  
ENTERPRISE: Everything + white-label
```

### Environment Variables
All Stripe configuration uses environment variables:

```javascript
stripeLink: import.meta.env.VITE_STRIPE_PRO_PAYMENT_LINK
```

This means you can update Stripe links without code changes!

---

## 🚢 Deployment Checklist

### Pre-Deployment:
- [ ] Test all three tiers locally
- [ ] Test upgrade flow with Stripe test cards
- [ ] Verify PDF export works
- [ ] Check all usage limits enforced
- [ ] Test on mobile/tablet

### Production Setup:
- [ ] Switch to Stripe Live mode
- [ ] Re-run `setup-stripe-products.js` with live key
- [ ] Update production environment variables
- [ ] Update success URL to production domain
- [ ] Set up Stripe webhooks (optional)
- [ ] Configure domain in Stripe settings

### Deploy:
```bash
# Build
npm run build

# Deploy to Vercel (recommended)
vercel --prod

# Or Netlify
netlify deploy --prod
```

### Post-Deployment:
- [ ] Test live payment flow
- [ ] Verify environment variables loaded
- [ ] Check analytics tracking
- [ ] Monitor Stripe dashboard
- [ ] Set up alerts for failed payments

---

## 🎨 Customization

### Change Pricing:
Edit `utils/tierConfig.js`:
```javascript
TIER_CONFIG = {
  FREE: { limits: { maxVendors: 10 } }, // Change from 5 to 10
  PRO: { price: '$199' } // Change from $149
}
```

Then re-run Stripe setup script with new prices.

### Change Colors:
Edit `index.css`:
```css
--growth-green: #33691E; /* Your brand color */
```

### Customize Success URL:
Edit `setup-stripe-products.js`:
```javascript
url: 'https://yourdomain.com/success?tier=pro'
```

---

## 📚 Documentation

- **Quick Start**: See `QUICK_START.md`
- **Stripe Setup**: See `STRIPE_SETUP_GUIDE.md`
- **Full Documentation**: (Link to your docs)

---

## 🐛 Troubleshooting

### "Module 'stripe' not found"
```bash
npm install stripe
```

### "Invalid API key"
- Check `.env` file exists
- Verify key starts with `sk_test_` or `sk_live_`
- No extra spaces or quotes

### Payment link not opening
- Verify environment variables loaded
- Check browser console for errors
- Ensure `.env` file is in project root

### Limits not enforcing
- Clear localStorage: `localStorage.clear()`
- Refresh page
- Check tier in Settings page

### PDF export not working
- Check license tier (Pro or Enterprise)
- Verify `jspdf` installed
- Check browser console for errors

---

## 💡 Pro Tips

1. **Demo Mode**: Use Settings page to switch tiers instantly (for testing)
2. **Test Cards**: Use `4242 4242 4242 4242` for successful test payments
3. **Stripe Dashboard**: Monitor all test transactions at dashboard.stripe.com
4. **Environment Variables**: Never commit `.env` file to Git
5. **Production**: Always use live keys for production deployments

---

## 📞 Support

### Getting Help:
- 📧 Email: support@vendorsoluce.com
- 📖 Docs: Read `STRIPE_SETUP_GUIDE.md`
- 💬 Stripe: https://support.stripe.com

### Common Resources:
- Stripe Test Cards: https://stripe.com/docs/testing
- Stripe API Docs: https://stripe.com/docs/api
- Payment Links Guide: https://stripe.com/docs/payment-links

---

## ✅ Final Checklist

Before going live, verify:

- [ ] ✅ Dependencies installed (`npm install`)
- [ ] ✅ Stripe package installed (`npm install stripe`)
- [ ] ✅ `.env` file created with Stripe keys
- [ ] ✅ Stripe products created (ran setup script)
- [ ] ✅ Environment variables updated with payment links
- [ ] ✅ App runs locally (`npm run dev`)
- [ ] ✅ Free tier limits work (test with 5 vendors)
- [ ] ✅ Upgrade modal appears when hitting limits
- [ ] ✅ Payment links open correctly
- [ ] ✅ Test payment completes successfully
- [ ] ✅ Pro tier features unlock after upgrade
- [ ] ✅ PDF export works for Pro users
- [ ] ✅ All 5 templates accessible in Pro
- [ ] ✅ Settings page loads correctly
- [ ] ✅ Tier badge displays in header
- [ ] ✅ Usage indicators show progress
- [ ] ✅ Ready to deploy! 🚀

---

**🎉 Congratulations! Your VendorSoluce RiskIQ app is now fully monetized and ready to accept payments!**

Start the app with `npm run dev` and begin testing! 🚀

