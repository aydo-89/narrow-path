import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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

const TopBar = styled(motion.div)`
  position: absolute;
  top: 2rem;
  left: 2rem;
  right: 2rem;
  padding: 1rem 2rem;
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors.glass.border};
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.glass};
  pointer-events: auto;
  
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    gap: 1rem;
    padding: 1rem 1.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    top: 1rem;
    left: 1rem;
    right: 1rem;
    padding: 0.75rem 1rem;
    gap: 0.75rem;
    flex-direction: column;
  }
`;

const GameTitle = styled.h1`
  font-size: ${props => props.theme.typography.sizes.xl};
  font-weight: ${props => props.theme.typography.weights.bold};
  color: ${props => props.theme.colors.text.primary};
  margin: 0;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.typography.sizes.lg};
  }
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  justify-content: flex-end;
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    gap: 0.75rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
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
`;

const StatusText = styled.span`
  font-size: ${props => props.theme.typography.sizes.sm};
  color: ${props => props.theme.colors.text.secondary};
  font-weight: ${props => props.theme.typography.weights.medium};
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
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    padding: 0.3rem 0.6rem;
    gap: 0.4rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
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
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.typography.sizes.xs};
  }
`;

const RiskLabel = styled.span`
  font-size: ${props => props.theme.typography.sizes.xs};
  color: ${props => props.theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 0.65rem;
  }
`;

const BottomControls = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  pointer-events: auto;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    transform: none;
    justify-content: center;
  }
`;

const ActionButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors.glass.border};
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.glass};
  
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.typography.sizes.base};
  font-weight: ${props => props.theme.typography.weights.medium};
  font-family: ${props => props.theme.typography.fonts.primary};
  
  cursor: pointer;
  transition: all ${props => props.theme.animations.duration.normal} ${props => props.theme.animations.easing.easeOut};
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.glass}, ${props => props.theme.shadows.glow};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0.75rem 1.5rem;
    font-size: ${props => props.theme.typography.sizes.sm};
  }
`;

const SidePanel = styled(motion.div)<{ isOpen: boolean }>`
  position: absolute;
  top: 50%;
  right: ${props => props.isOpen ? '2rem' : '-320px'};
  transform: translateY(-50%);
  width: 300px;
  max-height: 70vh;
  padding: 1.5rem;
  
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors.glass.border};
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.glass};
  
  transition: right ${props => props.theme.animations.duration.slow} ${props => props.theme.animations.easing.easeOut};
  pointer-events: auto;
  overflow-y: auto;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    right: ${props => props.isOpen ? '1rem' : '-320px'};
    width: 280px;
    top: auto;
    bottom: 6rem;
    transform: none;
    max-height: 50vh;
  }
`;

const PanelTitle = styled.h3`
  font-size: ${props => props.theme.typography.sizes.lg};
  font-weight: ${props => props.theme.typography.weights.semibold};
  color: ${props => props.theme.colors.text.primary};
  margin: 0 0 1rem 0;
`;

const InfoText = styled.p`
  font-size: ${props => props.theme.typography.sizes.sm};
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0 0 1rem 0;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const MetricSection = styled.div`
  margin: 1.5rem 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const MetricTitle = styled.h4`
  font-size: ${props => props.theme.typography.sizes.base};
  font-weight: ${props => props.theme.typography.weights.semibold};
  color: ${props => props.theme.colors.text.primary};
  margin: 0 0 0.5rem 0;
`;

const MetricDescription = styled.p`
  font-size: ${props => props.theme.typography.sizes.xs};
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.4;
  margin: 0;
`;

// Helper function to determine overall risk level
const getOverallRiskLevel = (pDoom: number, dystopia: number): 'safe' | 'caution' | 'danger' | 'catastrophe' => {
  const maxRisk = Math.max(pDoom, dystopia);
  if (maxRisk >= 90) return 'catastrophe';
  if (maxRisk >= 70) return 'danger';
  if (maxRisk >= 40) return 'caution';
  return 'safe';
};

