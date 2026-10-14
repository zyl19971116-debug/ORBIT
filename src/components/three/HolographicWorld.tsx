"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function FloatingIsland({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => { if (ref.current) ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * .65 + position[0]) * .06; });
  return <group ref={ref} position={position} scale={scale}>
    <mesh castShadow><coneGeometry args={[.42, .75, 7]} /><meshStandardMaterial color="#526a57" roughness={.8} /></mesh>
    <mesh position={[0, .39, 0]}><cylinderGeometry args={[.43, .36, .12, 8]} /><meshStandardMaterial color="#54a06f" roughness={.65} /></mesh>
    <mesh position={[0, .58, 0]}><boxGeometry args={[.14, .32, .14]} /><meshStandardMaterial color="#9de5ff" emissive="#208cff" emissiveIntensity={1.8} /></mesh>
    {[[-.22,.51,.1],[.2,.5,-.12] as [number,number,number]].map((p,i)=><mesh key={i} position={p as [number,number,number]}><coneGeometry args={[.08,.25,5]} /><meshStandardMaterial color="#85c977" /></mesh>)}
  </group>;
}

function Planet() {
  const group = useRef<THREE.Group>(null);
  const [paused, setPaused] = useState(false);
  const islandPositions = useMemo(() => Array.from({ length: 18 }, (_, i) => { const phi = Math.acos(-1 + (2 * i) / 18); const theta = Math.sqrt(18 * Math.PI) * phi; return [2.25 * Math.cos(theta) * Math.sin(phi), 2.25 * Math.sin(theta) * Math.sin(phi), 2.25 * Math.cos(phi)] as [number, number, number]; }), []);
  useFrame((_, delta) => { if (group.current && !paused) group.current.rotation.y += delta * .09; });
  return <group ref={group} onClick={() => setPaused(!paused)}>
    <mesh><sphereGeometry args={[2.12, 64, 64]} /><meshPhysicalMaterial color="#245f87" roughness={.54} metalness={.18} emissive="#063c7a" emissiveIntensity={.65} /></mesh>
    <mesh scale={1.035}><sphereGeometry args={[2.12, 64, 64]} /><meshPhysicalMaterial color="#63b9ff" transparent opacity={.16} side={THREE.BackSide} /></mesh>
    <mesh scale={1.08}><sphereGeometry args={[2.12, 64, 64]} /><meshBasicMaterial color="#58baff" wireframe transparent opacity={.08} /></mesh>
    {islandPositions.map((p, i) => <FloatingIsland key={i} position={p} scale={.5 + (i % 4) * .08} />)}
    {[0, 1, 2].map((ring) => <mesh key={ring} rotation={[Math.PI / 2 + ring * .43, ring * .36, 0]}><torusGeometry args={[2.75 + ring * .18, .012, 8, 180]} /><meshBasicMaterial color={ring === 1 ? "#8b7bff" : "#69c8ff"} transparent opacity={.85} /></mesh>)}
    {[0,1,2,3].map((n)=><mesh key={n} position={[Math.cos(n*1.57)*2.9, Math.sin(n*1.57)*.8, Math.sin(n*1.57)*2.2]}><sphereGeometry args={[.08,16,16]} /><meshBasicMaterial color="#d8f2ff" /></mesh>)}
  </group>;
}

export function HolographicWorld() {
  return <Canvas dpr={[1, 1.75]} camera={{ position: [0, .4, 7.4], fov: 44 }} gl={{ antialias: true, alpha: true }}>
    <ambientLight intensity={1.25} /><directionalLight position={[5, 6, 4]} intensity={3.2} color="#d9efff" /><pointLight position={[-4,-2,3]} intensity={16} color="#337dff" />
    <Suspense fallback={null}><Planet /><Stars radius={60} depth={40} count={1800} factor={3} saturation={.7} fade speed={.3} /></Suspense>
    <OrbitControls enablePan={false} minDistance={5.5} maxDistance={9} autoRotate={false} dampingFactor={.04} />
  </Canvas>;
}
