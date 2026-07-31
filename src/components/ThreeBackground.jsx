import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Inside Canvas: Component that handles particle movements and mouse parallax
const ParticleField = () => {
  const starsRef = useRef();
  const heartsRef = useRef();

  // Create random star coordinates (2000 points)
  const starData = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const randomScales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;     // X coordinate
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50; // Y coordinate
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50; // Z coordinate
      randomScales[i] = 0.2 + Math.random() * 0.8;
    }
    return { positions, randomScales };
  }, []);

  // Create heart-shaped particles (500 points)
  const heartData = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Parametric math for heart curve shape in 3D
      const t = Math.random() * Math.PI * 2;
      const scale = 0.15; // overall scale of heart
      
      const x = 16 * Math.pow(Math.sin(t), 3) * scale;
      const y = (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) * scale;
      const z = (Math.random() - 0.5) * 3; // add thickness depth to the heart

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { pointer } = state;

    // Drifting animation for background stars
    if (starsRef.current) {
      starsRef.current.rotation.y = time * 0.02;
      starsRef.current.rotation.x = time * 0.01;
      
      // Mouse movement affects background stars with damping (parallax)
      starsRef.current.rotation.x += (pointer.y * 0.1 - starsRef.current.rotation.x) * 0.05;
      starsRef.current.rotation.y += (pointer.x * 0.1 - starsRef.current.rotation.y) * 0.05;
    }

    // Drifting, floating animation for the central glowing hearts field
    if (heartsRef.current) {
      heartsRef.current.rotation.y = Math.sin(time * 0.1) * 0.2;
      heartsRef.current.rotation.x = Math.cos(time * 0.1) * 0.1;
      heartsRef.current.position.y = Math.sin(time * 0.5) * 0.5;

      // Mouse movements make hearts tilt in 3D
      heartsRef.current.rotation.x += (-pointer.y * 0.15 - heartsRef.current.rotation.x) * 0.08;
      heartsRef.current.rotation.y += (pointer.x * 0.15 - heartsRef.current.rotation.y) * 0.08;
    }
  });

  return (
    <group>
      {/* Background Starry Particles */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starData.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ffffff"
          size={0.06}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.6}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Floating Glowing Heart Particles in Center */}
      <points ref={heartsRef} position={[0, 0, -2]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[heartData, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ff8fa3"
          size={0.12}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.8}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

// Full Screen Three.js Canvas Wrapper
const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-[#050505] pointer-events-none">
      {/* Decorative colored ambient glows underneath canvas */}
      <div className="absolute inset-0 bg-radial-glow-pink opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-glow-purple opacity-20 pointer-events-none translate-x-[20%] translate-y-[20%]" />

      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ powerPreference: "high-performance", antialias: false }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
