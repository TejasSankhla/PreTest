/**
 * Password Strength Checker
 *
 * Evaluates password strength based on length, character variety, and common patterns
 */

export type PasswordStrength = 'weak' | 'medium' | 'strong';

export interface PasswordStrengthResult {
  strength: PasswordStrength;
  score: number; // 0-4
  feedback: string[];
  color: string; // For UI styling
}

/**
 * Check password strength and return detailed feedback
 */
export function checkPasswordStrength(password: string): PasswordStrengthResult {
  let score = 0;
  const feedback: string[] = [];

  // Requirement 1: Minimum length (8 characters)
  if (password.length >= 8) {
    score++;
  } else {
    feedback.push('At least 8 characters');
  }

  // Requirement 2: Mix of uppercase and lowercase
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    score++;
  } else if (!/[a-zA-Z]/.test(password)) {
    feedback.push('Include letters');
  } else {
    feedback.push('Mix uppercase and lowercase');
  }

  // Requirement 3: Contains numbers
  if (/\d/.test(password)) {
    score++;
  } else {
    feedback.push('Include a number');
  }

  // Requirement 4: Contains special characters
  if (/[^a-zA-Z0-9]/.test(password)) {
    score++;
  } else {
    feedback.push('Include a special character (!@#$%^&*)');
  }

  // Determine overall strength
  let strength: PasswordStrength;
  let color: string;

  if (score === 0) {
    strength = 'weak';
    color = 'red';
  } else if (score <= 2) {
    strength = 'weak';
    color = 'red';
  } else if (score === 3) {
    strength = 'medium';
    color = 'yellow';
  } else {
    strength = 'strong';
    color = 'green';
  }

  return {
    strength,
    score,
    feedback,
    color,
  };
}

/**
 * Get color classes for Tailwind based on strength
 */
export function getStrengthColorClasses(strength: PasswordStrength) {
  switch (strength) {
    case 'weak':
      return {
        bg: 'bg-red-500',
        text: 'text-red-600',
        border: 'border-red-500',
      };
    case 'medium':
      return {
        bg: 'bg-yellow-500',
        text: 'text-yellow-600',
        border: 'border-yellow-500',
      };
    case 'strong':
      return {
        bg: 'bg-green-500',
        text: 'text-green-600',
        border: 'border-green-500',
      };
  }
}
