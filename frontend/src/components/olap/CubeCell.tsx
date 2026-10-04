"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import * as THREE from "three";
import type { CubeNode } from "@/types";

interface CubeCellProps {
  node: CubeNode;
  onHover: (node: CubeNode | null) => void;
  delay?: number;
}

const STATUS_COLORS = {
  optimal: "#00aaff",   // Electric Blue
  warning: "#f59e0b",   // Amber
  critical: "#f43f5e",  // Rose
};

export function CubeCell({ node, onHover, delay = 0 }: CubeCellProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const baseColor = STATUS_COLORS[node.status];
  const isCritical = node.status === "critical";

  // Pulse effect for critical nodes
  useFrame(({ clock }) => {
    if (isCritical && meshRef.current) {
      const t = clock.getElapsedTime();
      const scale = 1 + Math.sin(t * 8) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
      
      const material = meshRef.current.material as THREE.MeshPhysicalMaterial;
      if (material) {
        const intensity = Math.sin(t * 10) > 0 ? 0.6 : 0.2;
        material.emissiveIntensity = intensity;
      }
    } else if (meshRef.current) {
      meshRef.current.scale.set(1, 1, 1);
      const material = meshRef.current.material as THREE.MeshPhysicalMaterial;
      if (material) {
        material.emissiveIntensity = hovered ? 0.4 : 0;
      }
    }
  });

  const [x, y, z] = node.coordinates;

  return (
    <motion.group
      initial={{ x: x * 3, y, z }}
      animate={{ x, y, z }}
      transition={{
        duration: 1.2,
        delay: 0.2 + delay,
        type: "spring",
        stiffness: 50,
      }}
    >
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(node);
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
        }}
      >
        <boxGeometry args={[0.85, 0.85, 0.85]} />
        <meshPhysicalMaterial
          transparent
          opacity={hovered ? 0.9 : 0.4}
          color={baseColor}
          emissive={baseColor}
          roughness={0.2}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(0.85, 0.85, 0.85)]} />
          <lineBasicMaterial
            color="rgba(255, 255, 255, 0.3)"
            transparent
            opacity={hovered ? 0.8 : 0.2}
          />
        </lineSegments>
      </mesh>
    </motion.group>
  );
}
