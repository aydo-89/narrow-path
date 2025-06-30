import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

interface NarrowPathProps {
  pDoom?: number;        // 0-100: Chaos/Decentralization risk
  dystopiaLevel?: number; // 0-100: Centralized control risk
  pathPosition?: number;  // -50 to +50: Current position on narrow path
  gamePhase?: 'menu' | 'playing' | 'gameOver';
  gameOverReason?: 'doom' | 'dystopia' | 'success';
}

export function NarrowPathVisualization({ 
  pDoom = 15, 
  dystopiaLevel = 20, 
  pathPosition = 5, // Slightly towards dystopia
  gamePhase = 'menu',
  gameOverReason
}: NarrowPathProps) {
  const pathRef = useRef<THREE.Group>(null);
  const playerIndicatorRef = useRef<THREE.Mesh>(null);
  const doomZoneRef = useRef<THREE.Mesh>(null);
  const dystopiaZoneRef = useRef<THREE.Mesh>(null);
  
  const [time, setTime] = useState(0);
  
  // Calculate danger levels
  const totalRisk = Math.max(pDoom, dystopiaLevel);
  const isInDangerZone = Math.abs(pathPosition) > 30 || totalRisk > 75;
  const isGameOver = pDoom >= 100 || dystopiaLevel >= 100;
  
  // Color based on current path position and risk
  const getPathColor = () => {
    if (isGameOver) return '#ef4444'; // Red - Game Over
    if (isInDangerZone) return '#f97316'; // Orange - Danger
    if (Math.abs(pathPosition) > 15) return '#f59e0b'; // Yellow - Caution
    return '#10b981'; // Green - Safe
  };
  
  const getBackgroundColor = (side: 'left' | 'right') => {
    if (side === 'left') {
      // Chaos/Doom side - gets redder as P(doom) increases
      const intensity = pDoom / 100;
      return `rgb(${Math.floor(239 * intensity)}, ${Math.floor(68 * (1 - intensity * 0.7))}, ${Math.floor(68 * (1 - intensity * 0.7))})`;
    } else {
      // Dystopia side - gets bluer as dystopia increases  
      const intensity = dystopiaLevel / 100;
      return `rgb(${Math.floor(59 * (1 - intensity * 0.7))}, ${Math.floor(130 * (1 - intensity * 0.5))}, ${Math.floor(246 * intensity)})`;
    }
  };
  
  useFrame((state, delta) => {
    setTime(time + delta);
    
    // Gentle breathing animation
    if (pathRef.current) {
      pathRef.current.scale.setScalar(1 + Math.sin(time * 1.2) * 0.01);
    }
    
    // Player indicator pulsing
    if (playerIndicatorRef.current) {
      const pulseIntensity = isInDangerZone ? 0.15 : 0.05;
      playerIndicatorRef.current.scale.setScalar(1 + Math.sin(time * 4) * pulseIntensity);
    }
    
    // Danger zone effects
    if (doomZoneRef.current && doomZoneRef.current.material) {
      const material = doomZoneRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.1 + (pDoom / 100) * 0.3 + Math.sin(time * 3) * 0.05;
    }
    
    if (dystopiaZoneRef.current && dystopiaZoneRef.current.material) {
      const material = dystopiaZoneRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.1 + (dystopiaLevel / 100) * 0.3 + Math.sin(time * 2.5) * 0.05;
    }
  });
  
  // Calculate player position on the path
  const playerX = (pathPosition / 50) * 2; // Scale to visual range
  
  return (
    <group ref={pathRef} position={[0, 0, 0]}>
      {/* Background danger zones */}
      
      {/* Left side - Chaos/Doom Zone */}
      <RoundedBox 
        ref={doomZoneRef}
        args={[2, 3, 0.1]} 
        radius={0.1}
        position={[-2.5, 0, -0.2]}
      >
        <meshBasicMaterial 
          color={getBackgroundColor('left')}
          transparent 
          opacity={0.2}
        />
      </RoundedBox>
      
      {/* Right side - Dystopia Zone */}
      <RoundedBox 
        ref={dystopiaZoneRef}
        args={[2, 3, 0.1]} 
        radius={0.1}
        position={[2.5, 0, -0.2]}
      >
        <meshBasicMaterial 
          color={getBackgroundColor('right')}
          transparent 
          opacity={0.2}
        />
      </RoundedBox>
      
      {/* The Narrow Path - Center safe zone */}
      <RoundedBox 
        args={[1, 3, 0.05]} 
        radius={0.05}
        position={[0, 0, -0.1]}
      >
        <meshBasicMaterial 
          color={getPathColor()}
          transparent 
          opacity={0.3}
        />
      </RoundedBox>
      
      {/* Path boundaries */}
      <Line
        points={[[-0.5, -1.5, 0], [-0.5, 1.5, 0]]}
        color="#10b981"
        lineWidth={2}
        transparent
        opacity={0.6}
      />
      <Line
        points={[[0.5, -1.5, 0], [0.5, 1.5, 0]]}
        color="#10b981"
        lineWidth={2}
        transparent
        opacity={0.6}
      />
      
      {/* Player position indicator */}
      <Sphere 
        ref={playerIndicatorRef}
        args={[0.08, 16, 16]} 
        position={[playerX, 0, 0.1]}
      >
        <meshBasicMaterial 
          color={getPathColor()}
        />
      </Sphere>
      
      {/* Risk level indicators */}
      
      {/* P(doom) Level - Left side */}
      <group position={[-3.2, 1, 0]}>
        <Text
          fontSize={0.08}
          color="#ef4444"
          anchorX="center"
          anchorY="middle"
        >
          CHAOS/DOOM
        </Text>
        <Text
          position={[0, -0.2, 0]}
          fontSize={0.12}
          color="#ef4444"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
        >
          P(doom): {pDoom}%
        </Text>
        
        {/* Doom risk bar */}
        <RoundedBox 
          args={[0.3, 1.5, 0.02]} 
          radius={0.01}
          position={[0, -0.7, 0]}
        >
          <meshBasicMaterial color="#1a1a2e" transparent opacity={0.8} />
        </RoundedBox>
        <RoundedBox 
          args={[0.25, Math.max(0.1, (pDoom / 100) * 1.5), 0.03]} 
          radius={0.01}
          position={[0, -0.7 - 0.75 + (pDoom / 100) * 0.75, 0.01]}
        >
          <meshBasicMaterial color="#ef4444" transparent opacity={0.8} />
        </RoundedBox>
      </group>
      
      {/* Dystopia Level - Right side */}
      <group position={[3.2, 1, 0]}>
        <Text
          fontSize={0.08}
          color="#3b82f6"
          anchorX="center"
          anchorY="middle"
        >
          DYSTOPIA/CONTROL
        </Text>
        <Text
          position={[0, -0.2, 0]}
          fontSize={0.12}
          color="#3b82f6"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
        >
          Control: {dystopiaLevel}%
        </Text>
        
        {/* Dystopia risk bar */}
        <RoundedBox 
          args={[0.3, 1.5, 0.02]} 
          radius={0.01}
          position={[0, -0.7, 0]}
        >
          <meshBasicMaterial color="#1a1a2e" transparent opacity={0.8} />
        </RoundedBox>
        <RoundedBox 
          args={[0.25, Math.max(0.1, (dystopiaLevel / 100) * 1.5), 0.03]} 
          radius={0.01}
          position={[0, -0.7 - 0.75 + (dystopiaLevel / 100) * 0.75, 0.01]}
        >
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.8} />
        </RoundedBox>
      </group>
      
      {/* Current position indicator */}
      <Text
        position={[0, -1.8, 0]}
        fontSize={0.1}
        color={getPathColor()}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Medium.woff"
      >
        {isGameOver ? 
          (pDoom >= 100 ? "GAME OVER: DOOM" : "GAME OVER: DYSTOPIA") :
          (Math.abs(pathPosition) < 10 ? "ON THE NARROW PATH" : 
           pathPosition < 0 ? "DRIFTING TOWARD CHAOS" : "DRIFTING TOWARD DYSTOPIA")
        }
      </Text>
      
      {/* Path position scale */}
      <Text
        position={[0, -2.1, 0]}
        fontSize={0.07}
        color="rgba(248, 250, 252, 0.6)"
        anchorX="center"
        anchorY="middle"
      >
        Position: {pathPosition > 0 ? '+' : ''}{pathPosition}
      </Text>
      
      {/* Title */}
      <Text
        position={[0, 2, 0]}
        fontSize={0.14}
        color="#f8fafc"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        THE NARROW PATH
      </Text>
      
      {/* Subtitle */}
      <Text
        position={[0, 1.7, 0]}
        fontSize={0.08}
        color="rgba(248, 250, 252, 0.7)"
        anchorX="center"
        anchorY="middle"
      >
        Navigate between chaos and dystopia
      </Text>
    </group>
  );
} 