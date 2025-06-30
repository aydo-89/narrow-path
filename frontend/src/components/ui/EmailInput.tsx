import React, { forwardRef, useState } from 'react';
import { Input, InputProps } from './Input';

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

interface EmailInputProps extends Omit<InputProps, 'type' | 'rightIcon'> {
  validateOnBlur?: boolean;
  showValidation?: boolean;
}

// Email icon SVG
const EmailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

// Check icon for valid state
const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(({
  validateOnBlur = true,
  showValidation = true,
  error,
  success,
  onBlur,
  onChange,
  value,
  ...props
}, ref) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [hasBeenBlurred, setHasBeenBlurred] = useState(false);

  const validateEmail = (email: string): boolean => {
    if (!email) return false;
    return EMAIL_REGEX.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Clear validation state when user starts typing after blur
    if (hasBeenBlurred && isValid !== null) {
      setIsValid(null);
    }
    
    onChange?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setHasBeenBlurred(true);
    
    if (validateOnBlur && showValidation) {
      const email = e.target.value;
      setIsValid(validateEmail(email));
    }
    
    onBlur?.(e);
  };

  // Determine validation state
  const shouldShowValid = showValidation && isValid === true && !error;
  const shouldShowError = error || (showValidation && hasBeenBlurred && isValid === false);

  const getErrorMessage = (): string => {
    if (error) return error;
    if (showValidation && hasBeenBlurred && isValid === false) {
      const email = (value as string) || '';
      if (!email) return 'Email is required';
      return 'Please enter a valid email address';
    }
    return '';
  };

  return (
    <Input
      ref={ref}
      type="email"
      leftIcon={<EmailIcon />}
      rightIcon={shouldShowValid ? <CheckIcon /> : undefined}
      error={shouldShowError ? getErrorMessage() : undefined}
      success={shouldShowValid}
      autoComplete="email"
      inputMode="email"
      onBlur={handleBlur}
      onChange={handleChange}
      value={value}
      {...props}
    />
  );
});

EmailInput.displayName = 'EmailInput';

// Export types for external use
export type { EmailInputProps }; 