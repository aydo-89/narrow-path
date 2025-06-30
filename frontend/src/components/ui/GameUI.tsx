import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ResponsivePanel, Stack, Inline, ResponsiveTitle } from './Layout';
import { ThemeToggle } from './ThemeToggle';
import { media, spacing } from '../../styles/responsive';

const UIContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  z-index: 10;
`;

// Updated TopBar using ResponsivePanel
const TopBar = styled(ResponsivePanel).attrs({ position: 'top' })`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  ${media.desktop} {
    gap: 1rem;
  }
  
  ${media.tablet} {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const GameTitle = styled(ResponsiveTitle).attrs({ as: 'h1' })`
  text-align: left;
  
  ${media.tablet} {
    text-align: center;
  }
`;

const StatusContainer = styled(Inline).attrs({ 
  space: '1rem',
  wrap: true,
  align: 'center'
})`
  flex: 1;
  justify-content: flex-end;
  
  ${media.tablet} {
    justify-content: center;
  }
`;

const StatusIndicator = styled.div<{ riskLevel: string }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  border: 1px solid ${props => {
    switch (props.riskLevel) {
      case 'safe': return props.theme.colors.safe;
      case 'caution': return props.theme.colors.caution;
      case 'danger': return props.theme.colors.danger;
      case 'catastrophe': return props.theme.colors.catastrophe;
      default: return props.theme.colors.caution;
    }
  }};
  
  ${media.mobile} {
    padding: 0.4rem 0.8rem;
    gap: 0.4rem;
  }
`;

const StatusDot = styled.div<{ riskLevel: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => {
    switch (props.riskLevel) {
      case 'safe': return props.theme.colors.safe;
      case 'caution': return props.theme.colors.caution;
      case 'danger': return props.theme.colors.danger;
      case 'catastrophe': return props.theme.colors.catastrophe;
      default: return props.theme.colors.caution;
    }
  }};
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  ${media.mobile} {
    width: 6px;
    height: 6px;
  }
`;

const StatusText = styled.span`
  font-size: ${props => props.theme.typography.sizes.sm};
  color: ${props => props.theme.colors.text.secondary};
  font-weight: ${props => props.theme.typography.weights.medium};
  
  ${media.mobile} {
    font-size: ${props => props.theme.typography.sizes.xs};
  }
`;

const RiskDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  white-space: nowrap;
  min-width: 0;
  
  ${media.desktop} {
    padding: 0.3rem 0.6rem;
    gap: 0.4rem;
  }
  
  ${media.mobile} {
    padding: 0.25rem 0.5rem;
    gap: 0.3rem;
  }
`;

const RiskValue = styled.span<{ type: 'doom' | 'dystopia' | 'path' }>`
  font-size: ${props => props.theme.typography.sizes.sm};
  font-weight: ${props => props.theme.typography.weights.bold};
  color: ${props => {
    switch (props.type) {
      case 'doom': return '#ff6b6b';
      case 'dystopia': return '#4dabf7';
      case 'path': return props.theme.colors.safe;
      default: return props.theme.colors.text.primary;
    }
  }};
  
  ${media.mobile} {
    font-size: ${props => props.theme.typography.sizes.xs};
  }
`;

const RiskLabel = styled.span`
  font-size: ${props => props.theme.typography.sizes.xs};
  color: ${props => props.theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  ${media.mobile} {
    font-size: 0.65rem;
  }
`;

// Updated BottomControls using ResponsivePanel
const BottomControls = styled(ResponsivePanel).attrs({ 
  position: 'bottom',
  size: 'md'
})`
  display: flex;
  gap: 1rem;
  
  ${media.tablet} {
    justify-content: center;
  }
`;

const ActionButton = styled(motion.button)`
  ${spacing.p('1rem 2rem')}
  
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors.glass.border};
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.glass};
  
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.typography.sizes.base};
  font-weight: ${props => props.theme.typography.weights.medium};
  
  cursor: pointer;
  border: none;
  
  transition: all ${props => props.theme.animations.duration.normal} ${props => props.theme.animations.easing.easeOut};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.glass}, 0 8px 30px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  ${media.tablet} {
    ${spacing.p('0.875rem 1.5rem')}
    font-size: ${props => props.theme.typography.sizes.sm};
  }
  
  ${media.mobile} {
    ${spacing.p('0.75rem 1.25rem')}
    font-size: ${props => props.theme.typography.sizes.sm};
  }
