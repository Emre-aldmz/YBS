"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { CubeNode } from "@/types";

interface LegoBrickProps {
  node: CubeNode;
  onHover: (node: CubeNode | null) => void;
  delay?: number;
}

const LEGO_COLORS = {
  optimal: "#00B140",   // LEGO Green
  warning: "#FFD500",   // LEGO Yellow
  critical: "#E3000B",  // LEGO Red
};

export function LegoBrick({ node, onHover, delay = 0 }: LegoBrickProps) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const [hovered, setHovered] = useState(false);

  const baseColor = LEGO_COLORS[node.status];
  const isCritical = node.status === "critical";
  const [x, y, z] = node.coordinates;

  // Grid spacing is 1 unit. We multiply by 1.1 to leave gaps, but 
  // the user said "Tuğlalar arasında çok hafif bir boşluk bırak".
  // We can just keep spacing as 1 and make the brick 0.9.
  const targetPos = new THREE.Vector3(x * 1.05, y * 1.05, z * 1.05);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    
    // Position Animation (Entrance & Hover)
    if (groupRef.current) {
      if (t > delay) {
        // If hovered, lift up the brick slightly in the Y axis
        const hoverOffset = hovered ? 0.15 : 0;
        const currentTarget = new THREE.Vector3(targetPos.x, targetPos.y + hoverOffset, targetPos.z);
        groupRef.current.position.lerp(currentTarget, delta * 8.0);
      } else {
        // Fall down from above
        groupRef.current.position.set(targetPos.x, targetPos.y + 5, targetPos.z);
      }
    }

    // Material Pulse/Hover Animation
    if (materialRef.current) {
      if (isCritical) {
        // Slight color/emissive pulse for critical blocks
        const intensity = Math.sin(t * 5) > 0 ? 0.3 : 0.0;
        materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
          materialRef.current.emissiveIntensity, 
          hovered ? 0.5 : intensity, 
          delta * 5
        );
      } else {
        materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
          materialRef.current.emissiveIntensity, 
          hovered ? 0.4 : 0.0, 
          delta * 5
        );
      }
    }
  });

  // Lego Brick dimensions
  const bw = 0.95; // width
  const bh = 0.6;  // height
  const bd = 0.95; // depth
  const studR = 0.14; // stud radius
  const studH = 0.12; // stud height
  const offset = 0.23;

  return (
    <group ref={groupRef} position={[targetPos.x, targetPos.y + 5, targetPos.z]}>
      <group
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
        {/* Main Body */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[bw, bh, bd]} />
          <meshStandardMaterial
            ref={materialRef}
            color={baseColor}
            emissive={baseColor}
            emissiveIntensity={0}
            roughness={0.1}
            metalness={0.1}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* 4 Studs (Top) */}
        {[
          [-offset, -offset],
          [-offset, offset],
          [offset, -offset],
          [offset, offset],
        ].map(([sx, sz], i) => (
          <mesh key={i} position={[sx, bh / 2 + studH / 2, sz]} castShadow receiveShadow>
            <cylinderGeometry args={[studR, studR, studH, 16]} />
            <meshStandardMaterial
              color={baseColor}
              emissive={baseColor}
              emissiveIntensity={hovered ? 0.4 : (isCritical ? 0.1 : 0)}
              roughness={0.1}
              metalness={0.1}
              envMapIntensity={1.5}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
