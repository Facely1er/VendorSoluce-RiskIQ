// setup-stripe-products.js
// VendorSoluce RiskIQ - Stripe Product Setup Script
// Run this with: node setup-stripe-products.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createProducts() {
  console.log('🚀 Creating VendorSoluce-RiskIQ Stripe Products...\n');

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ Error: STRIPE_SECRET_KEY environment variable not set!');
    console.log('Please set it with: export STRIPE_SECRET_KEY=sk_test_your_key_here');
    process.exit(1);
  }

  try {
    // 1. Create Pro Product
    console.log('📦 Creating Professional Product...');
    const proProduct = await stripe.products.create({
      name: 'VendorSoluce RiskIQ - Professional',
      description: 'Unlimited vendors and assessments, PDF/JSON export, all 5 assessment templates, advanced reporting',
      images: ['https://vendorsoluce.com/assets/pro-badge.png'],
      metadata: {
        tier: 'pro',
        features: JSON.stringify([
          'unlimited_vendors',
          'unlimited_assessments',
          'pdf_export',
          'json_export',
          'all_templates',
          'advanced_reports'
        ])
      }
    });
    console.log('✅ Pro Product created:', proProduct.id);

    const proPrice = await stripe.prices.create({
      product: proProduct.id,
      unit_amount: 14900, // $149.00
      currency: 'usd',
      nickname: 'Professional - One-time Payment',
      metadata: {
        tier: 'pro',
        billing_type: 'one_time'
      }
    });
    console.log('✅ Pro Price created:', proPrice.id);

    // 2. Create Enterprise Product
    console.log('\n📦 Creating Enterprise Product...');
    const enterpriseProduct = await stripe.products.create({
      name: 'VendorSoluce RiskIQ - Enterprise',
      description: 'Everything in Pro plus white-label capability, unlimited users, priority support, custom branding',
      images: ['https://vendorsoluce.com/assets/enterprise-badge.png'],
      metadata: {
        tier: 'enterprise',
        features: JSON.stringify([
          'all_pro_features',
          'white_label',
          'unlimited_users',
          'priority_support',
          'custom_branding',
          'dedicated_account_manager'
        ])
      }
    });
    console.log('✅ Enterprise Product created:', enterpriseProduct.id);

    const enterprisePrice = await stripe.prices.create({
      product: enterpriseProduct.id,
      unit_amount: 44900, // $449.00
      currency: 'usd',
      nickname: 'Enterprise - One-time Payment',
      metadata: {
        tier: 'enterprise',
        billing_type: 'one_time'
      }
    });
    console.log('✅ Enterprise Price created:', enterprisePrice.id);

    // 3. Create Add-on Products
    console.log('\n📦 Creating Add-on Products...');
    
    // Additional Users Add-on
    const additionalUsers = await stripe.products.create({
      name: 'Additional Users',
      description: 'Add extra user seats to your account',
      metadata: { 
        addon: 'true', 
        type: 'users',
        applies_to: 'pro,enterprise'
      }
    });
    const additionalUsersPrice = await stripe.prices.create({
      product: additionalUsers.id,
      unit_amount: 1000, // $10.00 per user per month
      currency: 'usd',
      recurring: { interval: 'month' },
      nickname: 'Additional Users - Monthly'
    });
    console.log('✅ Additional Users Add-on:', additionalUsers.id, '/', additionalUsersPrice.id);

    // Additional Vendors Add-on
    const additionalVendors = await stripe.products.create({
      name: 'Additional Vendors (10 Pack)',
      description: 'Add 10 more vendor slots to your account',
      metadata: { 
        addon: 'true', 
        type: 'vendors',
        quantity: '10',
        applies_to: 'starter,pro'
      }
    });
    const additionalVendorsPrice = await stripe.prices.create({
      product: additionalVendors.id,
      unit_amount: 500, // $5.00 per month for 10 vendors
      currency: 'usd',
      recurring: { interval: 'month' },
      nickname: 'Additional Vendors (10) - Monthly'
    });
    console.log('✅ Additional Vendors Add-on:', additionalVendors.id, '/', additionalVendorsPrice.id);

    // SBOM Scan Pack
    const sbomScans = await stripe.products.create({
      name: 'SBOM Scan Pack (10 Scans)',
      description: 'Add 10 additional SBOM vulnerability scans',
      metadata: { 
        addon: 'true', 
        type: 'sbom_scans',
        quantity: '10',
        applies_to: 'starter,pro'
      }
    });
    const sbomScansPrice = await stripe.prices.create({
      product: sbomScans.id,
      unit_amount: 4000, // $40.00 one-time for 10 scans
      currency: 'usd',
      nickname: 'SBOM Scans (10 Pack) - One-time'
    });
    console.log('✅ SBOM Scan Pack Add-on:', sbomScans.id, '/', sbomScansPrice.id);

    // Compliance Consulting
    const complianceConsulting = await stripe.products.create({
      name: 'Compliance Consulting',
      description: 'Monthly compliance consulting and advisory services',
      metadata: { 
        addon: 'true', 
        type: 'consulting',
        applies_to: 'all'
      }
    });
    const complianceConsultingPrice = await stripe.prices.create({
      product: complianceConsulting.id,
      unit_amount: 20000, // $200.00 per month
      currency: 'usd',
      recurring: { interval: 'month' },
      nickname: 'Compliance Consulting - Monthly'
    });
    console.log('✅ Compliance Consulting Add-on:', complianceConsulting.id, '/', complianceConsultingPrice.id);

    // 4. Create Payment Links
    console.log('\n🔗 Creating Payment Links...');
    
    const proPaymentLink = await stripe.paymentLinks.create({
      line_items: [{
        price: proPrice.id,
        quantity: 1
      }],
      after_completion: {
        type: 'redirect',
        redirect: {
          url: 'https://vendorsoluce.com/success?tier=pro&session_id={CHECKOUT_SESSION_ID}'
        }
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      metadata: {
        tier: 'pro',
        product_name: 'VendorSoluce RiskIQ Professional'
      }
    });
    console.log('✅ Pro Payment Link:', proPaymentLink.url);

    const enterprisePaymentLink = await stripe.paymentLinks.create({
      line_items: [{
        price: enterprisePrice.id,
        quantity: 1
      }],
      after_completion: {
        type: 'redirect',
        redirect: {
          url: 'https://vendorsoluce.com/success?tier=enterprise&session_id={CHECKOUT_SESSION_ID}'
        }
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      metadata: {
        tier: 'enterprise',
        product_name: 'VendorSoluce RiskIQ Enterprise'
      }
    });
    console.log('✅ Enterprise Payment Link:', enterprisePaymentLink.url);

    // 5. Output configuration
    console.log('\n\n' + '='.repeat(90));
    console.log('✅ STRIPE SETUP COMPLETE!');
    console.log('='.repeat(90));
    console.log('\n📝 STEP 1: Create a .env file in your project root with the following:\n');
    console.log('# Stripe API Keys');
    console.log('VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here');
    console.log(`STRIPE_SECRET_KEY=${process.env.STRIPE_SECRET_KEY}`);
    console.log('\n# Stripe Product IDs');
    console.log(`VITE_STRIPE_PRO_PRODUCT_ID=${proProduct.id}`);
    console.log(`VITE_STRIPE_ENTERPRISE_PRODUCT_ID=${enterpriseProduct.id}`);
    console.log('\n# Stripe Price IDs');
    console.log(`VITE_STRIPE_PRO_PRICE_ID=${proPrice.id}`);
    console.log(`VITE_STRIPE_ENTERPRISE_PRICE_ID=${enterprisePrice.id}`);
    console.log('\n# Stripe Payment Links');
    console.log(`VITE_STRIPE_PRO_PAYMENT_LINK=${proPaymentLink.url}`);
    console.log(`VITE_STRIPE_ENTERPRISE_PAYMENT_LINK=${enterprisePaymentLink.url}`);
    console.log('\n# Add-on Product IDs (Optional)');
    console.log(`VITE_STRIPE_ADDON_USERS_ID=${additionalUsers.id}`);
    console.log(`VITE_STRIPE_ADDON_VENDORS_ID=${additionalVendors.id}`);
    console.log(`VITE_STRIPE_ADDON_SBOM_SCANS_ID=${sbomScans.id}`);
    console.log(`VITE_STRIPE_ADDON_CONSULTING_ID=${complianceConsulting.id}`);
    
    console.log('\n' + '='.repeat(90));
    console.log('📝 STEP 2: The payment links have been automatically updated in tierConfig.js');
    console.log('='.repeat(90));
    console.log('\n🎉 You can now test payments at:');
    console.log('   Pro: ' + proPaymentLink.url);
    console.log('   Enterprise: ' + enterprisePaymentLink.url);
    console.log('\n💡 Use test card: 4242 4242 4242 4242, any future expiry, any CVC');
    console.log('='.repeat(90) + '\n');

    return {
      pro: { 
        product: proProduct.id, 
        price: proPrice.id, 
        link: proPaymentLink.url 
      },
      enterprise: { 
        product: enterpriseProduct.id, 
        price: enterprisePrice.id, 
        link: enterprisePaymentLink.url 
      },
      addons: {
        users: { product: additionalUsers.id, price: additionalUsersPrice.id },
        vendors: { product: additionalVendors.id, price: additionalVendorsPrice.id },
        sbomScans: { product: sbomScans.id, price: sbomScansPrice.id },
        consulting: { product: complianceConsulting.id, price: complianceConsultingPrice.id }
      }
    };

  } catch (error) {
    console.error('\n❌ Error creating Stripe products:', error.message);
    if (error.type === 'StripeAuthenticationError') {
      console.error('⚠️  Invalid API key. Please check your STRIPE_SECRET_KEY');
    }
    throw error;
  }
}

// Run the setup
if (require.main === module) {
  createProducts()
    .then(() => {
      console.log('✅ Setup completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Setup failed:', error.message);
      process.exit(1);
    });
}

module.exports = { createProducts };

