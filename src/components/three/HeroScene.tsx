'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying float vNoise;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + .1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i+vec3(0,0,0)),hash(i+vec3(1,0,0)),f.x),
          mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
      mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),
          mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);
  }

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    float n = noise(position * 2.2 + uTime * 0.35);
    vNoise = n;
    vec3 displaced = position + normal * n * 0.2;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying float vNoise;

  void main() {
    float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
    vec3 col = mix(uColorA, uColorB, vNoise + sin(uTime * 0.5) * 0.3);
    col = mix(col, vec3(1.0), fresnel * 0.55);
    float alpha = 0.2 + fresnel * 0.55 + vNoise * 0.12;
    gl_FragColor = vec4(col, alpha);
  }
`;

function EnergySphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColorA: { value: new THREE.Color('#00F5FF') },
    uColorB: { value: new THREE.Color('#7C4DFF') },
  }), []);

  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.11;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.07) * 0.14;
    }
  });

  return (
    <mesh ref={meshRef} position={[3.4, 0.2, -1]}>
      <icosahedronGeometry args={[1.15, 6]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function ParticleField({ count = 1800 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 11 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const cyan = Math.random() > 0.45;
      col[i * 3]     = cyan ? 0.0  : 0.49;
      col[i * 3 + 1] = cyan ? 0.96 : 0.30;
      col[i * 3 + 2] = 1.0;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.011 + mouse.x * 0.04;
    ref.current.rotation.x = clock.getElapsedTime() * 0.007 + mouse.y * 0.025;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.055} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  const nodes = useMemo(() =>
    Array.from({ length: 18 }, () => ({
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 7,
      z: (Math.random() - 0.5) * 4 - 2,
    })), []);

  const lines = useMemo(() => {
    const res: [number, number][] = [];
    nodes.forEach((_, i) => nodes.forEach((_, j) => {
      if (i < j && Math.random() > 0.65) res.push([i, j]);
    }));
    return res;
  }, [nodes]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.035 + mouse.x * 0.07;
    groupRef.current.rotation.x = mouse.y * 0.045;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((n, i) => (
        <mesh key={i} position={[n.x, n.y, n.z]}>
          <sphereGeometry args={[0.055, 8, 8]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#00F5FF' : '#7C4DFF'}
            emissive={i % 2 === 0 ? '#00F5FF' : '#7C4DFF'}
            emissiveIntensity={1.0}
            transparent opacity={0.75}
          />
        </mesh>
      ))}
      {lines.map(([a, b], i) => {
        const s = new THREE.Vector3(nodes[a].x, nodes[a].y, nodes[a].z);
        const e = new THREE.Vector3(nodes[b].x, nodes[b].y, nodes[b].z);
        const mid = s.clone().lerp(e, 0.5);
        const len = s.distanceTo(e);
        const q = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3().subVectors(e, s).normalize()
        );
        return (
          <mesh key={i} position={mid} quaternion={q}>
            <cylinderGeometry args={[0.003, 0.003, len, 4]} />
            <meshStandardMaterial color="#00F5FF" emissive="#00F5FF" emissiveIntensity={0.6} transparent opacity={0.16} />
          </mesh>
        );
      })}
    </group>
  );
}

function GlowRings() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (r1.current) { r1.current.rotation.x = t * 0.17 + mouse.y * 0.1; r1.current.rotation.y = t * 0.13 + mouse.x * 0.07; }
    if (r2.current) { r2.current.rotation.x = -t * 0.12 + mouse.y * 0.08; r2.current.rotation.z = t * 0.09; }
    if (r3.current) { r3.current.rotation.y = t * 0.2; r3.current.rotation.x = -t * 0.08; }
  });

  return (
    <group position={[3.4, 0.2, -1]}>
      <mesh ref={r1}><torusGeometry args={[1.95, 0.013, 16, 100]} /><meshStandardMaterial color="#00F5FF" emissive="#00F5FF" emissiveIntensity={1.4} transparent opacity={0.55} /></mesh>
      <mesh ref={r2}><torusGeometry args={[2.7, 0.008, 16, 100]} /><meshStandardMaterial color="#7C4DFF" emissive="#7C4DFF" emissiveIntensity={1.1} transparent opacity={0.32} /></mesh>
      <mesh ref={r3}><torusGeometry args={[1.3, 0.018, 16, 100]} /><meshStandardMaterial color="#A855F7" emissive="#A855F7" emissiveIntensity={1.0} transparent opacity={0.4} /></mesh>
    </group>
  );
}

function FloatingGeo() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (r1.current) { r1.current.rotation.x = t * 0.28; r1.current.rotation.y = t * 0.38; r1.current.position.y = -2 + Math.sin(t * 0.6) * 0.3; }
    if (r2.current) { r2.current.rotation.x = -t * 0.22; r2.current.rotation.z = t * 0.32; r2.current.position.y = 1.5 + Math.cos(t * 0.5) * 0.28; }
    if (r3.current) { r3.current.rotation.y = t * 0.18; r3.current.rotation.x = t * 0.14; }
  });

  return (
    <>
      <mesh ref={r1} position={[-4.2, -2, -2]}>
        <octahedronGeometry args={[0.52, 0]} />
        <meshStandardMaterial color="#A855F7" emissive="#A855F7" emissiveIntensity={0.7} wireframe transparent opacity={0.5} />
      </mesh>
      <mesh ref={r2} position={[4.8, 1.5, -3]}>
        <tetrahedronGeometry args={[0.38, 0]} />
        <meshStandardMaterial color="#00F5FF" emissive="#00F5FF" emissiveIntensity={0.8} wireframe transparent opacity={0.4} />
      </mesh>
      <mesh ref={r3} position={[-3.8, 2.2, -4]}>
        <icosahedronGeometry args={[0.32, 1]} />
        <meshStandardMaterial color="#7C4DFF" emissive="#7C4DFF" emissiveIntensity={0.6} wireframe transparent opacity={0.35} />
      </mesh>
    </>
  );
}

function CyberGrid() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) (ref.current.material as THREE.MeshStandardMaterial).opacity = 0.06 + Math.sin(clock.getElapsedTime() * 0.4) * 0.02;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.8, 0]}>
      <planeGeometry args={[32, 32, 32, 32]} />
      <meshStandardMaterial color="#00F5FF" wireframe transparent opacity={0.07} />
    </mesh>
  );
}

function ReactiveLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { mouse, viewport } = useThree();
  useFrame(() => {
    if (!lightRef.current) return;
    lightRef.current.position.x += (mouse.x * viewport.width * 0.5 - lightRef.current.position.x) * 0.08;
    lightRef.current.position.y += (mouse.y * viewport.height * 0.5 - lightRef.current.position.y) * 0.08;
  });
  return (
    <>
      <pointLight ref={lightRef} color="#00F5FF" intensity={2.5} distance={14} position={[0, 0, 4]} />
      <pointLight position={[-5, 4, 2]} color="#7C4DFF" intensity={1.8} distance={12} />
      <pointLight position={[6, -3, 1]} color="#A855F7" intensity={1.2} distance={10} />
      <ambientLight intensity={0.18} />
    </>
  );
}

export default function HeroScene() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 55 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <ReactiveLight />
          <Stars radius={70} depth={50} count={3000} factor={2.5} saturation={0} fade speed={0.4} />
          <ParticleField count={1600} />
          <NeuralNetwork />
          <EnergySphere />
          <GlowRings />
          <FloatingGeo />
          <CyberGrid />
        </Suspense>
      </Canvas>
    </div>
  );
}
