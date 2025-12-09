"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";

interface RGBDistortionImageProps {
  src: string;
  alt?: string;
  className?: string;
  intensity?: number; // 0-1, controls max effect intensity
  waveFrequency?: number; // Wave frequency for distortion
}

// Vertex shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader with RGB split and wave distortion
const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uScrollVelocity;
  uniform float uIntensity;
  uniform float uWaveFrequency;
  uniform vec2 uResolution;
  
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv;
    
    // Calculate scroll-based distortion
    float velocity = abs(uScrollVelocity) * uIntensity;
    
    // Wave distortion based on scroll velocity
    float wave = sin(uv.y * uWaveFrequency + uTime * 2.0) * velocity * 0.02;
    float wave2 = cos(uv.x * uWaveFrequency * 0.5 + uTime * 1.5) * velocity * 0.015;
    
    // Apply wave distortion to UV
    vec2 distortedUV = uv + vec2(wave, wave2);
    
    // RGB channel split based on velocity
    float rgbSplit = velocity * 0.015;
    
    // Sample each color channel with offset
    float r = texture2D(uTexture, distortedUV + vec2(rgbSplit, 0.0)).r;
    float g = texture2D(uTexture, distortedUV).g;
    float b = texture2D(uTexture, distortedUV - vec2(rgbSplit, 0.0)).b;
    
    // Get original alpha
    float a = texture2D(uTexture, distortedUV).a;
    
    gl_FragColor = vec4(r, g, b, a);
  }
`;

const RGBDistortionImage: React.FC<RGBDistortionImageProps> = ({
  src,
  alt = "",
  className = "",
  intensity = 1.0,
  waveFrequency = 10.0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const animationIdRef = useRef<number | null>(null);
  
  // Scroll tracking
  const lastScrollRef = useRef<number>(0);
  const scrollVelocityRef = useRef<number>(0);
  const targetVelocityRef = useRef<number>(0);
  
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize Three.js scene
  const initScene = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create orthographic camera
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
    camera.position.z = 1;
    cameraRef.current = camera;

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      src,
      (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;

        // Calculate aspect ratio for proper image display
        const imageAspect = texture.image.width / texture.image.height;
        const containerAspect = width / height;

        let scaleX = 1;
        let scaleY = 1;

        if (imageAspect > containerAspect) {
          scaleY = containerAspect / imageAspect;
        } else {
          scaleX = imageAspect / containerAspect;
        }

        // Create shader material
        const material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: {
            uTexture: { value: texture },
            uTime: { value: 0 },
            uScrollVelocity: { value: 0 },
            uIntensity: { value: intensity },
            uWaveFrequency: { value: waveFrequency },
            uResolution: { value: new THREE.Vector2(width, height) },
          },
          transparent: true,
        });
        materialRef.current = material;

        // Create plane geometry
        const geometry = new THREE.PlaneGeometry(scaleX, scaleY);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        setIsLoaded(true);
      },
      undefined,
      (error) => {
        console.error("Error loading texture:", error);
      }
    );
  }, [src, intensity, waveFrequency]);

  // Animation loop
  const animate = useCallback(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current || !materialRef.current) {
      animationIdRef.current = requestAnimationFrame(animate);
      return;
    }

    // Smooth velocity decay
    scrollVelocityRef.current += (targetVelocityRef.current - scrollVelocityRef.current) * 0.1;
    targetVelocityRef.current *= 0.95; // Decay target velocity

    // Update uniforms
    materialRef.current.uniforms.uTime.value += 0.016; // ~60fps
    materialRef.current.uniforms.uScrollVelocity.value = scrollVelocityRef.current;

    // Render
    rendererRef.current.render(sceneRef.current, cameraRef.current);

    animationIdRef.current = requestAnimationFrame(animate);
  }, []);

  // Handle scroll
  const handleScroll = useCallback(() => {
    const currentScroll = window.scrollY;
    const delta = currentScroll - lastScrollRef.current;
    
    // Clamp velocity to reasonable range
    targetVelocityRef.current = Math.max(-5, Math.min(5, delta * 0.5));
    lastScrollRef.current = currentScroll;
  }, []);

  // Handle resize
  const handleResize = useCallback(() => {
    if (!containerRef.current || !rendererRef.current || !materialRef.current) return;

    const width = containerRef.current.offsetWidth;
    const height = containerRef.current.offsetHeight;

    rendererRef.current.setSize(width, height);
    materialRef.current.uniforms.uResolution.value.set(width, height);
  }, []);

  // Initialize and cleanup
  useEffect(() => {
    initScene();
    animate();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      // Dispose Three.js resources
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (materialRef.current) {
        materialRef.current.dispose();
      }
    };
  }, [initScene, animate, handleScroll, handleResize]);

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.3s ease" }}
      />
      {/* Fallback image for SEO and loading state */}
      {!isLoaded && (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default RGBDistortionImage;