const getPathStatus = (pathPosition: number): string => {
  if (pathPosition < -30) return 'Leaning Chaos';
  if (pathPosition < -10) return 'Chaos Side';
  if (pathPosition > 30) return 'Leaning Control';
  if (pathPosition > 10) return 'Control Side';
  return 'Narrow Path';
};

interface GameUIProps {
  pDoomValue?: number;
  dystopiaLevel?: number;
  pathPosition?: number;
  onStartScenario?: () => void;
}

export function GameUI({ 
  pDoomValue = 15, 
  dystopiaLevel = 20, 
  pathPosition = -5,
  onStartScenario 
}: GameUIProps) {
  const [showInfo, setShowInfo] = useState(false);
  
  const overallRiskLevel = getOverallRiskLevel(pDoomValue, dystopiaLevel);
  const pathStatus = getPathStatus(pathPosition);
  
  const handleStartScenario = () => {
    if (onStartScenario) {
      onStartScenario();
    } else {
      // Navigate to first scenario
      console.log('Starting scenario...');
    }
  };
  
  const handleShowInfo = () => {
    setShowInfo(!showInfo);
  };
  
  return (
    <UIContainer>
      <TopBar
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <GameTitle>The Narrow Path</GameTitle>
        <StatusContainer>
          <StatusIndicator riskLevel={overallRiskLevel}>
            <StatusDot riskLevel={overallRiskLevel} />
            <StatusText>Risk: {overallRiskLevel.toUpperCase()}</StatusText>
          </StatusIndicator>
          
          <RiskDisplay>
            <div>
              <RiskLabel>P(Doom)</RiskLabel>
              <RiskValue type="doom">{pDoomValue}%</RiskValue>
            </div>
          </RiskDisplay>
          
          <RiskDisplay>
            <div>
              <RiskLabel>Dystopia</RiskLabel>
              <RiskValue type="dystopia">{dystopiaLevel}%</RiskValue>
            </div>
          </RiskDisplay>
          
          <RiskDisplay>
            <div>
              <RiskLabel>Path</RiskLabel>
              <RiskValue type="path">{pathStatus}</RiskValue>
            </div>
          </RiskDisplay>
        </StatusContainer>
      </TopBar>
      
      <BottomControls
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <ActionButton
          onClick={handleStartScenario}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Begin Simulation
        </ActionButton>
        
        <ActionButton
          onClick={handleShowInfo}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showInfo ? 'Hide Info' : 'Show Info'}
        </ActionButton>
      </BottomControls>
      
      <SidePanel isOpen={showInfo}>
        <PanelTitle>The Narrow Path</PanelTitle>
        <InfoText>
          Navigate the treacherous path between AI-driven chaos and authoritarian dystopia 
          from 2025-2030. Every decision creates tradeoffs between two dangerous extremes.
        </InfoText>
        
        <MetricSection>
          <MetricTitle>Current Metrics</MetricTitle>
          <MetricDescription>
            <strong>P(Doom): {pDoomValue}%</strong> - Risk of AI-driven chaos and catastrophic outcomes 
            from uncontrolled development.
            <br /><br />
            <strong>Dystopia Level: {dystopiaLevel}%</strong> - Risk of authoritarian control and 
            oppressive AI surveillance systems.
            <br /><br />
            <strong>Path Position: {pathStatus}</strong> - Your current balance between the extremes. 
            Stay in the narrow path to avoid both outcomes.
          </MetricDescription>
        </MetricSection>
        
        <InfoText>
          <strong>Game Over Conditions:</strong>
          <br />• P(Doom) reaches 100% = Chaos Victory
          <br />• Dystopia Level reaches 100% = Control Victory
          <br />• Success = Navigate to 2030 in the narrow path
        </InfoText>
      </SidePanel>
    </UIContainer>
  );
} 