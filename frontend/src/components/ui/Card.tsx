import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'success' | 'warning' | 'danger';
type CardSize = 'sm' | 'md' | 'lg';

interface CardProps {
  variant?: CardVariant;
  size?: CardSize;
  interactive?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  padding?: boolean;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const getVariantStyles = (variant: CardVariant) => {
  switch (variant) {
    case 'elevated':
      return css`
        background: ${props => props.theme.colors.glass.background};
        border: 1px solid ${props => props.theme.colors.glass.border};
        box-shadow: ${props => props.theme.shadows.glass}, 0 4px 20px rgba(0, 0, 0, 0.15);
      `;
    
    case 'outlined':
      return css`
        background: rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: none;
      `;
    
    case 'success':
      return css`
        background: linear-gradient(135deg, ${props => props.theme.colors.safe}15, ${props => props.theme.colors.safe}05);
        border: 1px solid ${props => props.theme.colors.safe}30;
        box-shadow: 0 4px 20px ${props => props.theme.colors.safe}10;
      `;
    
    case 'warning':
      return css`
        background: linear-gradient(135deg, ${props => props.theme.colors.caution}15, ${props => props.theme.colors.caution}05);
        border: 1px solid ${props => props.theme.colors.caution}30;
        box-shadow: 0 4px 20px ${props => props.theme.colors.caution}10;
      `;
    
    case 'danger':
      return css`
        background: linear-gradient(135deg, ${props => props.theme.colors.danger}15, ${props => props.theme.colors.danger}05);
        border: 1px solid ${props => props.theme.colors.danger}30;
        box-shadow: 0 4px 20px ${props => props.theme.colors.danger}10;
      `;
    
    default:
      return css`
        background: ${props => props.theme.colors.glass.background};
        border: 1px solid ${props => props.theme.colors.glass.border};
        box-shadow: ${props => props.theme.shadows.glass};
      `;
  }
};

const getSizeStyles = (size: CardSize) => {
  switch (size) {
    case 'sm':
      return css`
        border-radius: ${props => props.theme.borderRadius.lg};
      `;
    case 'lg':
      return css`
        border-radius: 20px;
      `;
    default:
      return css`
        border-radius: 16px;
      `;
  }
};

const StyledCard = styled(motion.div)<{
  $variant: CardVariant;
  $size: CardSize;
  $interactive: boolean;
  $padding: boolean;
}>`
  backdrop-filter: blur(20px);
  overflow: hidden;
  transition: all ${props => props.theme.animations.duration.normal} ${props => props.theme.animations.easing.easeOut};
  
  ${props => getVariantStyles(props.$variant)}
  ${props => getSizeStyles(props.$size)}
  
  ${props => props.$padding && css`
    padding: 1.5rem;
    
    @media (max-width: ${props => props.theme.breakpoints.tablet}) {
      padding: 1rem;
    }
  `}
  
  ${props => props.$interactive && css`
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${props => props.theme.shadows.glass}, 0 8px 30px rgba(0, 0, 0, 0.2);
      
      ${props.$variant === 'success' && css`
        box-shadow: 0 8px 30px ${props => props.theme.colors.safe}20;
      `}
      
      ${props.$variant === 'warning' && css`
        box-shadow: 0 8px 30px ${props => props.theme.colors.caution}20;
      `}
      
      ${props.$variant === 'danger' && css`
        box-shadow: 0 8px 30px ${props => props.theme.colors.danger}20;
      `}
    }
    
    &:active {
      transform: translateY(-1px);
    }
  `}
`;

const CardHeaderStyled = styled.div`
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 1rem 1rem 0.75rem 1rem;
  }
`;

const CardContentStyled = styled.div`
  padding: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 1rem;
  }
`;

const CardFooterStyled = styled.div`
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0.75rem 1rem 1rem 1rem;
  }
`;

