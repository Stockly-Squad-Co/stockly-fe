"use client";
import * as THREE from "three";
import { useRef, useState, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, OrbitControls, Text } from "@react-three/drei";
import { randomWords } from "@/lib/data";

function generate(): string {
  return randomWords[Math.floor(Math.random() * randomWords.length)];
}

type WordProps = {
  children: React.ReactNode;
  position: THREE.Vector3;
};

function Word({ children, position }: WordProps) {
  const color = new THREE.Color();
  const fontProps = {
    font: "/Inter-Bold.woff",
    fontSize: 2.5,
    letterSpacing: -0.05,
    lineHeight: 1,
    "material-toneMapped": false,
  };
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const over = (e: THREE.Event) => {
    // @ts-expect-error another random shit
    e.stopPropagation();
    setHovered(true);
  };
  const out = () => setHovered(false);

  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  useFrame(() => {
    if (!ref.current) return;
    // @ts-expect-error some random shit
    ref.current.material.color.lerp(
      color.set(hovered ? "#fa2720" : "#6f6f6f"),
      0.1
    );
  });

  return (
    <Billboard position={position}>
      <Text
        ref={ref}
        onPointerOver={over}
        onPointerOut={out}
        onClick={() => console.log(`Clicked on: ${children}`)}
        {...fontProps}
      >
        {children}
      </Text>
    </Billboard>
  );
}

type CloudProps = {
  count?: number;
  radius?: number;
};

function Cloud({ count = 4, radius = 20 }: CloudProps) {
  const words = useMemo(() => {
    const temp: [THREE.Vector3, string][] = [];
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI / (count + 1);
    const thetaSpan = (Math.PI * 2) / count;

    for (let i = 1; i < count + 1; i++) {
      for (let j = 0; j < count; j++) {
        temp.push([
          new THREE.Vector3().setFromSpherical(
            spherical.set(radius, phiSpan * i, thetaSpan * j)
          ),
          generate(),
        ]);
      }
    }

    return temp;
  }, [count, radius]);

  return (
    <>
      {words.map(([pos, word], index) => (
        <Word key={index} position={pos}>
          {word}
        </Word>
      ))}
    </>
  );
}

const WordComp = () => {
  // Ref to the group to control its rotation
  const groupRef = useRef<THREE.Group>(null);

  // Rotate the group slowly
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      // groupRef.current.rotation.x += 0.001;
    }
  });

  return (
    // @ts-ignore
    <group ref={groupRef} rotation={[10, 10.5, 10]}>
      <Cloud count={8} radius={20} />
      {/* @ts-ignore */}
    </group>
  );
};

const Word3D = () => {
  return (
    <div className="md:size-[40rem] size-[28rem] mx-auto">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
        {/* @ts-ignore */}
        <fog attach="fog" args={["#202025", 0, 100]} />
        <Suspense fallback={null}>
          <WordComp />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default Word3D;
