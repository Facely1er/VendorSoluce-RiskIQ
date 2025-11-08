/**
 * Purchase token type definitions
 * Used for one-time purchase products ($49-$99)
 */

export interface PurchaseToken {
  product: string;
  purchaseDate: string;
  features: string[];
  tier: 'free' | 'pro' | 'enterprise';
  metadata?: Record<string, any>;
}

export interface PurchaseTokenStorage {
  tokens: PurchaseToken[];
  lastUpdated: string;
}

