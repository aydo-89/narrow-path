import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoadingContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f172a 100%);
  z-index: 1000;
`;

const LoadingText = styled(motion.h2)`
  color: #f8fafc;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  font-weight: 500;
`;

const LoadingBar = styled.div`
  width: 300px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
`;

const LoadingProgress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #f59e0b, #f97316);
  border-radius: 2px;
`;

interface LoadingScreenProps {
  progress?: number;
  message?: string;
}

export function LoadingScreen({ progress = 0, message = "Loading The Narrow Path..." }: LoadingScreenProps) {
  return (
    <LoadingContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LoadingText
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {message}
      </LoadingText>
      
      <LoadingBar>
        <LoadingProgress
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </LoadingBar>
    </LoadingContainer>
  );
} 