import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Circle, Sphere, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface PDoomGaugeProps {
  pDoomValue?: number; // 0-100 representing percentage
  riskLevel?: 'safe' | 'caution' | 'danger' | 'catastrophe';
}

export function PDoomClock({ pDoomValue = 15, riskLevel = 'caution' }: PDoomGaugeProps) {
  const clockRef = useRef<THREE.Group>(null);
  const handRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  // Animation state
  const [time, setTime] = useState(0);
  
  // Color mapping for risk levels
  const riskColors = {
    safe: '#10b981',        // Green
    caution: '#f59e0b',     // Yellow/Amber  
    danger: '#f97316',      // Orange
    catastrophe: '#ef4444', // Red
  };
  
  const currentColor = riskColors[riskLevel];
  
  // Convert p(doom) percentage to clock angle (0-360 degrees)
  const clockAngle = (pDoomValue / 100) * 360;
  const handRotation = (clockAngle * Math.PI) / 180;
  
  // Animate the clock
  useFrame((state, delta) => {
    setTime(time + delta);
    
    // Gentle rotation of the entire clock
    if (clockRef.current) {
      clockRef.current.rotation.z = Math.sin(time * 0.2) * 0.05;
    }
    
    // Animated hand movement
    if (handRef.current) {
      handRef.current.rotation.z = handRotation + Math.sin(time * 2) * 0.02;
    }
    
    // Particle animation
    if (particlesRef.current) {
      particlesRef.current.rotation.z += delta * 0.1;
    }
  });
  
  // Create particle geometry for effects
  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const radius = 1.5 + Math.random() * 0.5;
    const angle = (i / particleCount) * Math.PI * 2;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = Math.sin(angle) * radius;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
  }
  
  return (
    <group ref={clockRef} position={[0, 0, 0]}>
      {/* Particle ring effect */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={particleCount}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.02} 
          color={currentColor} 
          transparent 
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Clock face */}
      <Circle args={[1.2, 64]} rotation={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#1a1a2e" 
          transparent 
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </Circle>
      
      {/* Clock border */}
      <Circle args={[1.25, 64]} rotation={[0, 0, 0]}>
        <meshBasicMaterial 
          color={currentColor} 
          transparent 
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </Circle>
      
      {/* Hour markers */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x = Math.cos(angle) * 1.0;
        const y = Math.sin(angle) * 1.0;
        return (
          <group key={i} position={[x, y, 0.01]}>
            <Circle args={[0.03, 8]}>
              <meshBasicMaterial color={currentColor} />
            </Circle>
          </group>
        );
      })}
      
      {/* Clock hand */}
      <group ref={handRef}>
        <mesh position={[0, 0.4, 0.02]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.02, 0.8, 0.01]} />
          <meshBasicMaterial color={currentColor} />
        </mesh>
        
        {/* Hand center dot */}
        <Circle args={[0.05, 16]} position={[0, 0, 0.02]}>
          <meshBasicMaterial color={currentColor} />
        </Circle>
      </group>
      
      {/* P(Doom) text display */}
      <Text
        position={[0, -0.6, 0.01]}
        fontSize={0.12}
        color={currentColor}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        P(Doom): {pDoomValue}%
      </Text>
      
      {/* Risk level indicator */}
      <Text
        position={[0, -0.8, 0.01]}
        fontSize={0.08}
        color={currentColor}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Medium.woff"
      >
        {riskLevel.toUpperCase()}
      </Text>
      
      {/* Glow effect */}
      <Sphere args={[1.4, 32, 32]} position={[0, 0, -0.05]}>
        <meshBasicMaterial 
          color={currentColor}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
} 