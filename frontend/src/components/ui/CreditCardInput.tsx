import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';
import { Input, InputProps } from './Input';

interface CreditCardInputProps extends Omit<InputProps, 'type' | 'leftIcon' | 'rightIcon'> {
  onCardTypeChange?: (cardType: CardType | null) => void;
  detectCardType?: boolean;
}

type CardType = 'visa' | 'mastercard' | 'amex' | 'discover' | 'diners' | 'jcb';

interface CardPattern {
  type: CardType;
  pattern: RegExp;
  length: number[];
  cvvLength: number;
  gaps: number[];
}

// Card type patterns and formatting rules
const CARD_PATTERNS: CardPattern[] = [
  {
    type: 'amex',
    pattern: /^3[47]/,
    length: [15],
    cvvLength: 4,
    gaps: [4, 10]
  },
  {
    type: 'visa',
    pattern: /^4/,
    length: [16, 18, 19],
    cvvLength: 3,
    gaps: [4, 8, 12]
  },
  {
    type: 'mastercard',
    pattern: /^(5[1-5]|2[2-7])/,
    length: [16],
    cvvLength: 3,
    gaps: [4, 8, 12]
  },
  {
    type: 'discover',
    pattern: /^(6011|65|64[4-9])/,
    length: [16],
    cvvLength: 3,
    gaps: [4, 8, 12]
  },
  {
    type: 'diners',
    pattern: /^(30[0-5]|36|38)/,
    length: [14],
    cvvLength: 3,
    gaps: [4, 10]
  },
  {
    type: 'jcb',
    pattern: /^35(2[89]|[3-8])/,
    length: [16],
    cvvLength: 3,
    gaps: [4, 8, 12]
  }
];

// Credit card icon SVG
const CreditCardIcon = () => (
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
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);

// Card brand icons
const VisaIcon = () => (
  <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
    <rect width="24" height="16" rx="4" fill="#1434CB"/>
    <path d="M8.84 11.52L10.32 4.8h2.24l-1.48 6.72H8.84zM15.6 4.96c-.48-.16-1.2-.32-2.08-.32-2.32 0-3.92 1.2-3.92 2.88 0 1.28 1.12 1.92 2 2.4.88.48 1.2.8 1.2 1.2 0 .64-.8.96-1.52.96-.88 0-1.44-.12-2.24-.44l-.32-.16-.32 1.84c.56.24 1.6.48 2.64.48 2.48 0 4.08-1.2 4.08-3.04 0-1.04-.64-1.84-2.08-2.48-.88-.4-1.44-.72-1.44-1.12 0-.4.48-.8 1.44-.8.8 0 1.36.16 1.84.32l.24.08.32-1.76z" fill="white"/>
  </svg>
);

const MastercardIcon = () => (
  <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
    <rect width="24" height="16" rx="4" fill="#EB001B"/>
    <circle cx="9" cy="8" r="5" fill="#FF5F00"/>
    <circle cx="15" cy="8" r="5" fill="#F79E1B"/>
  </svg>
);

const AmexIcon = () => (
  <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
    <rect width="24" height="16" rx="4" fill="#006FCF"/>
    <path d="M6.32 10.72L5.04 7.52 3.76 10.72H2.4L1.6 5.28h1.44L3.6 8.48 4.88 5.28h1.28L7.44 8.48 8 5.28h1.44L8.64 10.72H6.32zM11.52 10.72h-1.28V5.28h1.28v5.44z" fill="white"/>
  </svg>
);

const DiscoverIcon = () => (
  <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
    <rect width="24" height="16" rx="4" fill="#FF6000"/>
    <circle cx="18" cy="8" r="8" fill="#FFD700"/>
  </svg>
);

const CardTypeIcon = styled.div<{ $cardType: CardType | null }>`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.$cardType ? 1 : 0.3};
  transition: opacity ${props => props.theme.animations.duration.normal} ${props => props.theme.animations.easing.easeOut};
`;

