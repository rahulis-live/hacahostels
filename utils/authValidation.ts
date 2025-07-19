/**
 * Authentication validation utilities
 */

export interface PasswordValidation {
  isValid: boolean;
  errors: string[];
  strength: 'weak' | 'medium' | 'strong';
}

export interface EmailValidation {
  isValid: boolean;
  error?: string;
}

/**
 * Validate email format and security
 */
export const validateEmail = (email: string): EmailValidation => {
  if (!email || !email.trim()) {
    return { isValid: false, error: 'Email is required' };
  }

  const trimmedEmail = email.trim().toLowerCase();
  
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return { isValid: false, error: 'Invalid email format' };
  }

  // Check for common disposable email domains (basic list)
  const disposableDomains = [
    '10minutemail.com',
    'tempmail.org',
    'guerrillamail.com',
    'mailinator.com',
    'throwaway.email'
  ];
  
  const domain = trimmedEmail.split('@')[1];
  if (disposableDomains.includes(domain)) {
    return { isValid: false, error: 'Disposable email addresses are not allowed' };
  }

  return { isValid: true };
};

/**
 * Validate password strength and security requirements
 */
export const validatePassword = (password: string): PasswordValidation => {
  const errors: string[] = [];
  
  if (!password) {
    return {
      isValid: false,
      errors: ['Password is required'],
      strength: 'weak'
    };
  }

  // Length requirement
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  // Character requirements
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!/[@$!%*?&]/.test(password)) {
    errors.push('Password must contain at least one special character (@$!%*?&)');
  }

  // Common password patterns to avoid
  const commonPatterns = [
    /^password/i,
    /^123456/,
    /^qwerty/i,
    /^admin/i,
    /^letmein/i,
    /^welcome/i,
    /^monkey/i,
    /^dragon/i
  ];

  if (commonPatterns.some(pattern => pattern.test(password))) {
    errors.push('Password contains common patterns that are easily guessed');
  }

  // Sequential characters
  if (/(.)\1{2,}/.test(password)) {
    errors.push('Password should not contain repeated characters');
  }

  // Calculate strength
  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  if (errors.length === 0) {
    if (password.length >= 12 && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      strength = 'strong';
    } else {
      strength = 'medium';
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    strength
  };
};

/**
 * Sanitize user input to prevent injection attacks
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

/**
 * Rate limiting for authentication attempts
 */
class AuthRateLimiter {
  private attempts: Map<string, { count: number; lastAttempt: number }> = new Map();
  private readonly maxAttempts = 5;
  private readonly windowMs = 15 * 60 * 1000; // 15 minutes

  isRateLimited(identifier: string): boolean {
    const now = Date.now();
    const record = this.attempts.get(identifier);

    if (!record) {
      return false;
    }

    // Reset if window has passed
    if (now - record.lastAttempt > this.windowMs) {
      this.attempts.delete(identifier);
      return false;
    }

    return record.count >= this.maxAttempts;
  }

  recordAttempt(identifier: string): void {
    const now = Date.now();
    const record = this.attempts.get(identifier);

    if (!record || now - record.lastAttempt > this.windowMs) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
    } else {
      record.count++;
      record.lastAttempt = now;
    }
  }

  getRemainingTime(identifier: string): number {
    const record = this.attempts.get(identifier);
    if (!record) return 0;

    const elapsed = Date.now() - record.lastAttempt;
    return Math.max(0, this.windowMs - elapsed);
  }
}

export const authRateLimiter = new AuthRateLimiter();