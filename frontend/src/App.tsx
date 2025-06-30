import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { NarrowPathVisualization } from './components/3d/NarrowPathVisualization';
import { GameUI } from './components/ui/GameUI';
import { ScenarioViewer } from './components/scenarios/ScenarioViewer';
import { LoadingScreen } from './components/ui/LoadingScreen';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f172a 100%);
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
  // Initialize game state
  const [gameState, setGameState] = useState<GameState>({
    pDoom: 15,
    dystopiaLevel: 20,
    pathPosition: -5,
    gamePhase: 'menu',
  });

  // Handle scenario choices that affect the dual-axis system
  const handleChoice = (impacts: {
    pDoom: number;
    dystopia: number;
    pathPosition: number;
  }) => {
    setGameState(prev => {
      const newPDoom = Math.max(0, Math.min(100, prev.pDoom + impacts.pDoom));
      const newDystopia = Math.max(0, Math.min(100, prev.dystopiaLevel + impacts.dystopia));
      const newPathPosition = Math.max(-50, Math.min(50, prev.pathPosition + impacts.pathPosition));
      
      // Check for game over conditions
      let gamePhase: GameState['gamePhase'] = 'playing';
      let gameOverReason: GameState['gameOverReason'];
      
      if (newPDoom >= 100) {
        gamePhase = 'gameOver';
        gameOverReason = 'doom';
      } else if (newDystopia >= 100) {
        gamePhase = 'gameOver';
        gameOverReason = 'dystopia';
      }
      
      return {
        ...prev,
        pDoom: newPDoom,
        dystopiaLevel: newDystopia,
        pathPosition: newPathPosition,
        gamePhase,
        gameOverReason,
      };
    });
  };

  const handleStartScenario = () => {
    setGameState(prev => ({ ...prev, gamePhase: 'playing' }));
  };

  const handleResetGame = () => {
    setGameState({
      pDoom: 15,
      dystopiaLevel: 20,
      pathPosition: -5,
      gamePhase: 'menu',
    });
  };

  return (
    <ThemeProvider theme={theme}>
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
