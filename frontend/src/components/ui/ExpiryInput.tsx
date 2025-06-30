import React, { forwardRef, useState } from 'react';
import { Input, InputProps } from './Input';

interface ExpiryInputProps extends Omit<InputProps, 'type' | 'leftIcon'> {
  validateOnBlur?: boolean;
}

// Calendar icon SVG
const CalendarIcon = () => (
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
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

// Format expiry date as MM/YY
const formatExpiryDate = (value: string): string => {
  // Remove all non-numeric characters
  const cleanValue = value.replace(/\D/g, '');
  
  // Limit to 4 digits
  const limitedValue = cleanValue.slice(0, 4);
  
  // Add slash after 2 digits
  if (limitedValue.length >= 2) {
    return `${limitedValue.slice(0, 2)}/${limitedValue.slice(2)}`;
  }
  
  return limitedValue;
};

// Validate expiry date
const validateExpiryDate = (value: string): { isValid: boolean; error?: string } => {
  const cleanValue = value.replace(/\D/g, '');
  
  if (!cleanValue) {
    return { isValid: false, error: 'Expiry date is required' };
  }
  
  if (cleanValue.length !== 4) {
    return { isValid: false, error: 'Enter a valid expiry date (MM/YY)' };
  }
  
  const month = parseInt(cleanValue.slice(0, 2));
  const year = parseInt(cleanValue.slice(2, 4));
  
  // Validate month (01-12)
  if (month < 1 || month > 12) {
    return { isValid: false, error: 'Invalid month (01-12)' };
  }
  
  // Validate year (current year or future)
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
  const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11
  
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return { isValid: false, error: 'Card has expired' };
  }
  
  // Check if year is too far in the future (more than 20 years)
  const fullYear = year < 50 ? 2000 + year : 1900 + year; // Assume 00-49 = 2000-2049, 50-99 = 1950-1999
  const maxYear = currentDate.getFullYear() + 20;
  
  if (fullYear > maxYear) {
    return { isValid: false, error: 'Invalid expiry year' };
  }
  
  return { isValid: true };
};

export const ExpiryInput = forwardRef<HTMLInputElement, ExpiryInputProps>(({
  validateOnBlur = true,
  onChange,
  onBlur,
  value,
  error,
  ...props
}, ref) => {
  const [hasBeenBlurred, setHasBeenBlurred] = useState(false);
  const [validationError, setValidationError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formattedValue = formatExpiryDate(inputValue);
    
    // Clear validation error when user starts typing after blur
    if (hasBeenBlurred && validationError) {
      setValidationError('');
    }
    
    // Create a new event with formatted value
    const formattedEvent = {
      ...e,
      target: {
        ...e.target,
        value: formattedValue
      }
    };
    
    onChange?.(formattedEvent);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setHasBeenBlurred(true);
    
    if (validateOnBlur) {
      const validation = validateExpiryDate(e.target.value);
      if (!validation.isValid) {
        setValidationError(validation.error || '');
      } else {
        setValidationError('');
      }
    }
    
    onBlur?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const value = input.value;
    
    // Allow backspace, delete, tab, escape, enter
    if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
        // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode === 65 && e.ctrlKey === true) ||
        (e.keyCode === 67 && e.ctrlKey === true) ||
        (e.keyCode === 86 && e.ctrlKey === true) ||
        (e.keyCode === 88 && e.ctrlKey === true) ||
        // Allow home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
      return;
    }
    
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
    
    // Don't allow more than 5 characters (MM/YY format)
    if (value.length >= 5 && e.keyCode !== 8 && e.keyCode !== 46) {
      e.preventDefault();
    }
  };

  const effectiveError = error || validationError;

  return (
    <Input
      ref={ref}
      type="text"
      inputMode="numeric"
      autoComplete="cc-exp"
      placeholder="MM/YY"
      maxLength={5}
      leftIcon={<CalendarIcon />}
      error={effectiveError}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      value={value}
      {...props}
    />
  );
});

ExpiryInput.displayName = 'ExpiryInput';

// Export types and utilities for external use
export type { ExpiryInputProps };
export { formatExpiryDate, validateExpiryDate }; 