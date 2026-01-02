/**
 * Shared validation constants and utilities
 * Used across auth pages and forms for consistent validation
 */

// ============ Validation Rules ============

export const VALIDATION_RULES = {
  NAME: {
    MIN_LENGTH: 2,
  },
  EMAIL: {
    REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
  },
} as const;

// ============ Validation Messages ============

export const VALIDATION_MESSAGES = {
  NAME_REQUIRED: "Name is required",
  NAME_TOO_SHORT: `Name must be at least ${VALIDATION_RULES.NAME.MIN_LENGTH} characters`,
  EMAIL_REQUIRED: "Email is required",
  EMAIL_INVALID: "Please enter a valid email",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} characters`,
} as const;

// ============ Validation Functions ============

/**
 * Validate name field
 * @returns Error message or empty string if valid
 */
export function validateName(value: string): string {
  if (!value.trim()) return VALIDATION_MESSAGES.NAME_REQUIRED;
  if (value.trim().length < VALIDATION_RULES.NAME.MIN_LENGTH) {
    return VALIDATION_MESSAGES.NAME_TOO_SHORT;
  }
  return "";
}

/**
 * Validate email field
 * @returns Error message or empty string if valid
 */
export function validateEmail(value: string): string {
  if (!value.trim()) return VALIDATION_MESSAGES.EMAIL_REQUIRED;
  if (!VALIDATION_RULES.EMAIL.REGEX.test(value)) {
    return VALIDATION_MESSAGES.EMAIL_INVALID;
  }
  return "";
}

/**
 * Validate password field for login (any length)
 * @returns Error message or empty string if valid
 */
export function validatePasswordLogin(value: string): string {
  if (!value) return VALIDATION_MESSAGES.PASSWORD_REQUIRED;
  return "";
}

/**
 * Validate password field for signup (min 8 chars)
 * @returns Error message or empty string if valid
 */
export function validatePasswordSignup(value: string): string {
  if (!value) return VALIDATION_MESSAGES.PASSWORD_REQUIRED;
  if (value.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH) {
    return VALIDATION_MESSAGES.PASSWORD_TOO_SHORT;
  }
  return "";
}

/**
 * Check if email is valid format
 */
export function isValidEmail(email: string): boolean {
  return VALIDATION_RULES.EMAIL.REGEX.test(email);
}

/**
 * Check if name meets minimum requirements
 */
export function isValidName(name: string): boolean {
  return name.trim().length >= VALIDATION_RULES.NAME.MIN_LENGTH;
}

/**
 * Check if password meets signup requirements
 */
export function isValidPassword(password: string): boolean {
  return password.length >= VALIDATION_RULES.PASSWORD.MIN_LENGTH;
}
