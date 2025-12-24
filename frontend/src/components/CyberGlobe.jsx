import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

const GlobeMesh = () => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002; // Constant slow rotation
      meshRef.current.rotation.x += 0.001;
    }
  });

  return (
    <Sphere args={[1, 32, 32]} ref={meshRef} scale={2.8}>
      {/* distort: Creates the glitchy/liquid moving effect 
         wireframe: Gives the tactical "grid" look
      */}
      <MeshDistortMaterial
        color="#dc2626" 
        wireframe={true}
        transparent={true}
        opacity={0.15}
        distort={0.4} 
        speed={1.5}
      />
    </Sphere>
  );
};

const CyberGlobe = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <GlobeMesh />
      </Canvas>
      
      {/* CRT Scanline Overlay Effect */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80"></div>
    </div>
  );
};

export default CyberGlobe;