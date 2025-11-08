/**
 * Usage tracking service
 * Tracks monthly usage (SBOM analysis count) in localStorage
 */

const STORAGE_KEY = 'sbom_usage_tracking';
const USAGE_KEY_PREFIX = 'sbom_usage_';

interface MonthlyUsage {
  month: string; // Format: YYYY-MM
  count: number;
  lastReset: string;
}

interface UsageTracking {
  currentMonth: string;
  monthlyUsage: MonthlyUsage[];
}

class UsageTrackingService {
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

  private getCurrentMonth(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }

  private getUsageForMonth(month: string): MonthlyUsage | null {
    if (!this.checkStorageAvailable()) {
      return null;
    }

    try {
      const key = `${USAGE_KEY_PREFIX}${month}`;
      const data = localStorage.getItem(key);
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.warn('Failed to get usage for month:', error);
    }

    return null;
  }

  private saveUsageForMonth(month: string, usage: MonthlyUsage): boolean {
    if (!this.checkStorageAvailable()) {
      return false;
    }

    try {
      const key = `${USAGE_KEY_PREFIX}${month}`;
      localStorage.setItem(key, JSON.stringify(usage));
      return true;
    } catch (error) {
      console.warn('Failed to save usage for month:', error);
      return false;
    }
  }

  private ensureCurrentMonth(): MonthlyUsage {
    const currentMonth = this.getCurrentMonth();
    let usage = this.getUsageForMonth(currentMonth);

    if (!usage || usage.month !== currentMonth) {
      // Reset for new month
      usage = {
        month: currentMonth,
        count: 0,
        lastReset: new Date().toISOString(),
      };
      this.saveUsageForMonth(currentMonth, usage);
    }

    return usage;
  }

  getCurrentMonthUsage(): number {
    const usage = this.ensureCurrentMonth();
    return usage.count;
  }

  getRemainingQuota(maxQuota: number): number {
    const currentUsage = this.getCurrentMonthUsage();
    return Math.max(0, maxQuota - currentUsage);
  }

  incrementUsage(): boolean {
    const usage = this.ensureCurrentMonth();
    usage.count += 1;
    usage.lastReset = new Date().toISOString();
    return this.saveUsageForMonth(usage.month, usage);
  }

  resetMonthlyUsage(): boolean {
    const currentMonth = this.getCurrentMonth();
    const usage: MonthlyUsage = {
      month: currentMonth,
      count: 0,
      lastReset: new Date().toISOString(),
    };
    return this.saveUsageForMonth(currentMonth, usage);
  }

  getUsageStatistics(): {
    currentMonth: string;
    currentUsage: number;
    monthlyHistory: MonthlyUsage[];
  } {
    const currentMonth = this.getCurrentMonth();
    const currentUsage = this.getCurrentMonthUsage();
    const monthlyHistory: MonthlyUsage[] = [];

    // Get last 12 months of usage
    for (let i = 0; i < 12; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const usage = this.getUsageForMonth(month);
      if (usage) {
        monthlyHistory.push(usage);
      }
    }

    return {
      currentMonth,
      currentUsage,
      monthlyHistory: monthlyHistory.reverse(),
    };
  }

  clearAllUsage(): boolean {
    if (!this.checkStorageAvailable()) {
      return false;
    }

    try {
      // Clear all usage keys
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(USAGE_KEY_PREFIX)) {
          localStorage.removeItem(key);
        }
      }
      return true;
    } catch (error) {
      console.warn('Failed to clear usage:', error);
      return false;
    }
  }
}

export const usageTrackingService = new UsageTrackingService();
export default usageTrackingService;

