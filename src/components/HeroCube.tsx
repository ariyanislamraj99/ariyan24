import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

const Cube = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.7;
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={hovered ? 1.2 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1.8, 1.8, 1.8]} />
      <meshStandardMaterial
        color={hovered ? "#a78bfa" : "#6d28d9"}
        wireframe
        transparent
        opacity={0.7}
      />
    </mesh>
  );
};

const HeroCube = () => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 4, 4]} intensity={1} color="#a78bfa" />
        <pointLight position={[-4, -4, -4]} intensity={0.4} color="#6d28d9" />
        <Cube />
      </Canvas>
    </div>
  );
};

export default HeroCube;
