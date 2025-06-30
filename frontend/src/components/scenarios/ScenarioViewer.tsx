import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ScenarioContainer = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 800px;
  padding: 2rem;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  pointer-events: auto;
  
  @media (max-width: 768px) {
    width: 95%;
    padding: 1.5rem;
    bottom: 1rem;
  }
`;

const ScenarioTitle = styled.h3`
  color: #f8fafc;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const ScenarioText = styled.p`
  color: rgba(248, 250, 252, 0.8);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ChoicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ChoiceButton = styled(motion.button)`
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #f8fafc;
  font-size: 0.95rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

interface Choice {
  id: string;
  text: string;
  impact?: {
    pDoomChange: number;
    dystopiaChange: number;
    pathChange: number;
    description: string;
  };
}

interface GameState {
  pDoom: number;
  dystopiaLevel: number;
  pathPosition: number;
  gamePhase: 'menu' | 'playing' | 'gameOver';
  gameOverReason?: 'doom' | 'dystopia' | 'success';
}

interface ScenarioViewerProps {
  title?: string;
  description?: string;
  choices?: Choice[];
  onChoiceSelect?: (choice: Choice) => void;
  onChoice?: (choiceData: { pDoomChange: number; dystopiaChange: number; pathChange: number; }) => void;
  onReset?: () => void;
  gameState?: GameState;
  visible?: boolean;
}

export function ScenarioViewer({ 
  title = "The AI Safety Summit", 
  description = "World leaders gather to discuss AI governance. Your decision as a key policy advisor will shape global AI development...",
  choices = [
    { id: '1', text: "Push for immediate international AI moratorium", impact: { pDoomChange: -0.05, dystopiaChange: +0.08, pathChange: +0.12, description: "Reduces chaos risk but increases authoritarian control" }},
    { id: '2', text: "Advocate for gradual safety regulations", impact: { pDoomChange: -0.02, dystopiaChange: +0.02, pathChange: +0.03, description: "Moderate approach with balanced risks" }},
    { id: '3', text: "Support accelerated AI development with safety oversight", impact: { pDoomChange: +0.04, dystopiaChange: -0.01, pathChange: -0.05, description: "Higher chaos risk but maintains freedom" }},
    { id: '4', text: "Remain neutral and observe", impact: { pDoomChange: +0.01, dystopiaChange: 0, pathChange: 0, description: "Maintains current position but loses influence" }}
  ],
  onChoiceSelect,
  onChoice,
  onReset,
  gameState,
  visible = true 
}: ScenarioViewerProps) {
  
  if (!visible) return null;

  return (
    <ScenarioContainer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <ScenarioTitle>{title}</ScenarioTitle>
      <ScenarioText>{description}</ScenarioText>
      
      <ChoicesContainer>
        {choices.map((choice, index) => (
          <ChoiceButton
            key={choice.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
            onClick={() => {
              onChoiceSelect?.(choice);
              if (choice.impact && onChoice) {
                onChoice({
                  pDoomChange: choice.impact.pDoomChange,
                  dystopiaChange: choice.impact.dystopiaChange,
                  pathChange: choice.impact.pathChange
                });
              }
            }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {choice.text}
          </ChoiceButton>
        ))}
      </ChoicesContainer>
    </ScenarioContainer>
  );
} 