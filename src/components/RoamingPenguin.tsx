import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

const Penguin = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [waddle, setWaddle] = useState(0);

  useFrame((state) => {
    if (groupRef.current) {
      // Waddle animation
      setWaddle(Math.sin(state.clock.elapsedTime * 8) * 0.1);
      groupRef.current.rotation.z = waddle;
      
      // Subtle bobbing
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 4) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={0.7}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.35, 0.5, 8, 16]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      
      {/* Belly */}
      <mesh position={[0, -0.05, 0.2]}>
        <capsuleGeometry args={[0.25, 0.35, 8, 16]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 0.55, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      
      {/* Face (white part) */}
      <mesh position={[0, 0.5, 0.15]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
      
      {/* Left Eye */}
      <mesh position={[-0.1, 0.6, 0.25]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Right Eye */}
      <mesh position={[0.1, 0.6, 0.25]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Beak */}
      <mesh position={[0, 0.48, 0.35]} rotation={[0.3, 0, 0]}>
        <coneGeometry args={[0.08, 0.15, 8]} />
        <meshStandardMaterial color="#ff9500" />
      </mesh>
      
      {/* Left Wing */}
      <mesh position={[-0.4, 0, 0]} rotation={[0, 0, -0.3]}>
        <capsuleGeometry args={[0.1, 0.35, 4, 8]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      
      {/* Right Wing */}
      <mesh position={[0.4, 0, 0]} rotation={[0, 0, 0.3]}>
        <capsuleGeometry args={[0.1, 0.35, 4, 8]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      
      {/* Left Foot */}
      <mesh position={[-0.12, -0.55, 0.1]} rotation={[0.5, 0, 0]}>
        <boxGeometry args={[0.12, 0.05, 0.2]} />
        <meshStandardMaterial color="#ff9500" />
      </mesh>
      
      {/* Right Foot */}
      <mesh position={[0.12, -0.55, 0.1]} rotation={[0.5, 0, 0]}>
        <boxGeometry args={[0.12, 0.05, 0.2]} />
        <meshStandardMaterial color="#ff9500" />
      </mesh>
    </group>
  );
};

const RoamingPenguin = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [direction, setDirection] = useState({ x: 1, y: 0.5 });
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const speed = 1.5;
    const interval = setInterval(() => {
      setPosition((prev) => {
        let newX = prev.x + direction.x * speed;
        let newY = prev.y + direction.y * speed;
        let newDirX = direction.x;
        let newDirY = direction.y;

        // Bounce off edges
        if (newX <= 0 || newX >= window.innerWidth - 140) {
          newDirX = -direction.x;
          setIsFlipped(newDirX < 0);
        }
        if (newY <= 0 || newY >= window.innerHeight - 180) {
          newDirY = -direction.y;
        }

        // Random direction changes
        if (Math.random() < 0.005) {
          newDirX = (Math.random() - 0.5) * 2;
          newDirY = (Math.random() - 0.5) * 2;
          const magnitude = Math.sqrt(newDirX * newDirX + newDirY * newDirY);
          newDirX /= magnitude;
          newDirY /= magnitude;
          setIsFlipped(newDirX < 0);
        }

        setDirection({ x: newDirX, y: newDirY });

        return {
          x: Math.max(0, Math.min(window.innerWidth - 140, newX)),
          y: Math.max(0, Math.min(window.innerHeight - 180, newY)),
        };
      });
    }, 16);

    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: position.x,
        top: position.y,
        width: 140,
        height: 180,
        transform: `scaleX(${isFlipped ? -1 : 1})`,
        transition: 'transform 0.3s ease',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <pointLight position={[-2, -1, 2]} intensity={0.5} color="#a855f7" />
        <Penguin position={[0, -0.3, 0]} />
      </Canvas>
    </div>
  );
};

export default RoamingPenguin;
