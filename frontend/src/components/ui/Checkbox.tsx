import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

type CheckboxSize = 'sm' | 'md' | 'lg';
type CheckboxVariant = 'default' | 'success' | 'error' | 'warning';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  label?: string;
  error?: string;
  helperText?: string;
  indeterminate?: boolean;
}

const getSizeStyles = (size: CheckboxSize) => {
  switch (size) {
    case 'sm':
      return css`
        width: 1rem;
        height: 1rem;
      `;
    case 'lg':
      return css`
        width: 1.5rem;
        height: 1.5rem;
      `;
    default:
      return css`
        width: 1.25rem;
        height: 1.25rem;
      `;
  }
};

const getVariantStyles = (variant: CheckboxVariant, checked: boolean) => {
  const baseStyles = css`
    background: ${props => checked ? props.theme.colors.glass.background : 'transparent'};
    border: 2px solid ${props => props.theme.colors.glass.border};
    backdrop-filter: blur(20px);
  `;

  switch (variant) {
    case 'success':
      return css`
        ${baseStyles}
        border-color: ${props => props.theme.colors.safe};
        ${checked && css`
          background: ${props => props.theme.colors.safe}20;
          border-color: ${props => props.theme.colors.safe};
        `}
      `;
    
    case 'error':
      return css`
        ${baseStyles}
        border-color: ${props => props.theme.colors.dangerRed};
        ${checked && css`
          background: ${props => props.theme.colors.dangerRed}20;
          border-color: ${props => props.theme.colors.dangerRed};
        `}
      `;
    
    case 'warning':
      return css`
        ${baseStyles}
        border-color: ${props => props.theme.colors.amberWarning};
        ${checked && css`
          background: ${props => props.theme.colors.amberWarning}20;
          border-color: ${props => props.theme.colors.amberWarning};
        `}
      `;
    
    default:
      return css`
        ${baseStyles}
        ${checked && css`
          background: ${props => props.theme.colors.glass.background};
          border-color: rgba(255, 255, 255, 0.4);
        `}
      `;
  }
};

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CheckboxWrapper = styled.label<{ $disabled: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  user-select: none;
  opacity: ${props => props.$disabled ? 0.5 : 1};
`;

const HiddenInput = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  pointer-events: none;
  
  &:focus + div {
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }
`;

const StyledCheckbox = styled(motion.div)<{
  $size: CheckboxSize;
  $variant: CheckboxVariant;
  $checked: boolean;
  $indeterminate: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all ${props => props.theme.animations.duration.normal} ${props => props.theme.animations.easing.easeOut};
  
  ${props => getSizeStyles(props.$size)}
  ${props => getVariantStyles(props.$variant, props.$checked || props.$indeterminate)}
  
  /* Ensure proper alignment */
  margin-top: 0.125rem;
`;

const CheckIcon = styled(motion.svg)<{ $variant: CheckboxVariant }>`
  color: ${props => {
    switch (props.$variant) {
      case 'success':
        return props.theme.colors.safe;
      case 'error':
        return props.theme.colors.dangerRed;
      case 'warning':
        return props.theme.colors.amberWarning;
      default:
        return props.theme.colors.text.primary;
    }
  }};
`;

const IndeterminateIcon = styled(motion.div)<{ $variant: CheckboxVariant }>`
  width: 60%;
  height: 2px;
  background: ${props => {
    switch (props.$variant) {
      case 'success':
        return props.theme.colors.safe;
      case 'error':
        return props.theme.colors.dangerRed;
      case 'warning':
        return props.theme.colors.amberWarning;
      default:
        return props.theme.colors.text.primary;
    }
  }};
  border-radius: 1px;
`;

const LabelText = styled.div<{ $size: CheckboxSize }>`
  font-family: ${props => props.theme.typography.fonts.primary};
  font-weight: ${props => props.theme.typography.weights.normal};
  color: ${props => props.theme.colors.text.primary};
  line-height: 1.5;
  
  font-size: ${props => {
    switch (props.$size) {
      case 'sm':
        return props.theme.typography.sizes.sm;
      case 'lg':
        return props.theme.typography.sizes.lg;
      default:
        return props.theme.typography.sizes.base;
    }
  }};
`;

const HelperText = styled.div<{ $variant: CheckboxVariant }>`
  font-family: ${props => props.theme.typography.fonts.primary};
  font-size: ${props => props.theme.typography.sizes.sm};
  margin-left: 2rem;
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

// Check mark icon paths
const checkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: { 
      pathLength: { duration: 0.3 },
      opacity: { duration: 0.1 }
    }
  }
};

const indeterminateVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { 
    scaleX: 1, 
    opacity: 1,
    transition: { duration: 0.2 }
  }
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  size = 'md',
  variant = 'default',
  label,
  error,
  helperText,
  indeterminate = false,
  checked,
  disabled = false,
  className,
  onChange,
  ...props
}, ref) => {
  const effectiveVariant = error ? 'error' : variant;
  const displayText = error || helperText;
  const isChecked = indeterminate || checked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange?.(e);
    }
  };

  const iconSize = size === 'sm' ? 12 : size === 'lg' ? 18 : 16;

  return (
    <CheckboxContainer className={className}>
      <CheckboxWrapper $disabled={disabled}>
        <HiddenInput
          ref={ref}
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          {...props}
        />
        
        <StyledCheckbox
          $size={size}
          $variant={effectiveVariant}
          $checked={!!checked}
          $indeterminate={indeterminate}
          whileHover={!disabled ? { scale: 1.05 } : {}}
          whileTap={!disabled ? { scale: 0.95 } : {}}
          transition={{ duration: 0.1 }}
        >
          {indeterminate ? (
            <IndeterminateIcon
              $variant={effectiveVariant}
              initial="hidden"
              animate="visible"
              variants={indeterminateVariants}
            />
          ) : checked ? (
            <CheckIcon
              $variant={effectiveVariant}
              width={iconSize}
              height={iconSize}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial="hidden"
              animate="visible"
              variants={checkVariants}
            >
              <motion.polyline 
                points="20,6 9,17 4,12"
                variants={checkVariants}
              />
            </CheckIcon>
          ) : null}
        </StyledCheckbox>
        
        {label && (
          <LabelText $size={size}>
            {label}
          </LabelText>
        )}
      </CheckboxWrapper>
      
      {displayText && (
        <HelperText $variant={effectiveVariant}>
          {displayText}
        </HelperText>
      )}
    </CheckboxContainer>
  );
});

Checkbox.displayName = 'Checkbox';

// Export types for external use
export type { CheckboxProps, CheckboxSize, CheckboxVariant }; 