import React, { forwardRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

type InputVariant = 'default' | 'success' | 'error' | 'warning';
type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  size?: InputSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  error?: string;
  helperText?: string;
  loading?: boolean;
  success?: boolean;
}

const getVariantStyles = (variant: InputVariant, isFocused: boolean) => {
  const baseStyles = css`
    background: ${props => props.theme.colors.glass.background};
    border: 1px solid ${props => props.theme.colors.glass.border};
    color: ${props => props.theme.colors.text.primary};
    backdrop-filter: blur(20px);
  `;

  switch (variant) {
    case 'success':
      return css`
        ${baseStyles}
        border-color: ${props => props.theme.colors.safe};
        ${isFocused && css`
          border-color: ${props => props.theme.colors.safe};
          box-shadow: 0 0 0 3px ${props => props.theme.colors.safe}20;
        `}
      `;
    
    case 'error':
      return css`
        ${baseStyles}
        border-color: ${props => props.theme.colors.dangerRed};
        ${isFocused && css`
          border-color: ${props => props.theme.colors.dangerRed};
          box-shadow: 0 0 0 3px ${props => props.theme.colors.dangerRed}20;
        `}
      `;
    
    case 'warning':
      return css`
        ${baseStyles}
        border-color: ${props => props.theme.colors.amberWarning};
        ${isFocused && css`
          border-color: ${props => props.theme.colors.amberWarning};
          box-shadow: 0 0 0 3px ${props => props.theme.colors.amberWarning}20;
        `}
      `;
    
    default:
      return css`
        ${baseStyles}
        ${isFocused && css`
          border-color: rgba(255, 255, 255, 0.4);
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
        `}
      `;
  }
};

const getSizeStyles = (size: InputSize) => {
  switch (size) {
    case 'sm':
      return css`
        padding: 0.5rem 0.75rem;
        font-size: ${props => props.theme.typography.sizes.sm};
        border-radius: ${props => props.theme.borderRadius.md};
      `;
    
    case 'md':
      return css`
        padding: 0.75rem 1rem;
        font-size: ${props => props.theme.typography.sizes.base};
        border-radius: ${props => props.theme.borderRadius.lg};
      `;
    
    case 'lg':
      return css`
        padding: 1rem 1.25rem;
        font-size: ${props => props.theme.typography.sizes.lg};
        border-radius: ${props => props.theme.borderRadius.xl};
      `;
    
    default:
      return '';
  }
};

const InputContainer = styled.div<{ $fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  ${props => props.$fullWidth && css`
    width: 100%;
  `}
`;

const Label = styled.label<{ $size: InputSize }>`
  font-family: ${props => props.theme.typography.fonts.primary};
  font-weight: ${props => props.theme.typography.weights.medium};
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.$size === 'sm' ? props.theme.typography.sizes.sm :
                      props.$size === 'lg' ? props.theme.typography.sizes.lg : 
                      props.theme.typography.sizes.base};
`;

const InputWrapper = styled.div<{ 
  $hasLeftIcon: boolean; 
  $hasRightIcon: boolean;
  $size: InputSize;
}>`
  position: relative;
  display: flex;
  align-items: center;
  
  ${props => props.$hasLeftIcon && css`
    padding-left: ${props.$size === 'sm' ? '2.5rem' : 
                   props.$size === 'lg' ? '3.5rem' : '3rem'};
  `}
  
  ${props => props.$hasRightIcon && css`
    padding-right: ${props.$size === 'sm' ? '2.5rem' : 
                    props.$size === 'lg' ? '3.5rem' : '3rem'};
  `}
