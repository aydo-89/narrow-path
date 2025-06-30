import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background: ${props => props.theme.colors.glass.background};
        border: 1px solid ${props => props.theme.colors.glass.border};
        color: ${props => props.theme.colors.text.primary};
        box-shadow: ${props => props.theme.shadows.glass};
        
        &:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: ${props => props.theme.shadows.glow};
        }
      `;
    
    case 'secondary':
      return css`
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: ${props => props.theme.colors.text.secondary};
        
        &:hover:not(:disabled) {
          background: rgba(0, 0, 0, 0.3);
          border-color: rgba(255, 255, 255, 0.2);
          color: ${props => props.theme.colors.text.primary};
        }
      `;
    
    case 'danger':
      return css`
        background: linear-gradient(135deg, ${props => props.theme.colors.dangerRed}20, ${props => props.theme.colors.dangerDark}20);
        border: 1px solid ${props => props.theme.colors.dangerRed}40;
        color: ${props => props.theme.colors.dangerRed};
        
        &:hover:not(:disabled) {
          background: linear-gradient(135deg, ${props => props.theme.colors.dangerRed}30, ${props => props.theme.colors.dangerDark}30);
          border-color: ${props => props.theme.colors.dangerRed};
          box-shadow: ${props => props.theme.shadows.danger};
        }
      `;
    
    case 'success':
      return css`
        background: linear-gradient(135deg, ${props => props.theme.colors.safe}20, ${props => props.theme.colors.safe}10);
        border: 1px solid ${props => props.theme.colors.safe}40;
        color: ${props => props.theme.colors.safe};
        
        &:hover:not(:disabled) {
          background: linear-gradient(135deg, ${props => props.theme.colors.safe}30, ${props => props.theme.colors.safe}20);
          border-color: ${props => props.theme.colors.safe};
          box-shadow: 0 0 20px ${props => props.theme.colors.safe}30;
        }
      `;
    
    case 'ghost':
      return css`
        background: transparent;
        border: 1px solid transparent;
        color: ${props => props.theme.colors.text.secondary};
        
        &:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
          color: ${props => props.theme.colors.text.primary};
        }
      `;
    
    default:
      return '';
  }
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'sm':
      return css`
        padding: 0.5rem 1rem;
        font-size: ${props => props.theme.typography.sizes.sm};
        border-radius: ${props => props.theme.borderRadius.md};
      `;
    
    case 'md':
      return css`
        padding: 0.75rem 1.5rem;
        font-size: ${props => props.theme.typography.sizes.base};
        border-radius: ${props => props.theme.borderRadius.lg};
      `;
    
    case 'lg':
      return css`
        padding: 1rem 2rem;
        font-size: ${props => props.theme.typography.sizes.lg};
        border-radius: ${props => props.theme.borderRadius.xl};
      `;
    
    case 'xl':
      return css`
        padding: 1.25rem 2.5rem;
        font-size: ${props => props.theme.typography.sizes.xl};
        border-radius: ${props => props.theme.borderRadius.xl};
      `;
    
    default:
      return '';
  }
};

const StyledButton = styled(motion.button)<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $loading: boolean;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  font-family: ${props => props.theme.typography.fonts.primary};
  font-weight: ${props => props.theme.typography.weights.medium};
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  
  backdrop-filter: blur(20px);
  cursor: pointer;
  
  /* Performance optimizations: specific transitions instead of 'all' */
  transition-property: background-color, border-color, color, box-shadow, transform;
  transition-duration: ${props => props.theme.animations.duration.normal};
  transition-timing-function: ${props => props.theme.animations.easing.easeOut};
  
  /* GPU acceleration hints */
  will-change: transform, opacity;
  transform: translateZ(0);
  
  ${props => getVariantStyles(props.$variant)}
  ${props => getSizeStyles(props.$size)}
  
  ${props => props.$fullWidth && css`
    width: 100%;
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
  
  ${props => props.$loading && css`
    cursor: not-allowed;
    pointer-events: none;
  `}
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.$size === 'xl' ? '1rem 2rem' : 
                     props.$size === 'lg' ? '0.875rem 1.75rem' :
                     props.$size === 'md' ? '0.625rem 1.25rem' : '0.5rem 1rem'};
    font-size: ${props => props.$size === 'xl' ? props.theme.typography.sizes.lg :
                        props.$size === 'lg' ? props.theme.typography.sizes.base :
                        props.$size === 'md' ? props.theme.typography.sizes.sm : props.theme.typography.sizes.xs};
  }
`;

const LoadingSpinner = styled.div`
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  
  /* Use transform animation for better performance */
  animation: spin 1s linear infinite;
  will-change: transform;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  children,
  onClick,
  type = 'button',
  className
}: ButtonProps) {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $loading={loading}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      className={className}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      transition={{ 
        duration: 0.2,
        ease: "easeOut"
      }}
    >
      {loading && <LoadingSpinner />}
      {children}
    </StyledButton>
  );
}

// Export types for external use
export type { ButtonProps, ButtonVariant, ButtonSize }; 