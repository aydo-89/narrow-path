import React, { forwardRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

type SelectVariant = 'default' | 'success' | 'error' | 'warning';
type SelectSize = 'sm' | 'md' | 'lg';

interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  variant?: SelectVariant;
  size?: SelectSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
}

const getVariantStyles = (variant: SelectVariant, isOpen: boolean) => {
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
        ${isOpen && css`
          border-color: ${props => props.theme.colors.safe};
          box-shadow: 0 0 0 3px ${props => props.theme.colors.safe}20;
        `}
      `;
    
    case 'error':
      return css`
        ${baseStyles}
        border-color: ${props => props.theme.colors.dangerRed};
        ${isOpen && css`
          border-color: ${props => props.theme.colors.dangerRed};
          box-shadow: 0 0 0 3px ${props => props.theme.colors.dangerRed}20;
        `}
      `;
    
    case 'warning':
      return css`
        ${baseStyles}
        border-color: ${props => props.theme.colors.amberWarning};
        ${isOpen && css`
          border-color: ${props => props.theme.colors.amberWarning};
          box-shadow: 0 0 0 3px ${props => props.theme.colors.amberWarning}20;
        `}
      `;
    
    default:
      return css`
        ${baseStyles}
        ${isOpen && css`
          border-color: rgba(255, 255, 255, 0.4);
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
        `}
      `;
  }
};

const getSizeStyles = (size: SelectSize) => {
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

const SelectContainer = styled.div<{ $fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  
  ${props => props.$fullWidth && css`
    width: 100%;
  `}
`;

const Label = styled.label<{ $size: SelectSize }>`
  font-family: ${props => props.theme.typography.fonts.primary};
  font-weight: ${props => props.theme.typography.weights.medium};
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.$size === 'sm' ? props.theme.typography.sizes.sm :
                      props.$size === 'lg' ? props.theme.typography.sizes.lg : 
                      props.theme.typography.sizes.base};
`;

const SelectWrapper = styled.div<{ 
  $hasLeftIcon: boolean; 
  $size: SelectSize;
}>`
  position: relative;
  display: flex;
  align-items: center;
  
  ${props => props.$hasLeftIcon && css`
    padding-left: ${props.$size === 'sm' ? '2.5rem' : 
                   props.$size === 'lg' ? '3.5rem' : '3rem'};
  `}
`;

const StyledSelect = styled(motion.div)<{
  $variant: SelectVariant;
  $size: SelectSize;
  $fullWidth: boolean;
  $hasLeftIcon: boolean;
  $isOpen: boolean;
  $disabled: boolean;
}>`
  font-family: ${props => props.theme.typography.fonts.primary};
  font-weight: ${props => props.theme.typography.weights.normal};
  
  width: 100%;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  transition: all ${props => props.theme.animations.duration.normal} ${props => props.theme.animations.easing.easeOut};
  
  ${props => getVariantStyles(props.$variant, props.$isOpen)}
  ${props => getSizeStyles(props.$size)}
  
  ${props => props.$hasLeftIcon && css`
    padding-left: ${props.$size === 'sm' ? '2.5rem' : 
                   props.$size === 'lg' ? '3.5rem' : '3rem'};
  `}
  
  padding-right: ${props => props.$size === 'sm' ? '2.5rem' : 
                          props.$size === 'lg' ? '3.5rem' : '3rem'};
  
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

const SelectText = styled.div<{ $isPlaceholder: boolean }>`
  color: ${props => props.$isPlaceholder ? props.theme.colors.text.tertiary : 'inherit'};
  flex: 1;
`;

const IconWrapper = styled.div<{ 
  $position: 'left' | 'right'; 
  $size: SelectSize;
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
`;

const DropdownIcon = styled(motion.div)<{ $isOpen: boolean }>`
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform ${props => props.theme.animations.duration.normal} ${props => props.theme.animations.easing.easeOut};
`;

const DropdownContainer = styled(motion.div)<{ $size: SelectSize }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  margin-top: 0.25rem;
  
  background: ${props => props.theme.colors.glass.background};
  border: 1px solid ${props => props.theme.colors.glass.border};
  backdrop-filter: blur(20px);
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.glass};
  
  max-height: 200px;
  overflow-y: auto;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

