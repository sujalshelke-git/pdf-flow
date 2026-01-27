import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

interface PenguinProps {
  position: [number, number, number];
  isWalking: boolean;
  isFacingUser: boolean;
  isJumping: boolean;
}

const Penguin = ({ position, isWalking, isFacingUser, isJumping }: PenguinProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Mesh>(null);
  const rightWingRef = useRef<THREE.Mesh>(null);
  const leftFootRef = useRef<THREE.Mesh>(null);
  const rightFootRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const jumpStartTime = useRef(0);
  const targetRotationY = useRef(0);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    // Handle rotation towards user
    if (isFacingUser) {
      targetRotationY.current = 0; // Face forward (towards user)
    } else if (isWalking) {
      targetRotationY.current = -Math.PI / 2; // Face right (walking direction)
    }

    // Smooth rotation interpolation
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationY.current,
      0.1
    );

    // Jump animation
    if (isJumping) {
      if (jumpStartTime.current === 0) {
        jumpStartTime.current = time;
      }
      const jumpProgress = (time - jumpStartTime.current) * 4;
      const jumpHeight = Math.sin(jumpProgress * Math.PI) * 0.6;
      
      groupRef.current.position.y = position[1] + Math.max(0, jumpHeight);
      
      // Flap wings during jump
      if (leftWingRef.current && rightWingRef.current) {
        const flapAngle = Math.sin(time * 25) * 0.6;
        leftWingRef.current.rotation.z = -0.3 - Math.abs(flapAngle);
        rightWingRef.current.rotation.z = 0.3 + Math.abs(flapAngle);
      }
    } else {
      jumpStartTime.current = 0;

      if (isWalking) {
        // Realistic penguin waddle
        const waddleSpeed = 6;
        const waddleAmount = 0.15;
        const bobAmount = 0.08;
        const tiltAmount = 0.12;

        // Side-to-side waddle (body rotation)
        groupRef.current.rotation.z = Math.sin(time * waddleSpeed) * waddleAmount;
        
        // Up and down bob (synced with steps)
        groupRef.current.position.y = position[1] + Math.abs(Math.sin(time * waddleSpeed)) * bobAmount;
        
        // Slight forward/back tilt
        groupRef.current.rotation.x = Math.sin(time * waddleSpeed * 2) * 0.05;

        // Feet animation - alternating steps
        if (leftFootRef.current && rightFootRef.current) {
          const stepPhase = Math.sin(time * waddleSpeed);
          leftFootRef.current.position.z = 0.1 + Math.max(0, stepPhase) * 0.1;
          leftFootRef.current.position.y = -0.55 + Math.max(0, stepPhase) * 0.05;
          rightFootRef.current.position.z = 0.1 + Math.max(0, -stepPhase) * 0.1;
          rightFootRef.current.position.y = -0.55 + Math.max(0, -stepPhase) * 0.05;
        }

        // Subtle wing swing while walking
        if (leftWingRef.current && rightWingRef.current) {
          const wingSwing = Math.sin(time * waddleSpeed) * 0.15;
          leftWingRef.current.rotation.z = -0.3 + wingSwing;
          rightWingRef.current.rotation.z = 0.3 - wingSwing;
        }
      } else {
        // Idle animation - subtle breathing and looking around
        groupRef.current.position.y = position[1] + Math.sin(time * 2) * 0.02;
        groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.03;
        groupRef.current.rotation.x = 0;

        // Reset feet
        if (leftFootRef.current && rightFootRef.current) {
          leftFootRef.current.position.z = 0.1;
          leftFootRef.current.position.y = -0.55;
          rightFootRef.current.position.z = 0.1;
          rightFootRef.current.position.y = -0.55;
        }

        // Subtle wing movement
        if (leftWingRef.current && rightWingRef.current) {
          leftWingRef.current.rotation.z = -0.3;
          rightWingRef.current.rotation.z = 0.3;
        }
      }
    }
  });

  return (
    <group ref={groupRef} position={position} scale={0.7}>
      {/* Body */}
      <mesh ref={bodyRef} position={[0, 0, 0]}>
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
      <mesh ref={leftWingRef} position={[-0.4, 0, 0]} rotation={[0, 0, -0.3]}>
        <capsuleGeometry args={[0.1, 0.35, 4, 8]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      
      {/* Right Wing */}
      <mesh ref={rightWingRef} position={[0.4, 0, 0]} rotation={[0, 0, 0.3]}>
        <capsuleGeometry args={[0.1, 0.35, 4, 8]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      
      {/* Left Foot */}
      <mesh ref={leftFootRef} position={[-0.12, -0.55, 0.1]} rotation={[0.5, 0, 0]}>
        <boxGeometry args={[0.12, 0.05, 0.2]} />
        <meshStandardMaterial color="#ff9500" />
      </mesh>
      
      {/* Right Foot */}
      <mesh ref={rightFootRef} position={[0.12, -0.55, 0.1]} rotation={[0.5, 0, 0]}>
        <boxGeometry args={[0.12, 0.05, 0.2]} />
        <meshStandardMaterial color="#ff9500" />
      </mesh>
    </group>
  );
};

const RoamingPenguin = () => {
  const [positionX, setPositionX] = useState(-150);
  const [isWalking, setIsWalking] = useState(true);
  const [isFacingUser, setIsFacingUser] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const positionY = typeof window !== 'undefined' ? window.innerHeight - 200 : 500;

  const handleClick = () => {
    if (!isJumping) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 500);
    }
  };

  useEffect(() => {
    const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 - 70 : 500;
    const rightEdge = typeof window !== 'undefined' ? window.innerWidth + 150 : 1500;
    const speed = 2;
    let isPaused = false;
    let pauseTimeout: NodeJS.Timeout | null = null;

    const interval = setInterval(() => {
      if (isPaused) return;

      setPositionX((prev) => {
        const newX = prev + speed;

        // Check if penguin reached center
        if (prev < centerX && newX >= centerX && !isPaused) {
          isPaused = true;
          setIsWalking(false);
          setIsFacingUser(true);

          // Resume after 3-4 seconds
          pauseTimeout = setTimeout(() => {
            setIsFacingUser(false);
            setIsWalking(true);
            isPaused = false;
          }, 3500);

          return centerX;
        }

        // Reset when penguin exits right side
        if (newX > rightEdge) {
          return -150;
        }

        return newX;
      });
    }, 16);

    return () => {
      clearInterval(interval);
      if (pauseTimeout) clearTimeout(pauseTimeout);
    };
  }, []);

  return (
    <div
      className="fixed z-50 cursor-pointer"
      onClick={handleClick}
      style={{
        left: positionX,
        top: positionY,
        width: 140,
        height: 180,
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
        <Penguin 
          position={[0, -0.3, 0]} 
          isWalking={isWalking} 
          isFacingUser={isFacingUser}
          isJumping={isJumping} 
        />
      </Canvas>
    </div>
  );
};

export default RoamingPenguin;
