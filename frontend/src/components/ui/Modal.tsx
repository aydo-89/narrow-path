import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  
  will-change: opacity;
  transform: translateZ(0);
`;

const ModalContainer = styled(motion.div)<{ $size: string }>`
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors.glass.border};
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  will-change: transform, opacity;
  transform: translateZ(0);
  
  ${props => {
    switch (props.$size) {
      case 'sm':
        return 'max-width: 400px;';
      case 'md':
        return 'max-width: 500px;';
      case 'lg':
        return 'max-width: 700px;';
      case 'xl':
        return 'max-width: 900px;';
      case 'full':
        return 'max-width: 95vw; max-height: 95vh;';
      default:
        return 'max-width: 500px;';
    }
  }}
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    max-width: 95vw;
    max-height: 85vh;
    margin: 0 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem 1rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 1rem 1.5rem 0.75rem 1.5rem;
  }
`;

const Title = styled.h2`
  font-size: ${props => props.theme.typography.sizes['2xl']};
  font-weight: ${props => props.theme.typography.weights.semibold};
  color: ${props => props.theme.colors.text.primary};
  margin: 0;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.typography.sizes.xl};
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.text.secondary};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: ${props => props.theme.borderRadius.md};
  
  transition-property: background-color, color, transform;
  transition-duration: ${props => props.theme.animations.duration.fast};
  transition-timing-function: ${props => props.theme.animations.easing.easeOut};
  
  will-change: transform;
  transform: translateZ(0);
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${props => props.theme.colors.text.primary};
  }
  
  &:focus {
    outline: 2px solid ${props => props.theme.colors.amberWarning};
    outline-offset: 2px;
  }
  
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const Content = styled.div`
  padding: 1.5rem 2rem 2rem 2rem;
  overflow-y: auto;
  flex: 1;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 1rem 1.5rem 1.5rem 1.5rem;
  }
`;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const modalVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.96,
    y: 8
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0
  },
  exit: { 
    opacity: 0, 
    scale: 0.96,
    y: 8
  }
};

// Close icon SVG component
const CloseIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className
}: ModalProps) {
  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);
  
  // Prevent body scroll when modal is open - optimized to reduce layout shifts
  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);
  
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <Overlay
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleOverlayClick}
        >
          <ModalContainer
            $size={size}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={className}
            onClick={(e) => e.stopPropagation()}
          >
            {(title || showCloseButton) && (
              <Header>
                {title && <Title>{title}</Title>}
                {showCloseButton && (
                  <CloseButton onClick={onClose} aria-label="Close modal">
                    <CloseIcon />
                  </CloseButton>
                )}
              </Header>
            )}
            <Content>{children}</Content>
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
}

// Convenience components for common modal patterns
export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "danger" as const,
  loading = false
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "danger" | "primary" | "success";
  loading?: boolean;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ 
          color: 'rgba(248, 250, 252, 0.8)', 
          lineHeight: '1.6',
          margin: 0
        }}>
          {message}
        </p>
      </div>
      
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        justifyContent: 'flex-end' 
      }}>
        <Button
          variant="ghost"
          onClick={onClose}
          disabled={loading}
        >
          {cancelText}
        </Button>
        <Button
          variant={confirmVariant}
          onClick={onConfirm}
          loading={loading}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}

export type { ModalProps }; 