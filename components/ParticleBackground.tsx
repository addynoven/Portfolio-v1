"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle settings - MORE particles, MORE visible
    const particleCount = 250;
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];
    const originalPositions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    // Accent color (green)
    const accentColor = new THREE.Color(0x22c55e);
    const secondaryColor = new THREE.Color(0x16a34a);

    // Initialize particles in interesting patterns
    for (let i = 0; i < particleCount; i++) {
      // Create spiral/orbital pattern
      const angle = (i / particleCount) * Math.PI * 8;
      const radius = 30 + (i / particleCount) * 80;
      
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 40;
      const y = Math.sin(angle) * (radius * 0.5) + (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 50;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      velocities.push({
        x: (Math.random() - 0.5) * 0.3,
        y: (Math.random() - 0.5) * 0.3,
        z: (Math.random() - 0.5) * 0.1,
      });

      // Varying sizes - some big, some small
      sizes[i] = 1.5 + Math.random() * 3;

      // Gradient from accent to secondary
      const t = Math.random();
      colors[i * 3] = accentColor.r * (1 - t) + secondaryColor.r * t;
      colors[i * 3 + 1] = accentColor.g * (1 - t) + secondaryColor.g * t;
      colors[i * 3 + 2] = accentColor.b * (1 - t) + secondaryColor.b * t;
    }

    // Particle geometry with custom sizes
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Custom shader for glowing particles
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vSize;
        uniform float time;
        
        void main() {
          vColor = color;
          vSize = size;
          
          vec3 pos = position;
          pos.x += sin(time * 0.5 + position.y * 0.05) * 2.0;
          pos.y += cos(time * 0.3 + position.x * 0.05) * 2.0;
          pos.z += sin(time * 0.4 + position.x * 0.03) * 1.0;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vSize;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          // Glow effect
          float glow = 1.0 - (dist * 2.0);
          glow = pow(glow, 1.5);
          
          vec3 finalColor = vColor * glow;
          gl_FragColor = vec4(finalColor, glow * 0.9);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Floating rings
    const ringGeometry = new THREE.TorusGeometry(60, 0.3, 8, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({ 
      color: accentColor, 
      transparent: true, 
      opacity: 0.15 
    });
    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(80, 0.2, 8, 100), 
      ringMaterial.clone()
    );
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 6;
    scene.add(ring2);

    // Mouse tracking with smooth follow
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let time = 0;
    let animationId: number;
    
    const animate = () => {
      time += 0.016;

      // Smooth mouse follow
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Update shader uniforms
      (material.uniforms.time as { value: number }).value = time;

      // Rotate particle system based on mouse
      particleSystem.rotation.y = mouseRef.current.x * 0.3;
      particleSystem.rotation.x = mouseRef.current.y * 0.2;

      // Slowly rotate rings
      ring1.rotation.z += 0.002;
      ring2.rotation.z -= 0.001;
      ring1.rotation.y = mouseRef.current.x * 0.1;
      ring2.rotation.y = -mouseRef.current.x * 0.1;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      renderer.dispose();
    };
  }, [isClient]);

  if (!isClient) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 overflow-hidden"
    />
  );
};

export default ParticleBackground;