`;

const StyledInput = styled.input<{
  $variant: InputVariant;
  $size: InputSize;
  $fullWidth: boolean;
  $hasLeftIcon: boolean;
  $hasRightIcon: boolean;
  $isFocused: boolean;
}>`
  font-family: ${props => props.theme.typography.fonts.primary};
  font-weight: ${props => props.theme.typography.weights.normal};
  
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: inherit;
  
  transition: all ${props => props.theme.animations.duration.normal} ${props => props.theme.animations.easing.easeOut};
  
  ${props => getVariantStyles(props.$variant, props.$isFocused)}
  ${props => getSizeStyles(props.$size)}
  
  ${props => props.$hasLeftIcon && css`
    padding-left: ${props.$size === 'sm' ? '2.5rem' : 
                   props.$size === 'lg' ? '3.5rem' : '3rem'};
  `}
  
  ${props => props.$hasRightIcon && css`
    padding-right: ${props.$size === 'sm' ? '2.5rem' : 
                    props.$size === 'lg' ? '3.5rem' : '3rem'};
  `}
  
  &::placeholder {
    color: ${props => props.theme.colors.text.tertiary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.$size === 'lg' ? '0.875rem 1rem' : 
                       props.$size === 'md' ? '0.625rem 0.875rem' : '0.5rem 0.625rem'};
    font-size: ${props => props.$size === 'lg' ? props.theme.typography.sizes.base :
                        props.$size === 'md' ? props.theme.typography.sizes.sm : props.theme.typography.sizes.xs};
  }
`;

const IconWrapper = styled.div<{ 
  $position: 'left' | 'right'; 
  $size: InputSize;
  $loading?: boolean;
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.text.secondary};
  pointer-events: none;
  z-index: 1;
  
  ${props => props.$position === 'left' ? css`
    left: ${props.$size === 'sm' ? '0.75rem' : 
            props.$size === 'lg' ? '1.25rem' : '1rem'};
  ` : css`
    right: ${props.$size === 'sm' ? '0.75rem' : 
             props.$size === 'lg' ? '1.25rem' : '1rem'};
  `}
  
  ${props => props.$loading && css`
    animation: spin 1s linear infinite;
    
    @keyframes spin {
      to {
        transform: translateY(-50%) rotate(360deg);
      }
    }
  `}
`;

const HelperText = styled.div<{ $variant: InputVariant }>`
  font-family: ${props => props.theme.typography.fonts.primary};
  font-size: ${props => props.theme.typography.sizes.sm};
  color: ${props => {
    switch (props.$variant) {
      case 'error':
        return props.theme.colors.dangerRed;
      case 'warning':
        return props.theme.colors.amberWarning;
      case 'success':
        return props.theme.colors.safe;
      default:
        return props.theme.colors.text.secondary;
    }
  }};
`;

const LoadingSpinner = styled.div`
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  variant = 'default',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  label,
  error,
  helperText,
  loading = false,
  success = false,
  className,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  
  // Determine variant based on state
  const effectiveVariant = error ? 'error' : success ? 'success' : variant;
  const displayText = error || helperText;
  
  return (
    <InputContainer $fullWidth={fullWidth} className={className}>
      {label && (
        <Label $size={size} htmlFor={props.id}>
          {label}
        </Label>
      )}
      
      <InputWrapper
        $hasLeftIcon={!!leftIcon}
        $hasRightIcon={!!rightIcon || loading}
        $size={size}
      >
        {leftIcon && (
          <IconWrapper $position="left" $size={size}>
            {leftIcon}
          </IconWrapper>
        )}
        
        <StyledInput
          ref={ref}
          $variant={effectiveVariant}
          $size={size}
          $fullWidth={fullWidth}
          $hasLeftIcon={!!leftIcon}
          $hasRightIcon={!!rightIcon || loading}
          $isFocused={isFocused}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        
        {(rightIcon || loading) && (
          <IconWrapper $position="right" $size={size} $loading={loading}>
            {loading ? <LoadingSpinner /> : rightIcon}
          </IconWrapper>
        )}
      </InputWrapper>
      
      {displayText && (
        <HelperText $variant={effectiveVariant}>
          {displayText}
        </HelperText>
      )}
    </InputContainer>
  );
});

Input.displayName = 'Input';

// Export types for external use
export type { InputProps, InputVariant, InputSize }; 