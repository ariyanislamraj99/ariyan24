import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

const Cube = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.6;
      meshRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={hovered ? 1.15 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[2.2, 2.2, 2.2]} />
      <meshStandardMaterial
        color={hovered ? "#a78bfa" : "#6d28d9"}
        wireframe
        transparent
        opacity={0.85}
      />
    </mesh>
  );
};

const InnerCube = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x -= delta * 0.6;
      meshRef.current.rotation.y -= delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial
        color="#8b5cf6"
        transparent
        opacity={0.3}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
};

const AboutCube = () => {
  return (
    <div className="w-full h-[280px] md:h-[320px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#a78bfa" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#6d28d9" />
        <Cube />
        <InnerCube />
      </Canvas>
    </div>
  );
};

export default AboutCube;