const DropdownOption = styled(motion.div)<{ 
  $disabled: boolean; 
  $selected: boolean;
  $size: SelectSize;
}>`
  padding: ${props => props.$size === 'sm' ? '0.5rem 0.75rem' : 
                     props.$size === 'lg' ? '1rem 1.25rem' : '0.75rem 1rem'};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  color: ${props => props.$disabled ? props.theme.colors.text.tertiary : 
                   props.$selected ? props.theme.colors.text.primary : props.theme.colors.text.secondary};
  background: ${props => props.$selected ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  
  font-family: ${props => props.theme.typography.fonts.primary};
  font-size: ${props => props.$size === 'sm' ? props.theme.typography.sizes.sm :
                       props.$size === 'lg' ? props.theme.typography.sizes.lg : 
                       props.theme.typography.sizes.base};
  
  &:hover {
    background: ${props => !props.$disabled && 'rgba(255, 255, 255, 0.1)'};
    color: ${props => !props.$disabled && props.theme.colors.text.primary};
  }
  
  &:first-child {
    border-top-left-radius: ${props => props.theme.borderRadius.lg};
    border-top-right-radius: ${props => props.theme.borderRadius.lg};
  }
  
  &:last-child {
    border-bottom-left-radius: ${props => props.theme.borderRadius.lg};
    border-bottom-right-radius: ${props => props.theme.borderRadius.lg};
  }
`;

const HelperText = styled.div<{ $variant: SelectVariant }>`
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

// Chevron down icon
const ChevronDownIcon = () => (
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
    <polyline points="6,9 12,15 18,9"/>
  </svg>
);

export const Select = forwardRef<HTMLDivElement, SelectProps>(({
  variant = 'default',
  size = 'md',
  fullWidth = false,
  leftIcon,
  label,
  error,
  helperText,
  placeholder = 'Select an option...',
  options,
  value,
  onChange,
  disabled = false,
  className,
  name,
  id,
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Determine variant based on state
  const effectiveVariant = error ? 'error' : variant;
  const displayText = error || helperText;
  
  const selectedOption = options.find(option => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : placeholder;
  const isPlaceholder = !selectedOption;
  
  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };
  
  const handleOptionClick = (optionValue: string | number) => {
    if (!disabled) {
      onChange?.(optionValue);
      setIsOpen(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          // Navigate to next option
          const currentIndex = options.findIndex(opt => opt.value === value);
          const nextIndex = Math.min(currentIndex + 1, options.length - 1);
          if (options[nextIndex] && !options[nextIndex].disabled) {
            onChange?.(options[nextIndex].value);
          }
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          // Navigate to previous option
          const currentIndex = options.findIndex(opt => opt.value === value);
          const prevIndex = Math.max(currentIndex - 1, 0);
          if (options[prevIndex] && !options[prevIndex].disabled) {
            onChange?.(options[prevIndex].value);
          }
        }
        break;
    }
  };
  
  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref && 'current' in ref && ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, ref]);

  return (
    <SelectContainer $fullWidth={fullWidth} className={className} ref={ref}>
      {label && (
        <Label $size={size} htmlFor={id}>
          {label}
        </Label>
      )}
      
      <SelectWrapper
        $hasLeftIcon={!!leftIcon}
        $size={size}
      >
        {leftIcon && (
          <IconWrapper $position="left" $size={size}>
            {leftIcon}
          </IconWrapper>
        )}
        
        <StyledSelect
          $variant={effectiveVariant}
          $size={size}
          $fullWidth={fullWidth}
          $hasLeftIcon={!!leftIcon}
          $isOpen={isOpen}
          $disabled={disabled}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-labelledby={label ? id : undefined}
          whileHover={!disabled ? { scale: 1.01 } : {}}
          whileTap={!disabled ? { scale: 0.99 } : {}}
          transition={{ 
            duration: 0.1,
            ease: "easeInOut"
          }}
        >
          <SelectText $isPlaceholder={isPlaceholder}>
            {displayValue}
          </SelectText>
          
          <IconWrapper $position="right" $size={size}>
            <DropdownIcon $isOpen={isOpen}>
              <ChevronDownIcon />
            </DropdownIcon>
          </IconWrapper>
        </StyledSelect>
        
        <AnimatePresence>
          {isOpen && (
            <DropdownContainer
              $size={size}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {options.map((option) => (
                <DropdownOption
                  key={option.value}
                  $disabled={option.disabled || false}
                  $selected={option.value === value}
                  $size={size}
                  onClick={() => !option.disabled && handleOptionClick(option.value)}
                  whileHover={!option.disabled ? { backgroundColor: 'rgba(255, 255, 255, 0.15)' } : {}}
                  transition={{ duration: 0.1 }}
                >
                  {option.label}
                </DropdownOption>
              ))}
            </DropdownContainer>
          )}
        </AnimatePresence>
      </SelectWrapper>
      
      {displayText && (
        <HelperText $variant={effectiveVariant}>
          {displayText}
        </HelperText>
      )}
      
      {/* Hidden input for form submission */}
      <input
        type="hidden"
        name={name}
        value={value || ''}
      />
    </SelectContainer>
  );
});

Select.displayName = 'Select';

// Export types for external use
export type { SelectProps, SelectOption, SelectVariant, SelectSize }; 