// Utility functions
const detectCardType = (number: string): CardType | null => {
  const cleanNumber = number.replace(/\D/g, '');
  
  for (const card of CARD_PATTERNS) {
    if (card.pattern.test(cleanNumber)) {
      return card.type;
    }
  }
  
  return null;
};

const getCardPattern = (cardType: CardType | null): CardPattern | null => {
  return CARD_PATTERNS.find(pattern => pattern.type === cardType) || null;
};

const formatCardNumber = (value: string, cardType: CardType | null): string => {
  const cleanValue = value.replace(/\D/g, '');
  const pattern = getCardPattern(cardType);
  
  if (!pattern) {
    // Default formatting for unknown cards (4-4-4-4)
    return cleanValue.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  }
  
  let formatted = cleanValue;
  const gaps = pattern.gaps;
  
  // Apply gaps in reverse order to avoid index shifting
  for (let i = gaps.length - 1; i >= 0; i--) {
    const position = gaps[i];
    if (formatted.length > position) {
      formatted = formatted.slice(0, position) + ' ' + formatted.slice(position);
    }
  }
  
  return formatted.trim();
};

const validateCardNumber = (number: string, cardType: CardType | null): boolean => {
  const cleanNumber = number.replace(/\D/g, '');
  
  if (!cardType) return false;
  
  const pattern = getCardPattern(cardType);
  if (!pattern) return false;
  
  // Check length
  if (!pattern.length.includes(cleanNumber.length)) return false;
  
  // Luhn algorithm validation
  let sum = 0;
  let isEven = false;
  
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

const renderCardIcon = (cardType: CardType | null) => {
  switch (cardType) {
    case 'visa':
      return <VisaIcon />;
    case 'mastercard':
      return <MastercardIcon />;
    case 'amex':
      return <AmexIcon />;
    case 'discover':
      return <DiscoverIcon />;
    default:
      return <CreditCardIcon />;
  }
};

export const CreditCardInput = forwardRef<HTMLInputElement, CreditCardInputProps>(({
  onCardTypeChange,
  detectCardType: enableDetection = true,
  onChange,
  onBlur,
  value,
  error,
  ...props
}, ref) => {
  const [cardType, setCardType] = useState<CardType | null>(null);
  const [hasBeenBlurred, setHasBeenBlurred] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cleanValue = inputValue.replace(/\D/g, '');
    
    // Limit to maximum card length (19 digits)
    if (cleanValue.length > 19) return;
    
    // Detect card type
    let newCardType: CardType | null = null;
    if (enableDetection) {
      newCardType = detectCardType(cleanValue);
      if (newCardType !== cardType) {
        setCardType(newCardType);
        onCardTypeChange?.(newCardType);
      }
    }
    
    // Format the value
    const formattedValue = formatCardNumber(cleanValue, newCardType || cardType);
    
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
    onBlur?.(e);
  };

  const getValidationError = (): string => {
    if (error) return error;
    
    if (hasBeenBlurred && value) {
      const cleanValue = (value as string).replace(/\D/g, '');
      
      if (!cleanValue) {
        return 'Card number is required';
      }
      
      if (!cardType) {
        return 'Invalid card number';
      }
      
      if (!validateCardNumber(value as string, cardType)) {
        return 'Invalid card number';
      }
    }
    
    return '';
  };

  const validationError = getValidationError();
  const currentCardType = enableDetection ? cardType : null;

  return (
    <Input
      ref={ref}
      type="text"
      inputMode="numeric"
      autoComplete="cc-number"
      placeholder="1234 5678 9012 3456"
      leftIcon={<CreditCardIcon />}
      rightIcon={
        <CardTypeIcon $cardType={currentCardType}>
          {renderCardIcon(currentCardType)}
        </CardTypeIcon>
      }
      error={validationError}
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
      {...props}
    />
  );
});

CreditCardInput.displayName = 'CreditCardInput';

// Export types and utilities for external use
export type { CreditCardInputProps, CardType };
export { detectCardType, validateCardNumber, getCardPattern }; 