export function Card({
  variant = 'default',
  size = 'md',
  interactive = false,
  children,
  onClick,
  className,
  padding = false
}: CardProps) {
  return (
    <StyledCard
      $variant={variant}
      $size={size}
      $interactive={interactive}
      $padding={padding}
      onClick={onClick}
      className={className}
      {...(interactive && {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 }
      })}
    >
      {children}
    </StyledCard>
  );
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <CardHeaderStyled className={className}>
      {children}
    </CardHeaderStyled>
  );
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <CardContentStyled className={className}>
      {children}
    </CardContentStyled>
  );
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <CardFooterStyled className={className}>
      {children}
    </CardFooterStyled>
  );
}

// Specialized card components for common use cases

export function AchievementCard({
  title,
  description,
  icon,
  earned = false,
  rarity,
  onClick
}: {
  title: string;
  description: string;
  icon?: React.ReactNode;
  earned?: boolean;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  onClick?: () => void;
}) {
  const getRarityVariant = (): CardVariant => {
    if (!earned) return 'outlined';
    switch (rarity) {
      case 'legendary': return 'warning';
      case 'epic': return 'success';
      case 'rare': return 'default';
      default: return 'outlined';
    }
  };

  return (
    <Card
      variant={getRarityVariant()}
      interactive={!!onClick}
      onClick={onClick}
    >
      <CardContent>
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          gap: '1rem',
          opacity: earned ? 1 : 0.5
        }}>
          {icon && (
            <div style={{ 
              fontSize: '2rem',
              minWidth: '3rem',
              textAlign: 'center'
            }}>
              {icon}
            </div>
          )}
          <div style={{ flex: 1 }}>
            <h3 style={{ 
              margin: '0 0 0.5rem 0',
              fontSize: '1.125rem',
              fontWeight: 600,
              color: earned ? '#f8fafc' : 'rgba(248, 250, 252, 0.6)'
            }}>
              {title}
            </h3>
            <p style={{ 
              margin: 0,
              fontSize: '0.875rem',
              color: earned ? 'rgba(248, 250, 252, 0.8)' : 'rgba(248, 250, 252, 0.5)',
              lineHeight: '1.4'
            }}>
              {description}
            </p>
            {rarity && earned && (
              <span style={{ 
                display: 'inline-block',
                marginTop: '0.5rem',
                padding: '0.25rem 0.5rem',
                fontSize: '0.75rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderRadius: '4px',
                background: rarity === 'legendary' ? '#f59e0b20' :
                           rarity === 'epic' ? '#10b98120' :
                           rarity === 'rare' ? '#3b82f620' : '#6b728020',
                color: rarity === 'legendary' ? '#f59e0b' :
                       rarity === 'epic' ? '#10b981' :
                       rarity === 'rare' ? '#3b82f6' : '#9ca3af'
              }}>
                {rarity}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ScenarioCard({
  title,
  description,
  act,
  completed = false,
  locked = false,
  onClick
}: {
  title: string;
  description: string;
  act: string;
  completed?: boolean;
  locked?: boolean;
  onClick?: () => void;
}) {
  const getVariant = (): CardVariant => {
    if (locked) return 'outlined';
    if (completed) return 'success';
    return 'default';
  };

  return (
    <Card
      variant={getVariant()}
      interactive={!locked && !!onClick}
      onClick={locked ? undefined : onClick}
    >
      <CardContent>
        <div style={{ opacity: locked ? 0.5 : 1 }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '0.75rem'
          }}>
            <span style={{ 
              fontSize: '0.75rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'rgba(248, 250, 252, 0.6)'
            }}>
              {act}
            </span>
            {completed && (
              <span style={{ color: '#10b981', fontSize: '1.25rem' }}>✓</span>
            )}
            {locked && (
              <span style={{ color: 'rgba(248, 250, 252, 0.4)', fontSize: '1.25rem' }}>🔒</span>
            )}
          </div>
          
          <h3 style={{ 
            margin: '0 0 0.5rem 0',
            fontSize: '1.125rem',
            fontWeight: 600,
            color: '#f8fafc'
          }}>
            {title}
          </h3>
          
          <p style={{ 
            margin: 0,
            fontSize: '0.875rem',
            color: 'rgba(248, 250, 252, 0.8)',
            lineHeight: '1.4'
          }}>
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export type { CardProps, CardVariant, CardSize }; 