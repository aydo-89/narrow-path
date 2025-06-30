import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeProvider } from './contexts/ThemeContext';
import { GlobalStyles } from './styles/GlobalStyles';
import { NarrowPathVisualization } from './components/3d/NarrowPathVisualization';
import { GameUI } from './components/ui/GameUI';
import { ScenarioViewer } from './components/scenarios/ScenarioViewer';
import { LoadingScreen } from './components/ui/LoadingScreen';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: ${props => props.theme.colors.background.primary};
  transition: background ${props => props.theme.animations.duration.normal} ${props => props.theme.animations.easing.easeOut};
`;

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const UIOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none;
  
  > * {
    pointer-events: auto;
  }
`;

// Game state interface
interface GameState {
  pDoom: number;
  dystopiaLevel: number;
  pathPosition: number;
  gamePhase: 'menu' | 'playing' | 'gameOver';
  gameOverReason?: 'doom' | 'dystopia' | 'success';
}

function App() {
  // Game state management
  const [gameState, setGameState] = useState<GameState>({
    pDoom: 0.1, // 10% initial P(doom)
    dystopiaLevel: 0.1, // 10% initial dystopia level
    pathPosition: 0.5, // Start in the middle of the narrow path
    gamePhase: 'menu'
  });

  // Game logic handlers
  const handleChoice = (choiceData: {
    pDoomChange: number;
    dystopiaChange: number;
    pathChange: number;
  }) => {
    setGameState(prev => {
      const newPDoom = Math.max(0, Math.min(1, prev.pDoom + choiceData.pDoomChange));
      const newDystopia = Math.max(0, Math.min(1, prev.dystopiaLevel + choiceData.dystopiaChange));
      const newPosition = Math.max(0, Math.min(1, prev.pathPosition + choiceData.pathChange));

      // Check for game over conditions
      let gamePhase: GameState['gamePhase'] = 'playing';
      let gameOverReason: GameState['gameOverReason'];

      if (newPDoom >= 0.9) {
        gamePhase = 'gameOver';
        gameOverReason = 'doom';
      } else if (newDystopia >= 0.9) {
        gamePhase = 'gameOver';
        gameOverReason = 'dystopia';
      } else if (newPosition <= 0.1 || newPosition >= 0.9) {
        gamePhase = 'gameOver';
        gameOverReason = newPosition <= 0.1 ? 'doom' : 'dystopia';
      }

      return {
        ...prev,
        pDoom: newPDoom,
        dystopiaLevel: newDystopia,
        pathPosition: newPosition,
        gamePhase,
        gameOverReason
      };
    });
  };

  const handleStartScenario = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: 'playing'
    }));
  };

  const handleResetGame = () => {
    setGameState({
      pDoom: 0.1,
      dystopiaLevel: 0.1,
      pathPosition: 0.5,
      gamePhase: 'menu'
    });
  };

  return (
    <ThemeProvider defaultMode="dark" enableSystemDetection={true}>
      <GlobalStyles />
      <Router>
        <AppContainer>
          <CanvasContainer>
            <Canvas
              camera={{ position: [0, 0, 5], fov: 75 }}
              gl={{ 
                antialias: true, 
                alpha: true,
                powerPreference: "high-performance" 
              }}
            >
              <Suspense fallback={null}>
                {/* Lighting */}
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                
                {/* Main 3D Scene */}
                <NarrowPathVisualization 
                  pDoom={gameState.pDoom}
                  dystopiaLevel={gameState.dystopiaLevel}
                  pathPosition={gameState.pathPosition}
                  gamePhase={gameState.gamePhase}
                  gameOverReason={gameState.gameOverReason}
                />
                
                {/* Environment and effects will go here */}
              </Suspense>
            </Canvas>
          </CanvasContainer>
          
          <UIOverlay>
            <Routes>
              <Route 
                path="/" 
                element={
                  <GameUI 
                    pDoomValue={gameState.pDoom}
                    dystopiaLevel={gameState.dystopiaLevel}
                    pathPosition={gameState.pathPosition}
                    onStartScenario={handleStartScenario}
                  />
                } 
              />
              <Route 
                path="/scenario/:id" 
                element={
                  <ScenarioViewer 
                    onChoice={handleChoice}
                    onReset={handleResetGame}
                    gameState={gameState}
                  />
                } 
              />
            </Routes>
          </UIOverlay>
          
          {/* Loading screen for initial app load */}
          <Suspense fallback={<LoadingScreen />}>
            {/* This will be removed once everything loads */}
          </Suspense>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
