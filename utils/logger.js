// Logger utility for production-safe logging
// In development: logs to console
// In production: can be configured to send to monitoring service

const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';

/**
 * Log levels
 */
export const LOG_LEVELS = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
};

/**
 * Safe logger that only logs in development or can be configured for production
 */
class Logger {
  constructor() {
    this.enabled = isDevelopment;
    this.logLevel = isDevelopment ? LOG_LEVELS.DEBUG : LOG_LEVELS.ERROR;
  }

  debug(...args) {
    if (this.enabled && this.shouldLog(LOG_LEVELS.DEBUG)) {
      console.debug('[DEBUG]', ...args);
    }
  }

  info(...args) {
    if (this.enabled && this.shouldLog(LOG_LEVELS.INFO)) {
      console.info('[INFO]', ...args);
    }
  }

  warn(...args) {
    if (this.enabled && this.shouldLog(LOG_LEVELS.WARN)) {
      console.warn('[WARN]', ...args);
    }
  }

  error(...args) {
    // Always log errors, even in production (but can be sent to monitoring service)
    if (this.shouldLog(LOG_LEVELS.ERROR)) {
      console.error('[ERROR]', ...args);
      // TODO: Send to error tracking service (Sentry, etc.) in production
      // if (window.Sentry) window.Sentry.captureException(args[0]);
    }
  }

  shouldLog(level) {
    const levels = [LOG_LEVELS.DEBUG, LOG_LEVELS.INFO, LOG_LEVELS.WARN, LOG_LEVELS.ERROR];
    return levels.indexOf(level) >= levels.indexOf(this.logLevel);
  }

  // Enable/disable logging
  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }

  setLogLevel(level) {
    this.logLevel = level;
  }
}

// Export singleton instance
export const logger = new Logger();

// Export default for convenience
export default logger;

