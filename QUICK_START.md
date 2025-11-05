# Quick Start Guide - VendorSoluce RiskIQ Monetization

Get your monetized VendorSoluce RiskIQ app running in 10 minutes!

## 🚀 Quick Setup (3 Steps)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Stripe (5 minutes)

1. Get your Stripe keys from: https://dashboard.stripe.com/test/apikeys

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Add your Stripe secret key to `.env`:
```env
STRIPE_SECRET_KEY=sk_test_your_key_here
```

4. Run the setup script:
```bash
export STRIPE_SECRET_KEY=sk_test_your_key_here
node setup-stripe-products.js
```

5. Copy the output to your `.env` file

### Step 3: Run the App
```bash
npm run dev
```

Visit: http://localhost:5173

## 🎉 You're Done!

The app now has:
- ✅ Free, Pro ($149), and Enterprise ($449) tiers
- ✅ Usage limits enforced (vendors & assessments)
- ✅ Upgrade modals with Stripe payment links
- ✅ PDF export for Pro+ users
- ✅ 5 assessment templates (tiered access)
- ✅ Settings page for tier management

## 🧪 Test It Out

### 1. Test Free Tier Limits
- Add 5 vendors → See limit warning
- Try to add 6th vendor → Upgrade modal appears!
- Add 10 assessments → See limit warning
- Try to add 11th → Upgrade modal!

### 2. Test Upgrade Flow
- Click "Upgrade" button
- Opens Stripe payment link
- Use test card: `4242 4242 4242 4242`
- Complete test purchase

### 3. Test Pro Features
- Go to Settings → Switch to "Pro" tier
- Now you can add unlimited vendors
- PDF export buttons appear
- All 5 templates available

### 4. Test Enterprise Features
- Switch to "Enterprise" tier in Settings
- White-label settings appear
- Everything is unlimited

## 📝 What Was Implemented

### ✅ Core Monetization Features

1. **Three-Tier Licensing**
   - Free: 5 vendors, 10 assessments
   - Pro: Unlimited + PDF export
   - Enterprise: Everything + white-label

2. **Usage Enforcement**
   - Limits checked before adding vendors/assessments
   - Progress bars show usage
   - Warnings at 80% capacity

3. **Upgrade Prompts**
   - Modal with tier comparison
   - Feature matrix
   - Direct Stripe payment links

4. **Premium Features**
   - PDF export (Pro+)
   - 5 assessment templates (tiered)
   - JSON export (Pro+)
   - White-label (Enterprise)

5. **UI Components**
   - Tier badge in header
   - Settings page
   - Usage indicators
   - Alert banners

### 📦 Files Created (10 new)

1. `utils/tierConfig.js` - Tier limits & config
2. `utils/assessmentTemplates.js` - 5 templates
3. `utils/pdfExport.js` - PDF generation
4. `UpgradeModal.jsx` - Upgrade UI
5. `TierBadge.jsx` - Current tier display
6. `Settings.jsx` - Settings page
7. `setup-stripe-products.js` - Stripe setup
8. `.env.example` - Environment template
9. `STRIPE_SETUP_GUIDE.md` - Detailed guide
10. `monetization-styles.css` - Feature styles

### 📝 Files Updated (9 existing)

1. `package.json` - Added jspdf libraries
2. `helpers.js` - Export functions with watermarks
3. `AppContext.jsx` - License management
4. `Vendors.jsx` - Limits & warnings
5. `Assessments.jsx` - Templates & PDF export
6. `Dashboard.jsx` - PDF export & tier badge
7. `Header.jsx` - Tier badge & settings link
8. `App.jsx` - New routes
9. `index.css` - Import monetization styles

## 💡 Tips

### Switching Tiers (Demo Mode)
Go to Settings → "Demo: Switch License Tier" → Click any tier

### Stripe Test Cards
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0027 6000 3184`

### Customization
- Edit tier limits in `utils/tierConfig.js`
- Update Stripe links after running setup script
- Customize colors in `index.css`

## 🚢 Deploy to Production

### 1. Build for Production
```bash
npm run build
```

### 2. Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel:
- Settings → Environment Variables
- Add all `VITE_*` variables from `.env`

### 3. Or Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

Add environment variables in Netlify:
- Site Settings → Environment Variables

### 4. Switch to Live Stripe Keys
1. Get live keys from Stripe Dashboard
2. Run setup script with live key
3. Update production environment variables

## 📊 Revenue Model

### Pricing Tiers
- **Free**: Lead generation, viral growth
- **Pro**: $149 one-time (target: SMB, developers)
- **Enterprise**: $449 one-time (target: enterprises)

### Add-ons (Optional)
- Additional Users: $10/month
- Additional Vendors: $5/month
- SBOM Scans: $40 per 10-pack
- Consulting: $200/month

### Revenue Projection
- 100 Pro customers = $14,900
- 20 Enterprise customers = $8,980
- Total: ~$24K from 120 customers

## 🔗 Important Links

- **Stripe Dashboard**: https://dashboard.stripe.com
- **Test Payment Link**: (Check console output after setup)
- **Documentation**: See `STRIPE_SETUP_GUIDE.md`

## ❓ Need Help?

### Common Issues

**"Module not found: stripe"**
```bash
npm install stripe
```

**"Invalid API key"**
- Check your `.env` file
- Verify key starts with `sk_test_`

**Payment link not working**
- Run setup script first
- Check environment variables loaded

**Limits not enforcing**
- Clear localStorage: `localStorage.clear()`
- Refresh page

### Get Support
- Email: support@vendorsoluce.com
- Docs: Read `STRIPE_SETUP_GUIDE.md`
- Stripe Support: https://support.stripe.com

## 🎯 Next Steps

1. ✅ Complete Stripe setup
2. ✅ Test all features locally
3. ✅ Customize branding
4. ✅ Deploy to production
5. ✅ Set up webhooks (optional)
6. ✅ Launch & market!

---

**Ready to monetize?** Follow the 3 steps above and you'll be accepting payments in minutes! 🚀
