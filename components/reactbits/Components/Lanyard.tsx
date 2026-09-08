/* eslint-disable react/no-unknown-property */
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RigidBodyProps
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  cardContent?: React.ReactNode;
  cardWidth?: number;
  cardHeight?: number;
  cardDepth?: number;
  cardScale?: number;
  htmlScale?: number;
  htmlWidth?: number;
  htmlHeight?: number;
  bandColor?: string;
  stringLength?: number;
}

export default function Lanyard({
  position = [0, -0.4, 7.5],
  gravity = [0, -20, 0],
  fov = 30,
  transparent = true,
  cardContent,
  cardWidth = 2.1,
  cardHeight = 3.15,
  cardDepth = 0.04,
  bandColor = '#00ff99',
  stringLength = 1.8
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = (): void => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative z-10 w-full h-[580px] sm:h-[640px] flex justify-center items-center select-none touch-none">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, antialias: true }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 5]} intensity={2.5} />
        <directionalLight position={[-5, 5, -2]} intensity={1.0} color="#00ff99" />
        <pointLight position={[0, -2, 4]} intensity={1.2} color="#00ff99" />

        <Physics gravity={gravity} timeStep={isMobile ? 1 / 45 : 1 / 60}>
          <Band
            isMobile={isMobile}
            cardContent={cardContent}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            cardDepth={cardDepth}
            bandColor={bandColor}
            stringLength={stringLength}
          />
        </Physics>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  cardContent?: React.ReactNode;
  cardWidth?: number;
  cardHeight?: number;
  cardDepth?: number;
  bandColor?: string;
  stringLength?: number;
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  cardContent,
  cardWidth = 2.1,
  cardHeight = 3.15,
  cardDepth = 0.04,
  bandColor = '#00ff99',
  stringLength = 2.0
}: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: any = {
    type: 'dynamic' as RigidBodyProps['type'],
    canSleep: true,
    colliders: false,
    angularDamping: 2.5,
    linearDamping: 2.0
  };

  const segmentLength = stringLength / 3;

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 2.6 - segmentLength * 3, 0),
        new THREE.Vector3(0, 2.6 - segmentLength * 2, 0),
        new THREE.Vector3(0, 2.6 - segmentLength, 0),
        new THREE.Vector3(0, 2.6, 0)
      ])
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], segmentLength]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], segmentLength]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], segmentLength]);

  // Connect bottom rope joint directly to the top edge of the card
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, cardHeight / 2 + 0.05, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== 'boolean') {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      });
    }

    if (fixed.current && card.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));

      // Realistic damping for rotational momentum
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x * 0.98, y: (ang.y - rot.y * 0.3) * 0.98, z: ang.z * 0.98 });
    }
  });

  curve.curveType = 'chordal';

  // Drei Html default distanceFactor is 10 (400 CSS px = 10 Three units -> 40 px per Three unit).
  // Matching 320 CSS px exactly to cardWidth (2.1 Three units):
  // scale = (cardWidth / 320) * 40 = 0.2625
  const htmlScale = (cardWidth / 320) * 40;

  return (
    <>
      {/* Anchor point at top */}
      <group position={[0, 2.6, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type={'fixed' as RigidBodyProps['type']} />

        <RigidBody position={[0.2, -segmentLength, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.08]} />
        </RigidBody>

        <RigidBody position={[0.4, -segmentLength * 2, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.08]} />
        </RigidBody>

        <RigidBody position={[0.6, -segmentLength * 3, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.08]} />
        </RigidBody>

        {/* 3D Badge Card */}
        <RigidBody
          position={[0.6, -segmentLength * 3 - cardHeight / 2, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? ('kinematicPosition' as RigidBodyProps['type']) : ('dynamic' as RigidBodyProps['type'])}
        >
          <CuboidCollider args={[cardWidth / 2, cardHeight / 2, cardDepth / 2]} />

          <group
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            {/* Dark Acrylic Glass Backing */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[cardWidth, cardHeight, cardDepth]} />
              <meshPhysicalMaterial
                color="#0a0a12"
                roughness={0.15}
                metalness={0.1}
                clearcoat={1.0}
                clearcoatRoughness={0.1}
                reflectivity={0.8}
              />
            </mesh>

            {/* Glowing Neon Green Rim */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[cardWidth + 0.03, cardHeight + 0.03, cardDepth - 0.005]} />
              <meshStandardMaterial
                color="#00ff99"
                emissive="#00ff99"
                emissiveIntensity={0.5}
                roughness={0.2}
              />
            </mesh>

            {/* Top Metallic Lanyard Clamp & Ring */}
            <group position={[0, cardHeight / 2 + 0.07, 0]}>
              {/* Metallic clamp bracket */}
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.32, 0.14, 0.08]} />
                <meshStandardMaterial color="#282830" metalness={0.95} roughness={0.25} />
              </mesh>
              {/* Metallic ring */}
              <mesh position={[0, 0.09, 0]} rotation={[0, 0, 0]}>
                <torusGeometry args={[0.07, 0.02, 16, 32]} />
                <meshStandardMaterial color="#383842" metalness={0.95} roughness={0.2} />
              </mesh>
            </group>

            {/* Embedded HTML Badge Content */}
            {cardContent && (
              <Html
                transform
                center
                pointerEvents="none"
                position={[0, 0, cardDepth / 2 + 0.008]}
                scale={htmlScale}
                style={{
                  width: '320px',
                  height: '480px',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {cardContent}
              </Html>
            )}

            {/* Invisible Pointer Interaction Layer */}
            <mesh position={[0, 0, cardDepth / 2 + 0.02]}>
              <planeGeometry args={[cardWidth + 0.2, cardHeight + 0.2]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
          </group>
        </RigidBody>
      </group>

      {/* 3D Woven Lanyard Strap */}
      <mesh ref={band}>
        {/* @ts-ignore */}
        <meshLineGeometry />
        {/* @ts-ignore */}
        <meshLineMaterial
          color={bandColor}
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
