/**
 * Rate Limiter for Contact Form
 * Prevents spam by limiting submissions per email and per IP address
 */

interface RateLimitEntry {
  count: number;
  firstRequest: number;
}

// In-memory storage (resets on server restart, sufficient for portfolio)
const emailLimits = new Map<string, RateLimitEntry>();
const ipLimits = new Map<string, RateLimitEntry>();

// Configuration
const EMAIL_LIMIT = 1; // Max 1 submission per email per time window
const IP_LIMIT = 3; // Max 3 submissions per IP per time window
const TIME_WINDOW_MS = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Clean up old entries to prevent memory leaks
 */
function cleanupOldEntries() {
  const now = Date.now();
  
  for (const [key, entry] of emailLimits.entries()) {
    if (now - entry.firstRequest > TIME_WINDOW_MS) {
      emailLimits.delete(key);
    }
  }
  
  for (const [key, entry] of ipLimits.entries()) {
    if (now - entry.firstRequest > TIME_WINDOW_MS) {
      ipLimits.delete(key);
    }
  }
}

// Run cleanup every 10 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupOldEntries, 10 * 60 * 1000);
}

export interface RateLimitResult {
  allowed: boolean;
  reason?: 'email_limit' | 'ip_limit';
  retryAfterMs?: number;
}

/**
 * Check if a request is allowed based on email and IP rate limits
 */
export function checkRateLimit(email: string, ip: string): RateLimitResult {
  const now = Date.now();
  const normalizedEmail = email.toLowerCase().trim();
  
  // Check email limit
  const emailEntry = emailLimits.get(normalizedEmail);
  if (emailEntry) {
    const elapsed = now - emailEntry.firstRequest;
    if (elapsed < TIME_WINDOW_MS) {
      if (emailEntry.count >= EMAIL_LIMIT) {
        return {
          allowed: false,
          reason: 'email_limit',
          retryAfterMs: TIME_WINDOW_MS - elapsed,
        };
      }
    } else {
      // Reset if time window passed
      emailLimits.delete(normalizedEmail);
    }
  }
  
  // Check IP limit
  const ipEntry = ipLimits.get(ip);
  if (ipEntry) {
    const elapsed = now - ipEntry.firstRequest;
    if (elapsed < TIME_WINDOW_MS) {
      if (ipEntry.count >= IP_LIMIT) {
        return {
          allowed: false,
          reason: 'ip_limit',
          retryAfterMs: TIME_WINDOW_MS - elapsed,
        };
      }
    } else {
      // Reset if time window passed
      ipLimits.delete(ip);
    }
  }
  
  return { allowed: true };
}

/**
 * Record a submission for rate limiting
 */
export function recordSubmission(email: string, ip: string): void {
  const now = Date.now();
  const normalizedEmail = email.toLowerCase().trim();
  
  // Update email limit
  const emailEntry = emailLimits.get(normalizedEmail);
  if (emailEntry && now - emailEntry.firstRequest < TIME_WINDOW_MS) {
    emailEntry.count++;
  } else {
    emailLimits.set(normalizedEmail, { count: 1, firstRequest: now });
  }
  
  // Update IP limit
  const ipEntry = ipLimits.get(ip);
  if (ipEntry && now - ipEntry.firstRequest < TIME_WINDOW_MS) {
    ipEntry.count++;
  } else {
    ipLimits.set(ip, { count: 1, firstRequest: now });
  }
}

/**
 * Format milliseconds to human-readable time
 */
export function formatRetryAfter(ms: number): string {
  const minutes = Math.ceil(ms / 60000);
  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }
  const hours = Math.ceil(minutes / 60);
  return `${hours} hour${hours > 1 ? 's' : ''}`;
}