`;

// Responsive status grid for mobile
const MobileStatusGrid = styled(Stack).attrs({ space: '0.5rem' })`
  ${media.fromTablet} {
    display: none;
  }
`;

const DesktopStatusInline = styled(StatusContainer)`
  ${media.mobile} {
    display: none;
  }
`;

// Helper functions
const getOverallRiskLevel = (pDoom: number, dystopia: number): 'safe' | 'caution' | 'danger' | 'catastrophe' => {
  const maxRisk = Math.max(pDoom, dystopia);
  if (maxRisk >= 80) return 'catastrophe';
  if (maxRisk >= 60) return 'danger';
  if (maxRisk >= 30) return 'caution';
  return 'safe';
};

const getPathStatus = (pathPosition: number): string => {
  if (pathPosition > 10) return 'Leaning Dystopian';
  if (pathPosition > 0) return 'Slightly Off Path';
  if (pathPosition > -10) return 'On The Narrow Path';
  return 'Chaotic Tendencies';
};

interface GameUIProps {
  pDoomValue?: number;
  dystopiaLevel?: number;
  pathPosition?: number;
  onStartScenario?: () => void;
}

export function GameUI({ 
  pDoomValue = 0.15, 
  dystopiaLevel = 0.20, 
  pathPosition = 0.45,
  onStartScenario 
}: GameUIProps) {
  const [showInfo, setShowInfo] = useState(false);
  
  // Convert 0-1 scale to percentage for display and risk calculations
  const pDoomPercent = pDoomValue * 100;
  const dystopiaPercent = dystopiaLevel * 100;
  const pathPercent = pathPosition * 100;
  
  const overallRiskLevel = getOverallRiskLevel(pDoomPercent, dystopiaPercent);
  const pathStatus = getPathStatus(pathPercent);

  const handleStartScenario = () => {
    if (onStartScenario) {
      onStartScenario();
    }
  };

  const handleShowInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <UIContainer>
      <TopBar>
        <GameTitle>The Narrow Path</GameTitle>
        
        {/* Desktop/Tablet Status Display */}
        <DesktopStatusInline>
          <StatusIndicator riskLevel={overallRiskLevel}>
            <StatusDot riskLevel={overallRiskLevel} />
            <StatusText>System Status</StatusText>
          </StatusIndicator>
          
          <RiskDisplay>
            <RiskValue type="doom">{pDoomPercent.toFixed(1)}%</RiskValue>
            <RiskLabel>P(Doom)</RiskLabel>
          </RiskDisplay>
          
          <RiskDisplay>
            <RiskValue type="dystopia">{dystopiaPercent.toFixed(1)}%</RiskValue>
            <RiskLabel>Dystopia</RiskLabel>
          </RiskDisplay>
          
          <RiskDisplay>
            <RiskValue type="path">{pathStatus}</RiskValue>
            <RiskLabel>Path</RiskLabel>
          </RiskDisplay>
          
          <ThemeToggle size="sm" />
        </DesktopStatusInline>
        
        {/* Mobile Status Display */}
        <MobileStatusGrid>
          <Inline space="0.5rem" align="center">
            <StatusIndicator riskLevel={overallRiskLevel}>
              <StatusDot riskLevel={overallRiskLevel} />
              <StatusText>System Status</StatusText>
            </StatusIndicator>
          </Inline>
          
          <Inline space="0.5rem" wrap>
            <RiskDisplay>
              <RiskValue type="doom">{pDoomPercent.toFixed(1)}%</RiskValue>
              <RiskLabel>P(Doom)</RiskLabel>
            </RiskDisplay>
            
            <RiskDisplay>
              <RiskValue type="dystopia">{dystopiaPercent.toFixed(1)}%</RiskValue>
              <RiskLabel>Dystopia</RiskLabel>
            </RiskDisplay>
            
            <RiskDisplay>
              <RiskValue type="path">{pathStatus}</RiskValue>
              <RiskLabel>Path</RiskLabel>
            </RiskDisplay>
            
            <ThemeToggle size="sm" />
          </Inline>
        </MobileStatusGrid>
      </TopBar>

      <BottomControls>
        <ActionButton
          onClick={handleStartScenario}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Start Scenario
        </ActionButton>
        
        <ActionButton
          onClick={handleShowInfo}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Game Info
        </ActionButton>
      </BottomControls>
    </UIContainer>
  );
} 