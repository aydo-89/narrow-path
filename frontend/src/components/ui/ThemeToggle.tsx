import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const ToggleContainer = styled.div<{ $size: string }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  ${props => {
    switch (props.$size) {
      case 'sm':
        return 'gap: 0.5rem;';
      case 'lg':
        return 'gap: 1rem;';
      default:
        return 'gap: 0.75rem;';
    }
  }}
`;

const ToggleButton = styled(motion.button)<{ $size: string; $isDark: boolean }>`
  position: relative;
  background: ${props => props.theme.colors.glass.background};
  border: 1px solid ${props => props.theme.colors.glass.border};
  border-radius: ${props => props.theme.borderRadius.full};
  cursor: pointer;
  padding: 0;
  overflow: hidden;
  
  backdrop-filter: blur(20px);
  box-shadow: ${props => props.theme.shadows.glass};
  
  transition: all ${props => props.theme.animations.duration.normal} ${props => props.theme.animations.easing.easeOut};
  
  ${props => {
    switch (props.$size) {
      case 'sm':
        return `
          width: 44px;
          height: 24px;
        `;
      case 'lg':
        return `
          width: 64px;
          height: 36px;
        `;
      default:
        return `
          width: 54px;
          height: 30px;
        `;
    }
  }}
  
  &:hover {
    border-color: ${props => props.theme.colors.border.accent};
    box-shadow: ${props => props.theme.shadows.glow};
  }
  
  &:focus {
    outline: 2px solid ${props => props.theme.colors.amberWarning};
    outline-offset: 2px;
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const ToggleTrack = styled.div<{ $size: string; $isDark: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  
  background: ${props => props.$isDark 
    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
    : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
  };
  
  transition: background ${props => props.theme.animations.duration.normal} ${props => props.theme.animations.easing.easeOut};
`;

const ToggleThumb = styled(motion.div)<{ $size: string }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  
  background: ${props => props.theme.colors.text.primary};
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.text.inverse};
  
  ${props => {
    switch (props.$size) {
      case 'sm':
        return `
          width: 18px;
          height: 18px;
          left: 3px;
        `;
      case 'lg':
        return `
          width: 28px;
          height: 28px;
          left: 4px;
        `;
      default:
        return `
          width: 22px;
          height: 22px;
          left: 4px;
        `;
    }
  }}
`;

const IconContainer = styled.div<{ $size: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    ${props => {
      switch (props.$size) {
        case 'sm':
          return `
            width: 10px;
            height: 10px;
          `;
        case 'lg':
          return `
            width: 16px;
            height: 16px;
          `;
        default:
          return `
            width: 12px;
            height: 12px;
          `;
      }
    }}
  }
`;

const ToggleLabel = styled.span<{ $size: string }>`
  font-family: ${props => props.theme.typography.fonts.primary};
  font-weight: ${props => props.theme.typography.weights.medium};
  color: ${props => props.theme.colors.text.secondary};
  
  ${props => {
    switch (props.$size) {
      case 'sm':
        return `font-size: ${props.theme.typography.sizes.sm};`;
      case 'lg':
        return `font-size: ${props.theme.typography.sizes.lg};`;
      default:
        return `font-size: ${props.theme.typography.sizes.base};`;
    }
  }}
`;

const Tooltip = styled(motion.div)<{ $size: string }>`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 0.5rem;
  
  background: ${props => props.theme.colors.glass.background};
  border: 1px solid ${props => props.theme.colors.glass.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 0.5rem 0.75rem;
  
  font-family: ${props => props.theme.typography.fonts.primary};
  font-size: ${props => props.theme.typography.sizes.sm};
  font-weight: ${props => props.theme.typography.weights.medium};
  color: ${props => props.theme.colors.text.primary};
  
  backdrop-filter: blur(20px);
  box-shadow: ${props => props.theme.shadows.glass};
  white-space: nowrap;
  pointer-events: none;
  z-index: 1000;
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: ${props => props.theme.colors.glass.border};
  }
`;

// Sun icon for light mode
const SunIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 17q-2.075 0-3.537-1.463Q7 14.075 7 12t1.463-3.538Q9.925 7 12 7t3.538 1.462Q17 9.925 17 12q0 2.075-1.462 3.537Q14.075 17 12 17zM2 13q-.425 0-.712-.288Q1 12.425 1 12t.288-.713Q1.575 11 2 11h2q.425 0 .713.287Q5 11.575 5 12t-.287.712Q4.425 13 4 13zm18 0q-.425 0-.712-.288Q19 12.425 19 12t.288-.713Q19.575 11 20 11h2q.425 0 .712.287Q23 11.575 23 12t-.288.712Q22.425 13 22 13zm-8-8q-.425 0-.712-.288Q11 4.425 11 4V2q0-.425.288-.713Q11.575 1 12 1t.713.287Q13 1.575 13 2v2q0 .425-.287.712Q12.425 5 12 5zm0 18q-.425 0-.712-.288Q11 22.425 11 22v-2q0-.425.288-.712Q11.575 19 12 19t.713.288Q13 19.575 13 20v2q0 .425-.287.712Q12.425 23 12 23zM5.65 7.05L4.575 6q-.3-.275-.288-.7Q4.3 4.875 4.575 4.6q.275-.275.7-.275q.425 0 .7.275L7.05 5.65q.275.3.275.7q0 .4-.275.7q-.3.275-.7.275q-.4 0-.7-.275zm12.7 12.7L17.3 18.7q-.275-.3-.275-.7q0-.4.275-.7q.3-.275.7-.275q.4 0 .7.275l1.075 1.05q.3.275.288.7q-.013.425-.288.7q-.275.275-.7.275q-.425 0-.7-.275zM17.3 7.05q-.3-.275-.3-.7q0-.425.3-.7L18.35 4.6q.275-.275.7-.275q.425 0 .7.275q.275.275.275.7q0 .425-.275.7L18.7 7.05q-.3.275-.7.275q-.4 0-.7-.275zM4.575 19.425q-.275-.275-.275-.7q0-.425.275-.7L5.65 16.95q.275-.275.7-.275q.425 0 .7.275q.275.275.275.7q0 .425-.275.7l-1.05 1.075q-.3.275-.7.275q-.4 0-.7-.275z"/>
  </svg>
);

// Moon icon for dark mode
const MoonIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21q-3.75 0-6.375-2.625T3 12q0-3.75 2.625-6.375T12 3q.35 0 .688.025q.337.025.662.075q-1.025.725-1.637 1.887Q11.1 6.15 11.1 7.5q0 2.25 1.575 3.825Q14.25 12.9 16.5 12.9q1.375 0 2.525-.613q1.15-.612 1.875-1.637q.05.325.075.662Q21 11.65 21 12q0 3.75-2.625 6.375T12 21z"/>
  </svg>
);

const tooltipVariants = {
  hidden: { opacity: 0, y: 5, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0, 
    y: 5, 
    scale: 0.95,
    transition: { duration: 0.15 }
  }
};

export function ThemeToggle({ 
  size = 'md', 
  showLabel = false,
  className 
}: ThemeToggleProps) {
  const { mode, toggleTheme, isSystemTheme } = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);
  const isDark = mode === 'dark';

  const getThumbPosition = () => {
    switch (size) {
      case 'sm':
        return isDark ? '3px' : '23px';
      case 'lg':
        return isDark ? '4px' : '32px';
      default:
        return isDark ? '4px' : '28px';
    }
  };

  const getTooltipText = () => {
    if (isSystemTheme) {
      return `System theme (${mode})`;
    }
    return `Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`;
  };

  return (
    <ToggleContainer $size={size} className={className}>
      {showLabel && (
        <ToggleLabel $size={size}>
          {mode === 'dark' ? 'Dark' : 'Light'} mode
        </ToggleLabel>
      )}
      
      <div style={{ position: 'relative' }}>
        <ToggleButton
          $size={size}
          $isDark={isDark}
          onClick={toggleTheme}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
        >
          <ToggleTrack $size={size} $isDark={isDark} />
          
          <ToggleThumb
            $size={size}
            animate={{ left: getThumbPosition() }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25 
            }}
          >
            <IconContainer $size={size}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <MoonIcon /> : <SunIcon />}
                </motion.div>
              </AnimatePresence>
            </IconContainer>
          </ToggleThumb>
        </ToggleButton>

        <AnimatePresence>
          {showTooltip && (
            <Tooltip
              $size={size}
              variants={tooltipVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {getTooltipText()}
            </Tooltip>
          )}
        </AnimatePresence>
      </div>
    </ToggleContainer>
  );
} 