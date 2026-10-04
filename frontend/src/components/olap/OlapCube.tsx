"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import { LegoBrick } from "./LegoBrick";
import type { CubeNode } from "@/types";
import * as THREE from "three";

interface OlapCubeProps {
  nodes: CubeNode[];
  onHoverNode: (node: CubeNode | null) => void;
}

export function OlapCube({ nodes, onHoverNode }: OlapCubeProps) {
  const axisOffset = 1.8;
  const tickColor = "rgba(255,255,255,0.15)";
  const labelColor = "#ffffff";
  
  const xGroupRef = useRef<THREE.Group>(null);
  const yGroupRef = useRef<THREE.Group>(null);
  const zGroupRef = useRef<THREE.Group>(null);

  // Helper to update opacity based on view angle to prevent clutter
  const updateGroupOpacity = (group: THREE.Group | null, targetOpacity: number) => {
    if (!group) return;
    group.traverse((child: any) => {
      if (child.material) {
        const mat = child.material;
        const current = mat.opacity;
        const diff = targetOpacity - current;
        if (Math.abs(diff) > 0.001) {
          mat.opacity += diff * 0.1;
          mat.transparent = true;
          mat.needsUpdate = true;
        }
      }
      if (child.isText) {
        child.fillOpacity = targetOpacity;
      }
    });
  };

  useFrame(({ camera }) => {
    const x = Math.abs(camera.position.x);
    const y = Math.abs(camera.position.y);
    const z = Math.abs(camera.position.z);
    const total = x + y + z + 0.0001;

    // View scores based on camera position
    const xScore = z / total; // High when looking at X axis (from Z)
    const zScore = x / total; // High when looking at Z axis (from X)

    const calcOpacity = (score: number) => {
      if (score > 0.45) return 1.0;
      const factor = score / 0.45;
      return 0.02 + factor * factor * 0.98;
    };

    updateGroupOpacity(xGroupRef.current, calcOpacity(xScore));
    updateGroupOpacity(zGroupRef.current, calcOpacity(zScore));
  });

  return (
    <group rotation={[0, Math.PI / 4, 0]}>
      {/* Cells */}
      {nodes.map((node, i) => (
        <LegoBrick 
          key={node.id} 
          node={node} 
          onHover={onHoverNode}
          delay={i * 0.03} 
        />
      ))}

      {/* Y-Axis: Bölge */}
      <group>
        <mesh position={[-axisOffset, 0, axisOffset]}>
          <cylinderGeometry args={[0.01, 0.01, 3.5]} />
          <meshBasicMaterial color={tickColor} transparent opacity={0.3} />
        </mesh>
        <Billboard position={[-axisOffset, 2.3, axisOffset]}>
          <Text fontSize={0.3} color="#00aaff" anchorX="center" anchorY="middle" fontWeight="bold">
            BÖLGE
          </Text>
        </Billboard>
        {[
          { y: -1, label: "APAC" },
          { y: 0, label: "EMEA" },
          { y: 1, label: "Americas" },
        ].map((item) => (
          <group key={item.label} position={[-axisOffset, item.y * 1.05, axisOffset]}>
            <mesh position={[0.1, 0, 0]}>
              <boxGeometry args={[0.2, 0.01, 0.01]} />
              <meshBasicMaterial color={tickColor} transparent opacity={0.3} />
            </mesh>
            <Billboard position={[-0.4, 0, 0]}>
              <Text fontSize={0.25} color={labelColor} anchorX="right" anchorY="middle">
                {item.label}
              </Text>
            </Billboard>
          </group>
        ))}
      </group>

      {/* X-Axis: Zaman */}
      <group ref={xGroupRef}>
        <mesh position={[0, -axisOffset, axisOffset]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.01, 0.01, 3.5]} />
          <meshBasicMaterial color={tickColor} transparent opacity={0.3} />
        </mesh>
        <Billboard position={[0, -axisOffset - 0.8, axisOffset]}>
          <Text fontSize={0.3} color="#00aaff" anchorX="center" anchorY="middle" fontWeight="bold">
            ZAMAN
          </Text>
        </Billboard>
        {[
          { x: -1, label: "2023" },
          { x: 0, label: "2024" },
          { x: 1, label: "2025" },
        ].map((item) => (
          <group key={item.label} position={[item.x * 1.05, -axisOffset, axisOffset]}>
            <mesh position={[0, 0.1, 0]}>
              <boxGeometry args={[0.01, 0.2, 0.01]} />
              <meshBasicMaterial color={tickColor} transparent opacity={0.3} />
            </mesh>
            <Billboard position={[0, -0.35, 0]}>
              <Text fontSize={0.25} color={labelColor} anchorX="center" anchorY="top">
                {item.label}
              </Text>
            </Billboard>
          </group>
        ))}
      </group>

      {/* Z-Axis: Kategori */}
      <group ref={zGroupRef}>
        <mesh position={[axisOffset, -axisOffset, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 3.5]} />
          <meshBasicMaterial color={tickColor} transparent opacity={0.3} />
        </mesh>
        <Billboard position={[axisOffset, -axisOffset - 0.8, 0]}>
          <Text fontSize={0.3} color="#00aaff" anchorX="center" anchorY="middle" fontWeight="bold">
            KATEGORİ
          </Text>
        </Billboard>
        {[
          { z: -1, label: "Dijital & Ürünler" },
          { z: 0, label: "Özgün Temalar" },
          { z: 1, label: "Lisanslı Setler" },
        ].map((item) => (
          <group key={item.label} position={[axisOffset, -axisOffset, item.z * 1.05]}>
            <mesh position={[0, 0.1, 0]}>
              <boxGeometry args={[0.01, 0.2, 0.01]} />
              <meshBasicMaterial color={tickColor} transparent opacity={0.3} />
            </mesh>
            <Billboard position={[0, -0.35, 0]}>
              <Text fontSize={0.25} color={labelColor} anchorX="center" anchorY="top">
                {item.label}
              </Text>
            </Billboard>
          </group>
        ))}
      </group>
    </group>
  );
}
