"use client";
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Mask,
  useMask,
  Float,
  Environment,
  OrbitControls,
  MeshDistortMaterial,
  ContactShadows,
  useGLTF,
} from "@react-three/drei";
import { useControls } from "leva";
import { Group } from "three";

interface MaskedContentProps {
  invert?: boolean;
}

const MaskedContent: React.FC<MaskedContentProps> = ({ invert, ...props }) => {
  const stencil = useMask(1, invert);
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime / 2;
    }
  });

  return (
    <group {...props}>
      <mesh position={[-0.75, 0, 0]} scale={1} ref={group}>
        <torusKnotGeometry args={[0.6, 0.2, 128, 64]} />
        <meshNormalMaterial {...stencil} />
      </mesh>
      <mesh
        position={[0.75, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          {...stencil}
          color={hovered ? "orange" : "white"}
        />
      </mesh>
    </group>
  );
};

interface TargetProps {
  position?: [number, number, number];
  scale?: number;
}

const Target: React.FC<TargetProps> = (props) => {
  const { scene } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.gltf"
  );
  return <primitive object={scene} {...props} />;
};

const TargetModel: React.FC = () => {
  const { invert, colorWrite, depthWrite } = useControls({
    invert: false,
    colorWrite: true,
    depthWrite: false,
  });

  return (
    <Canvas camera={{ position: [0, 1, 6], fov: 50 }}>
      <directionalLight intensity={1.5} position={[2, 2, 5]} />
      <Suspense fallback={null}>
        <Float floatIntensity={2} rotationIntensity={1} speed={5}>
          <Mask
            id={1}
            colorWrite={colorWrite}
            depthWrite={depthWrite}
            position={[-1.1, 0, 0]}
          >
            <ringGeometry args={[0.5, 1, 64]} />
          </Mask>
        </Float>

        <MaskedContent invert={invert} />
        <Target position={[0, -1, -2]} scale={1.2} />
        <ContactShadows
          frames={1}
          scale={8}
          position={[0, -1, 0]}
          blur={6}
          opacity={0.45}
        />
        <Environment preset="sunset" />
        <OrbitControls
          makeDefault
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Suspense>
    </Canvas>
  );
};

export default TargetModel;
