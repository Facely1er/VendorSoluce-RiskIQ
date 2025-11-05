# 🚀 Quick Start - Stripe Integration

## ✅ Implementation Complete!

All monetization features are ready. Follow these 4 steps to enable Stripe payments:

---

## Step 1: Install Dependencies (1 minute)

```bash
npm install
npm install stripe
```

---

## Step 2: Get Stripe Keys (2 minutes)

1. Go to: **https://dashboard.stripe.com/test/apikeys**
2. Copy your **Secret key** (starts with `sk_test_...`)
3. Copy your **Publishable key** (starts with `pk_test_...`)

---

## Step 3: Create .env File (1 minute)

```bash
# Copy the template
cp env.example .env
```

Edit `.env` and add your Stripe secret key:

```env
STRIPE_SECRET_KEY=sk_test_51xxxxx_your_actual_key_here
```

---

## Step 4: Run Stripe Setup (2 minutes)

### Windows (PowerShell):
```powershell
$env:STRIPE_SECRET_KEY="sk_test_your_key_here"
node setup-stripe-products.js
```

### Mac/Linux:
```bash
export STRIPE_SECRET_KEY=sk_test_your_key_here
node setup-stripe-products.js
```

**Copy the script output** and add it to your `.env` file!

---

## Step 5: Start the App (30 seconds)

```bash
npm run dev
```

Visit: **http://localhost:5173**

---

## 🎉 Done!

Your app now has:
- ✅ Free tier (5 vendors, 10 assessments)
- ✅ Pro tier ($149 - unlimited everything + PDF export)
- ✅ Enterprise tier ($449 - white-label + priority support)
- ✅ Upgrade modals with Stripe payment links
- ✅ Usage limits enforced
- ✅ PDF export for paid users

---

## 🧪 Test It

### Test Free Tier Limits:
1. Add 5 vendors
2. Try to add 6th → **Upgrade modal appears!**

### Test Upgrade Flow:
1. Click "Upgrade" button
2. Use test card: **4242 4242 4242 4242**
3. Complete test purchase

### Test Pro Features:
1. Go to Settings
2. Switch to "Pro" tier
3. Now unlimited vendors + PDF export works!

---

## 📖 Full Documentation

- **Quick Start**: `QUICK_START.md`
- **Complete Setup**: `SETUP_INSTRUCTIONS.md`
- **Stripe Guide**: `STRIPE_SETUP_GUIDE.md`

---

## ❓ Need Help?

### Common Issues:

**"Module 'stripe' not found"**
```bash
npm install stripe
```

**"Invalid API key"**
- Check your `.env` file
- Verify key starts with `sk_test_`

**Payment links not working**
- Did you run `setup-stripe-products.js`?
- Check the script output was added to `.env`

### Get Support:
- 📧 support@vendorsoluce.com
- 📖 Read `SETUP_INSTRUCTIONS.md`

---

## 🎯 What's Next?

1. ✅ Test locally with Stripe test cards
2. ✅ Customize pricing in `utils/tierConfig.js`
3. ✅ Deploy to production
4. ✅ Switch to Stripe live keys
5. ✅ Start accepting payments! 💰

---

**Ready to go live?** See `SETUP_INSTRUCTIONS.md` for deployment checklist!

