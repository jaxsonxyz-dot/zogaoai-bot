
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface AdvancedWaveProps {
  className?: string;
  color?: string;
  particleCount?: number;
  waveSpeed?: number;
  interactive?: boolean;
}

const AdvancedWave: React.FC<AdvancedWaveProps> = ({
  className = '',
  color = '#1FB6FA',
  particleCount = 3000,
  waveSpeed = 1.0,
  interactive = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const frameIdRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);
  
  useEffect(() => {
    const checkWebGLSupport = (): boolean => {
      try {
        const canvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext && 
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
      } catch (e) {
        console.warn("WebGL not supported:", e);
        return false;
      }
    };
    
    setWebGLSupported(checkWebGLSupport());
  }, []);
  
  useEffect(() => {
    if (!containerRef.current || webGLSupported === null || !webGLSupported) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 150);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;
    
    try {
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } catch (error) {
      console.error("Failed to create WebGL renderer:", error);
      setWebGLSupported(false);
      return;
    }
    
    // Create particle wave geometry - discrete particles forming waves
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const originalPositions = new Float32Array(particleCount * 3);
    
    // Create wave-like distribution of particles
    const waveWidth = 400;
    const waveHeight = 100;
    const rows = 25;
    const cols = Math.floor(particleCount / rows);
    
    let particleIndex = 0;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols && particleIndex < particleCount; col++) {
        const x = (col / cols) * waveWidth - waveWidth / 2;
        const z = (row / rows) * 200 - 100;
        
        // Create wave pattern with multiple frequencies
        const wave1 = Math.sin(x * 0.02) * 20;
        const wave2 = Math.cos(x * 0.015 + row * 0.3) * 15;
        const wave3 = Math.sin(x * 0.008 + z * 0.01) * 10;
        
        const y = wave1 + wave2 + wave3 - 50;
        
        positions[particleIndex * 3] = x + (Math.random() - 0.5) * 5;
        positions[particleIndex * 3 + 1] = y + (Math.random() - 0.5) * 8;
        positions[particleIndex * 3 + 2] = z + (Math.random() - 0.5) * 5;
        
        // Store original positions for wave animation
        originalPositions[particleIndex * 3] = positions[particleIndex * 3];
        originalPositions[particleIndex * 3 + 1] = positions[particleIndex * 3 + 1];
        originalPositions[particleIndex * 3 + 2] = positions[particleIndex * 3 + 2];
        
        scales[particleIndex] = 0.5 + Math.random() * 1.0;
        particleIndex++;
      }
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('originalPosition', new THREE.BufferAttribute(originalPositions, 3));
    
    // Shader material for discrete particles
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(color) },
        mousePosition: { value: new THREE.Vector2(0, 0) },
        waveSpeed: { value: waveSpeed },
        mouseInfluence: { value: 0.0 }
      },
      vertexShader: `
        attribute float scale;
        attribute vec3 originalPosition;
        uniform float time;
        uniform vec2 mousePosition;
        uniform float waveSpeed;
        uniform float mouseInfluence;
        
        varying float vOpacity;
        varying float vDistanceToMouse;
        
        void main() {
          vec3 pos = originalPosition;
          
          // Multiple wave frequencies for realistic water motion
          float wave1 = sin(pos.x * 0.02 + time * waveSpeed * 0.8) * 15.0;
          float wave2 = cos(pos.x * 0.015 + pos.z * 0.01 + time * waveSpeed * 0.6) * 12.0;
          float wave3 = sin(pos.x * 0.008 + time * waveSpeed * 1.2) * 8.0;
          
          // Apply waves primarily to Y position
          pos.y += wave1 + wave2 + wave3;
          
          // Add gentle flowing motion
          pos.x += sin(time * waveSpeed * 0.3 + pos.z * 0.02) * 3.0;
          pos.z += cos(time * waveSpeed * 0.25 + pos.x * 0.015) * 2.0;
          
          // Mouse interaction
          vec2 mouseWorld = mousePosition * 200.0;
          float distToMouse = distance(pos.xz, mouseWorld);
          vDistanceToMouse = distToMouse;
          
          if (distToMouse < 40.0) {
            float influence = (1.0 - distToMouse / 40.0) * mouseInfluence;
            pos.y += sin(time * 6.0 + distToMouse * 0.3) * influence * 20.0;
            
            // Ripple effect
            float ripple = sin(distToMouse * 0.4 - time * 4.0) * influence * 8.0;
            pos.y += ripple;
          }
          
          // Calculate opacity based on wave height and mouse proximity
          vOpacity = 0.4 + 0.6 * smoothstep(-30.0, 30.0, pos.y);
          if (distToMouse < 60.0) {
            vOpacity += (1.0 - distToMouse / 60.0) * 0.4;
          }
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          
          // Dynamic particle size based on distance and mouse proximity
          float sizeMultiplier = scale * (0.8 + 0.4 * vOpacity);
          if (distToMouse < 50.0) {
            sizeMultiplier *= 1.0 + (1.0 - distToMouse / 50.0) * 0.8;
          }
          
          gl_PointSize = sizeMultiplier * 4.0 * (150.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        
        varying float vOpacity;
        varying float vDistanceToMouse;
        
        void main() {
          // Create perfect circular particles
          float distFromCenter = distance(gl_PointCoord, vec2(0.5));
          float circle = 1.0 - smoothstep(0.0, 0.5, distFromCenter);
          
          if (circle < 0.1) discard;
          
          // Enhanced color based on mouse proximity
          vec3 finalColor = color;
          
          // Add glow effect for nearby particles
          if (vDistanceToMouse < 60.0) {
            float glowIntensity = 1.0 - vDistanceToMouse / 60.0;
            finalColor = mix(finalColor, vec3(1.0, 1.0, 1.0), glowIntensity * 0.4);
          }
          
          // Add subtle glow around each particle
          float glow = 1.0 - smoothstep(0.0, 0.6, distFromCenter);
          
          gl_FragColor = vec4(finalColor, circle * vOpacity + glow * 0.2);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;
    
    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      if (!interactive) return;
      
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
      
      if (particlesRef.current?.material instanceof THREE.ShaderMaterial) {
        const uniforms = particlesRef.current.material.uniforms;
        uniforms.mousePosition.value.set(mouseRef.current.x, mouseRef.current.y);
        uniforms.mouseInfluence.value = 1.0;
      }
    };
    
    const handleMouseLeave = () => {
      if (particlesRef.current?.material instanceof THREE.ShaderMaterial) {
        gsap.to(particlesRef.current.material.uniforms.mouseInfluence, {
          value: 0.0,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    };
    
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      if (particlesRef.current?.material instanceof THREE.ShaderMaterial) {
        particlesRef.current.material.uniforms.time.value += 0.01;
      }
      
      // Gentle camera movement
      if (cameraRef.current) {
        cameraRef.current.position.x = Math.sin(Date.now() * 0.0003) * 10;
        cameraRef.current.position.y = Math.cos(Date.now() * 0.0002) * 5;
        cameraRef.current.lookAt(0, 0, 0);
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();
    
    // Entrance animation
    if (particlesRef.current) {
      gsap.from(particlesRef.current.position, {
        y: -200,
        duration: 4,
        ease: "power3.out"
      });
      
      gsap.from(particlesRef.current.rotation, {
        x: Math.PI,
        duration: 3,
        ease: "power2.out"
      });
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameIdRef.current);
      
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (particlesRef.current) {
        if (particlesRef.current.geometry) {
          particlesRef.current.geometry.dispose();
        }
        if (particlesRef.current.material instanceof THREE.ShaderMaterial) {
          particlesRef.current.material.dispose();
        }
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [color, particleCount, waveSpeed, interactive, webGLSupported]);
  
  if (webGLSupported === false) {
    return (
      <div className={`absolute inset-0 z-1 ${className} bg-gradient-to-b from-transparent via-blue-900/10 to-blue-900/20 overflow-hidden`}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full h-2/3 bg-gradient-radial from-blue-500/20 to-transparent blur-xl"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 z-1 pointer-events-none ${className}`}
    />
  );
};

export default AdvancedWave;
