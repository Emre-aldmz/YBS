"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Stars } from "@react-three/drei";
import { OlapCube } from "./OlapCube";
import type { CubeNode } from "@/types";

interface SceneProps {
  nodes: CubeNode[];
  onHoverNode: (node: CubeNode | null) => void;
}

export function Scene({ nodes, onHoverNode }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [5, 5, 5], fov: 45 }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
    >
      <ambientLight intensity={0.7} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#E3000B" />
      
      <Environment preset="city" />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      
      <group position={[0, 0, 0]}>
        <OlapCube nodes={nodes} onHoverNode={onHoverNode} />
      </group>
      
      <ContactShadows 
        position={[0, -2, 0]} 
        opacity={0.5} 
        scale={10} 
        blur={2.5} 
        far={4} 
        resolution={256} 
        color="#E3000B" 
      />
      
      <OrbitControls 
        enablePan={false}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.5}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}
