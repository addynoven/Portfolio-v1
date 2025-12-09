"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";

interface DissolveTransitionProps {
  isActive: boolean;
  duration?: number; // Duration in ms
  onComplete?: () => void;
}

// Simplex noise implementation for organic dissolve pattern
const simplexNoise = `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                           + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                            dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Fractal Brownian Motion for more organic noise - MORE OCTAVES for organic look
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.6;
    float frequency = 1.0;
    // 8 octaves for more organic, detailed pattern
    for (int i = 0; i < 8; i++) {
      value += amplitude * snoise(p * frequency);
      amplitude *= 0.45;
      frequency *= 2.2;
    }
    return value;
  }

  // Voronoi-like cellular noise for blob effect
  float cellularNoise(vec2 uv, float scale) {
    vec2 p = uv * scale;
    vec2 i = floor(p);
    vec2 f = fract(p);
    
    float minDist = 1.0;
    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 neighbor = vec2(float(x), float(y));
        vec2 point = vec2(
          snoise(i + neighbor) * 0.5 + 0.5,
          snoise(i + neighbor + vec2(100.0)) * 0.5 + 0.5
        );
        vec2 diff = neighbor + point - f;
        float dist = length(diff);
        minDist = min(minDist, dist);
      }
    }
    return minDist;
  }
`;

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;
  
  varying vec2 v_uv;
  
  uniform float u_threshold;
  uniform float u_time;
  uniform vec3 u_bgColor;
  uniform vec3 u_glowColor;
  uniform float u_edgeWidth;
  uniform float u_glowIntensity;
  
  ${simplexNoise}
  
  void main() {
    vec2 uv = v_uv;
    
    // SLOW ORGANIC BLOB PATTERN
    // Use low frequency noise for large blob shapes
    float baseNoise = fbm(uv * 2.0 + u_time * 0.02); // Very slow movement
    
    // Add cellular/blob structure
    float cells = cellularNoise(uv + u_time * 0.01, 4.0);
    
    // Combine for organic blob pattern
    float noise = baseNoise * 0.6 + cells * 0.4;
    
    // Normalize from [-1,1] to [0,1]
    noise = noise * 0.5 + 0.5;
    
    // Add subtle radial bias - dissolve starts from edges but not too strongly
    vec2 center = vec2(0.5, 0.5);
    float dist = length(uv - center);
    noise = mix(noise, noise + dist * 0.15, 0.4);
    
    // SLOW THRESHOLD ANIMATION - using wider edge for gradual dissolve
    float edge = u_edgeWidth;
    
    // Smooth organic edge - wider transition for blobby feel
    float alpha = smoothstep(u_threshold - edge * 0.5, u_threshold + edge * 0.5, noise);
    
    // GLOWING EDGE - wider glow band
    float outerEdge = smoothstep(u_threshold - edge * 2.5, u_threshold - edge, noise);
    float innerEdge = smoothstep(u_threshold - edge, u_threshold + edge * 0.3, noise);
    float edgeFactor = outerEdge - innerEdge;
    
    // Electric glow with pulsing
    float glow = edgeFactor * u_glowIntensity;
    
    // Subtle electric crackling along edges
    float electricNoise = snoise(uv * 30.0 + u_time * 1.5);
    float electricGlow = edgeFactor * max(0.0, electricNoise) * 0.4;
    
    // Base color
    vec3 color = u_bgColor;
    
    // Add glow color
    color = mix(color, u_glowColor, glow + electricGlow);
    
    // Bright white core at the very edge of dissolve
    float coreOuter = smoothstep(u_threshold - edge * 0.8, u_threshold - edge * 0.4, noise);
    float coreInner = smoothstep(u_threshold - edge * 0.4, u_threshold, noise);
    float coreFactor = coreOuter - coreInner;
    color = mix(color, vec3(1.0), coreFactor * 0.9);
    
    gl_FragColor = vec4(color, alpha);
  }
`;

export const DissolveTransition: React.FC<DissolveTransitionProps> = ({
  isActive,
  duration = 2500,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const { theme } = useTheme();

  const createShader = useCallback((gl: WebGLRenderingContext, type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compile error:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }, []);

  const initWebGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return false;

    const gl = canvas.getContext("webgl", { 
      alpha: true, 
      premultipliedAlpha: false,
      antialias: true 
    });
    if (!gl) {
      console.error("WebGL not supported");
      return false;
    }
    glRef.current = gl;

    // Create shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return false;

    // Create program
    const program = gl.createProgram();
    if (!program) return false;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return false;
    }
    programRef.current = program;

    // Setup geometry (full-screen quad)
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Enable blending for transparency
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    return true;
  }, [createShader]);

  const render = useCallback((timestamp: number) => {
    const gl = glRef.current;
    const program = programRef.current;
    const canvas = canvasRef.current;
    
    if (!gl || !program || !canvas || !isActive) return;

    // Calculate progress
    if (startTimeRef.current === 0) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function - MUCH SLOWER start, gradual acceleration
    // Custom ease: slow start, slow middle, slow end for organic feel
    const easeInOutSine = Math.sin((progress * Math.PI) / 2) * Math.sin((progress * Math.PI) / 2);
    const threshold = easeInOutSine * 1.4; // Go over 1 to ensure full dissolve

    // Update canvas size
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.useProgram(program);

    // Set uniforms
    const isDark = theme === "dark";
    const bgColor = isDark ? [10/255, 10/255, 10/255] : [255/255, 255/255, 255/255];
    const glowColor = [0/255, 255/255, 136/255]; // Accent color

    gl.uniform1f(gl.getUniformLocation(program, "u_threshold"), threshold);
    gl.uniform1f(gl.getUniformLocation(program, "u_time"), elapsed / 1000);
    gl.uniform3fv(gl.getUniformLocation(program, "u_bgColor"), bgColor);
    gl.uniform3fv(gl.getUniformLocation(program, "u_glowColor"), glowColor);
    gl.uniform1f(gl.getUniformLocation(program, "u_edgeWidth"), 0.15); // Wider edge for blob feel
    gl.uniform1f(gl.getUniformLocation(program, "u_glowIntensity"), 2.5);

    // Clear and draw
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(render);
    } else {
      onComplete?.();
    }
  }, [isActive, duration, theme, onComplete]);

  useEffect(() => {
    if (isActive) {
      const initialized = initWebGL();
      if (initialized) {
        startTimeRef.current = 0;
        animationRef.current = requestAnimationFrame(render);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, initWebGL, render]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[100] w-full h-full pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
};

export default DissolveTransition;
