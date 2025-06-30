import React, { forwardRef, useState } from 'react';
import { Input, InputProps } from './Input';
import { CardType } from './CreditCardInput';

interface CVVInputProps extends Omit<InputProps, 'type' | 'leftIcon'> {
  cardType?: CardType | null;
  validateOnBlur?: boolean;
}

// Shield icon SVG
const ShieldIcon = () => (
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
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

// Get expected CVV length based on card type
const getCVVLength = (cardType: CardType | null): number => {
  // American Express uses 4-digit CVV, all others use 3-digit
  return cardType === 'amex' ? 4 : 3;
};

// Get CVV name based on card type
const getCVVName = (cardType: CardType | null): string => {
  switch (cardType) {
    case 'amex':
      return 'CID'; // Card Identification Number
    default:
      return 'CVV'; // Card Verification Value
  }
};

// Get CVV placeholder based on card type
const getCVVPlaceholder = (cardType: CardType | null): string => {
  const length = getCVVLength(cardType);
  const name = getCVVName(cardType);
  return `${name} (${'●'.repeat(length)})`;
};

// Validate CVV
const validateCVV = (value: string, cardType: CardType | null): { isValid: boolean; error?: string } => {
  const cleanValue = value.replace(/\D/g, '');
  
  if (!cleanValue) {
    return { isValid: false, error: `${getCVVName(cardType)} is required` };
  }
  
  const expectedLength = getCVVLength(cardType);
  
  if (cleanValue.length !== expectedLength) {
    return { 
      isValid: false, 
      error: `${getCVVName(cardType)} must be ${expectedLength} digits` 
    };
  }
  
  return { isValid: true };
};

export const CVVInput = forwardRef<HTMLInputElement, CVVInputProps>(({
  cardType = null,
  validateOnBlur = true,
  onChange,
  onBlur,
  value,
  error,
  placeholder,
  ...props
}, ref) => {
  const [hasBeenBlurred, setHasBeenBlurred] = useState(false);
  const [validationError, setValidationError] = useState<string>('');

  const maxLength = getCVVLength(cardType);
  const effectivePlaceholder = placeholder || getCVVPlaceholder(cardType);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cleanValue = inputValue.replace(/\D/g, '');
    
    // Limit to expected CVV length
    if (cleanValue.length > maxLength) return;
    
    // Clear validation error when user starts typing after blur
    if (hasBeenBlurred && validationError) {
      setValidationError('');
    }
    
    // Create a new event with cleaned value
    const cleanedEvent = {
      ...e,
      target: {
        ...e.target,
        value: cleanValue
      }
    };
    
    onChange?.(cleanedEvent);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setHasBeenBlurred(true);
    
    if (validateOnBlur) {
      const validation = validateCVV(e.target.value, cardType);
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
    
    // Don't allow more than max length
    if (value.length >= maxLength && e.keyCode !== 8 && e.keyCode !== 46) {
      e.preventDefault();
    }
  };

  const effectiveError = error || validationError;

  return (
    <Input
      ref={ref}
      type="text"
      inputMode="numeric"
      autoComplete="cc-csc"
      placeholder={effectivePlaceholder}
      maxLength={maxLength}
      leftIcon={<ShieldIcon />}
      error={effectiveError}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      value={value}
      // Security feature: Don't allow copy/paste of CVV
      onCopy={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
      {...props}
    />
  );
});

CVVInput.displayName = 'CVVInput';

// Export types and utilities for external use
export type { CVVInputProps };
export { getCVVLength, getCVVName, validateCVV }; 