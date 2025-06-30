import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';
import { Input, InputProps } from './Input';

interface PasswordInputProps extends Omit<InputProps, 'type' | 'rightIcon'> {
  showStrengthIndicator?: boolean;
  validateOnBlur?: boolean;
  minLength?: number;
  requireSymbols?: boolean;
  requireNumbers?: boolean;
  requireUppercase?: boolean;
}

// Lock icon SVG
const LockIcon = () => (
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
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <circle cx="12" cy="16" r="1"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

// Eye icon for show password
const EyeIcon = () => (
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
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

// Eye off icon for hide password
const EyeOffIcon = () => (
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
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  opacity: 0.7;
  transition: all ${props => props.theme.animations.duration.fast} ${props => props.theme.animations.easing.easeOut};
  
  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.1);
  }
  
  &:focus {
    outline: none;
    opacity: 1;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const StrengthIndicator = styled.div<{ $strength: number }>`
  display: flex;
  gap: 0.25rem;
  margin-top: 0.5rem;
`;

const StrengthBar = styled.div<{ $active: boolean; $level: number }>`
  height: 4px;
  border-radius: 2px;
  flex: 1;
  background: ${props => {
    if (!props.$active) return 'rgba(255, 255, 255, 0.1)';
    
    switch (props.$level) {
      case 1: return props.theme.colors.dangerRed;
      case 2: return props.theme.colors.danger;
      case 3: return props.theme.colors.amberWarning;
      case 4: return props.theme.colors.safe;
      default: return 'rgba(255, 255, 255, 0.1)';
    }
  }};
  transition: all ${props => props.theme.animations.duration.normal} ${props => props.theme.animations.easing.easeOut};
`;

const StrengthText = styled.div<{ $strength: number }>`
  font-family: ${props => props.theme.typography.fonts.primary};
  font-size: ${props => props.theme.typography.sizes.sm};
  margin-top: 0.25rem;
  color: ${props => {
    switch (props.$strength) {
      case 0: return props.theme.colors.text.tertiary;
      case 1: return props.theme.colors.dangerRed;
      case 2: return props.theme.colors.danger;
      case 3: return props.theme.colors.amberWarning;
      case 4: return props.theme.colors.safe;
      default: return props.theme.colors.text.tertiary;
    }
  }};
`;

const calculatePasswordStrength = (
  password: string,
  minLength: number = 8,
  requireSymbols: boolean = true,
  requireNumbers: boolean = true,
  requireUppercase: boolean = true
): number => {
  if (!password) return 0;
  
  let score = 0;
  
  // Length check
  if (password.length >= minLength) score++;
  
  // Uppercase check
  if (!requireUppercase || /[A-Z]/.test(password)) score++;
  
  // Numbers check
  if (!requireNumbers || /\d/.test(password)) score++;
  
  // Symbols check
  if (!requireSymbols || /[^A-Za-z0-9]/.test(password)) score++;
  
  return score;
};

const getStrengthText = (strength: number): string => {
  switch (strength) {
    case 0: return '';
    case 1: return 'Weak';
    case 2: return 'Fair';
    case 3: return 'Good';
    case 4: return 'Strong';
    default: return '';
  }
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({
  showStrengthIndicator = false,
  validateOnBlur = false,
  minLength = 8,
  requireSymbols = true,
  requireNumbers = true,
  requireUppercase = true,
  error,
  helperText,
  onChange,
  onBlur,
  value,
  ...props
}, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenBlurred, setHasBeenBlurred] = useState(false);
  
  const passwordValue = (value as string) || '';
  const strength = calculatePasswordStrength(passwordValue, minLength, requireSymbols, requireNumbers, requireUppercase);
  
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setHasBeenBlurred(true);
    onBlur?.(e);
  };

  const getValidationError = (): string => {
    if (error) return error;
    
    if (validateOnBlur && hasBeenBlurred && passwordValue) {
      const issues: string[] = [];
      
      if (passwordValue.length < minLength) {
        issues.push(`at least ${minLength} characters`);
      }
      if (requireUppercase && !/[A-Z]/.test(passwordValue)) {
        issues.push('one uppercase letter');
      }
      if (requireNumbers && !/\d/.test(passwordValue)) {
        issues.push('one number');
      }
      if (requireSymbols && !/[^A-Za-z0-9]/.test(passwordValue)) {
        issues.push('one symbol');
      }
      
      if (issues.length > 0) {
        return `Password must contain ${issues.join(', ')}`;
      }
    }
    
    return '';
  };

  const validationError = getValidationError();

  return (
    <div>
      <Input
        ref={ref}
        type={isVisible ? 'text' : 'password'}
        leftIcon={<LockIcon />}
        rightIcon={
          <ToggleButton
            type="button"
            onClick={toggleVisibility}
            tabIndex={-1}
            aria-label={isVisible ? 'Hide password' : 'Show password'}
          >
            {isVisible ? <EyeOffIcon /> : <EyeIcon />}
          </ToggleButton>
        }
        error={validationError}
        helperText={!validationError ? helperText : undefined}
        autoComplete="current-password"
        onChange={onChange}
        onBlur={handleBlur}
        value={value}
        {...props}
      />
      
      {showStrengthIndicator && passwordValue && (
        <>
          <StrengthIndicator $strength={strength}>
            {[1, 2, 3, 4].map((level) => (
              <StrengthBar
                key={level}
                $active={strength >= level}
                $level={level}
              />
            ))}
          </StrengthIndicator>
          <StrengthText $strength={strength}>
            {getStrengthText(strength)}
          </StrengthText>
        </>
      )}
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

// Export types for external use
export type { PasswordInputProps }; 