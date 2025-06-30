import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface PDoomGaugeProps {
  pDoomValue?: number; // 0-100 representing percentage
  riskLevel?: 'safe' | 'caution' | 'danger' | 'catastrophe';
}

export function PDoomGauge({ pDoomValue = 15, riskLevel = 'caution' }: PDoomGaugeProps) {
  const gaugeRef = useRef<THREE.Group>(null);
  const fillRef = useRef<THREE.Mesh>(null);
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
  
  // Calculate fill height based on P(doom) value
  const fillHeight = Math.max(0.1, (pDoomValue / 100) * 2); // Min height for visibility
  
  // Animate the gauge
  useFrame((state, delta) => {
    setTime(time + delta);
    
    // Gentle breathing animation
    if (gaugeRef.current) {
      gaugeRef.current.scale.setScalar(1 + Math.sin(time * 1.5) * 0.02);
    }
    
    // Pulsing fill effect
    if (fillRef.current && fillRef.current.material) {
      const material = fillRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.7 + Math.sin(time * 3) * 0.1;
    }
    
    // Particle swirl
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.5;
    }
  });
  
  // Create particle geometry for ambient effects
  const particleCount = 50;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const radius = 1.8 + Math.random() * 0.3;
    const theta = (i / particleCount) * Math.PI * 2;
    const phi = Math.random() * Math.PI * 2;
    positions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
    positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi) - 1;
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }
  
  return (
    <group ref={gaugeRef} position={[0, 0, 0]}>
      {/* Ambient particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={particleCount}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.015} 
          color={currentColor} 
          transparent 
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Gauge container/background */}
      <RoundedBox 
        args={[1.2, 2.2, 0.15]} 
        radius={0.1}
        position={[0, 0, 0]}
      >
        <meshBasicMaterial 
          color="#0f172a" 
          transparent 
          opacity={0.8}
        />
      </RoundedBox>
      
      {/* Gauge border */}
      <RoundedBox 
        args={[1.25, 2.25, 0.12]} 
        radius={0.1}
        position={[0, 0, -0.01]}
      >
        <meshBasicMaterial 
          color={currentColor} 
          transparent 
          opacity={0.3}
        />
      </RoundedBox>
      
      {/* Risk zone indicators */}
      {[
        { level: 'SAFE', color: '#10b981', position: -0.75, threshold: 25 },
        { level: 'CAUTION', color: '#f59e0b', position: -0.25, threshold: 50 },
        { level: 'DANGER', color: '#f97316', position: 0.25, threshold: 75 },
        { level: 'CRITICAL', color: '#ef4444', position: 0.75, threshold: 100 },
      ].map((zone, i) => (
        <group key={i}>
          {/* Zone line */}
          <RoundedBox 
            args={[1.0, 0.02, 0.02]} 
            position={[0, zone.position, 0.08]}
          >
            <meshBasicMaterial color={zone.color} opacity={0.6} transparent />
          </RoundedBox>
          
          {/* Zone label */}
          <Text
            position={[0.8, zone.position, 0.08]}
            fontSize={0.06}
            color={zone.color}
            anchorX="left"
            anchorY="middle"
          >
            {zone.level}
          </Text>
        </group>
      ))}
      
      {/* Fill indicator */}
      <RoundedBox 
        ref={fillRef}
        args={[1.0, fillHeight, 0.1]} 
        radius={0.05}
        position={[0, -1 + fillHeight/2, 0.02]}
      >
        <meshBasicMaterial 
          color={currentColor} 
          transparent 
          opacity={0.7}
        />
      </RoundedBox>
      
      {/* Glow effect around fill */}
      <Sphere 
        args={[0.8, 32, 32]} 
        position={[0, -1 + fillHeight/2, 0]}
        scale={[1, fillHeight/2 + 0.5, 1]}
      >
        <meshBasicMaterial 
          color={currentColor}
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* P(doom) value display */}
      <Text
        position={[0, -1.4, 0.1]}
        fontSize={0.14}
        color={currentColor}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        P(doom): {pDoomValue}%
      </Text>
      
      {/* Risk level indicator */}
      <Text
        position={[0, -1.6, 0.1]}
        fontSize={0.08}
        color={currentColor}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Medium.woff"
      >
        {riskLevel.toUpperCase()} RISK
      </Text>
      
      {/* Title */}
      <Text
        position={[0, 1.4, 0.1]}
        fontSize={0.1}
        color="#f8fafc"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Medium.woff"
      >
        AI RISK ASSESSMENT
      </Text>
    </group>
  );
} 