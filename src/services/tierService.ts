/**
 * Tier service
 * Determines user tier and checks feature access
 * Supports both subscription-based and one-time purchase models
 */

import { productOfferingsService } from './productOfferingsService';
import { usageTrackingService } from './usageTrackingService';
import type { ProductTier, ProductName } from '../types/productOfferings';
import type { PurchaseToken } from '../types/purchaseToken';

const STORAGE_KEY = 'purchase_tokens';
const PRODUCT_ID: ProductName = 'technosoluce-sbom-analyzer';

export type TierLevel = 'free' | 'pro' | 'enterprise';

interface TierInfo {
  tier: TierLevel;
  source: 'subscription' | 'purchase' | 'free';
  remainingAnalyses?: number;
  maxAnalyses?: number;
}

class TierService {
  private checkStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  private getPurchaseTokens(): PurchaseToken[] {
    if (!this.checkStorageAvailable()) {
      return [];
    }

    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const storage = JSON.parse(data);
        return storage.tokens || [];
      }
    } catch (error) {
      console.warn('Failed to load purchase tokens:', error);
    }

    return [];
  }

  private savePurchaseTokens(tokens: PurchaseToken[]): boolean {
    if (!this.checkStorageAvailable()) {
      return false;
    }

    try {
      const storage = {
        tokens,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
      return true;
    } catch (error) {
      console.warn('Failed to save purchase tokens:', error);
      return false;
    }
  }

  private getPurchaseTokenForProduct(product: string): PurchaseToken | null {
    const tokens = this.getPurchaseTokens();
    return tokens.find((t) => t.product === product) || null;
  }

  private mapProductTierToTierLevel(tier: ProductTier): TierLevel {
    // Map ProductTier to TierLevel
    switch (tier) {
      case 'starter':
        return 'pro';
      case 'professional':
        return 'pro';
      case 'enterprise':
      case 'government':
        return 'enterprise';
      default:
        return 'free';
    }
  }

  getCurrentTier(): TierInfo {
    // Check subscription first
    const subscription = productOfferingsService.getActiveSubscriptionForProduct(PRODUCT_ID);
    if (subscription) {
      const tierLevel = this.mapProductTierToTierLevel(subscription.tier);
      return {
        tier: tierLevel,
        source: 'subscription',
      };
    }

    // Check purchase token
    const purchaseToken = this.getPurchaseTokenForProduct(PRODUCT_ID);
    if (purchaseToken) {
      return {
        tier: purchaseToken.tier,
        source: 'purchase',
      };
    }

    // Default to free tier
    const currentUsage = usageTrackingService.getCurrentMonthUsage();
    const maxQuota = 1; // Free tier: 1 SBOM per month
    const remaining = usageTrackingService.getRemainingQuota(maxQuota);

    return {
      tier: 'free',
      source: 'free',
      remainingAnalyses: remaining,
      maxAnalyses: maxQuota,
    };
  }

  canAnalyzeSBOM(): { allowed: boolean; reason?: string; remaining?: number } {
    const tierInfo = this.getCurrentTier();

    // Paid tiers have unlimited analyses
    if (tierInfo.tier !== 'free') {
      return { allowed: true };
    }

    // Free tier: check monthly limit
    const remaining = tierInfo.remainingAnalyses || 0;
    if (remaining > 0) {
      return { allowed: true, remaining };
    }

    return {
      allowed: false,
      reason: 'Monthly analysis limit reached. Upgrade to Pro for unlimited analyses.',
      remaining: 0,
    };
  }

  canExportPDF(): boolean {
    const tierInfo = this.getCurrentTier();
    return tierInfo.tier !== 'free';
  }

  canAccessExecutiveReports(): boolean {
    const tierInfo = this.getCurrentTier();
    return tierInfo.tier !== 'free';
  }

  canAccessAdvancedAnalytics(): boolean {
    const tierInfo = this.getCurrentTier();
    return tierInfo.tier !== 'free';
  }

  canAccessAPI(): boolean {
    const tierInfo = this.getCurrentTier();
    return tierInfo.tier === 'enterprise';
  }

  getRemainingAnalyses(): number {
    const tierInfo = this.getCurrentTier();
    if (tierInfo.tier !== 'free') {
      return -1; // Unlimited
    }
    return tierInfo.remainingAnalyses || 0;
  }

  incrementAnalysisCount(): boolean {
    const tierInfo = this.getCurrentTier();
    
    // Only track usage for free tier
    if (tierInfo.tier === 'free') {
      return usageTrackingService.incrementUsage();
    }
    
    return true;
  }

  addPurchaseToken(token: PurchaseToken): boolean {
    const tokens = this.getPurchaseTokens();
    
    // Remove existing token for same product
    const filtered = tokens.filter((t) => t.product !== token.product);
    filtered.push(token);
    
    return this.savePurchaseTokens(filtered);
  }

  removePurchaseToken(product: string): boolean {
    const tokens = this.getPurchaseTokens();
    const filtered = tokens.filter((t) => t.product !== product);
    return this.savePurchaseTokens(filtered);
  }

  getTierDisplayName(tier: TierLevel): string {
    switch (tier) {
      case 'free':
        return 'Free';
      case 'pro':
        return 'Pro';
      case 'enterprise':
        return 'Enterprise';
      default:
        return 'Free';
    }
  }

  getTierFeatures(tier: TierLevel): string[] {
    switch (tier) {
      case 'free':
        return [
          '1 SBOM analysis per month',
          'Basic vulnerability scanning',
          'JSON export only',
          'Basic dashboard',
        ];
      case 'pro':
        return [
          'Unlimited SBOM analyses',
          'Full vulnerability intelligence',
          'PDF export',
          'Executive reports',
          'Advanced analytics',
        ];
      case 'enterprise':
        return [
          'Everything in Pro',
          'Multi-project support',
          'API access',
          'Custom branding',
          'Priority support',
        ];
      default:
        return [];
    }
  }
}

export const tierService = new TierService();
export default tierService;

