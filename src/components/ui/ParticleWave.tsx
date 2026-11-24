import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface ParticleWaveProps {
  className?: string;
  color?: string;
  particleCount?: number;
  waveHeight?: number;
  interactive?: boolean;
  pattern?: 'default' | 'wave' | 'grid';
  carveEffect?: boolean;
  neonIntensity?: number;
  waveFrequency?: number;
}

const ParticleWave: React.FC<ParticleWaveProps> = ({
  className = '',
  color = '#1FB6FA',
  particleCount = 1500,
  waveHeight = 20,
  interactive = true,
  pattern = 'default',
  carveEffect = false,
  neonIntensity = 1.8,
  waveFrequency = 1.0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const secondaryParticlesRef = useRef<THREE.Points | null>(null);
  const frameIdRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);
  
  // Check WebGL support before initializing Three.js
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
    
    // Setup
    const pixelRatio = window.devicePixelRatio;
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Create camera with wider field of view for better perspective
    const camera = new THREE.PerspectiveCamera(
      100, // Wider field of view
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30; // Optimize camera distance for wave visibility
    camera.position.y = carveEffect ? 5 : 0; // Slightly elevated for carved effect
    cameraRef.current = camera;
    
    try {
      // Create high-performance renderer with advanced settings
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: 'high-performance',
        precision: 'highp', // Higher precision for smoother visuals
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(pixelRatio, 2));
      
      // Enable physically accurate lighting if carve effect is requested
      if (carveEffect) {
        renderer.physicallyCorrectLights = true;
      }
      
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } catch (error) {
      console.error("Failed to create WebGL renderer:", error);
      setWebGLSupported(false);
      return;
    }
    
    // Create primary wave particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCnt = particleCount;
    
    const posArray = new Float32Array(particlesCnt * 3);
    const scaleArray = new Float32Array(particlesCnt);
    const opacityArray = new Float32Array(particlesCnt);
    
    // Create wave pattern
    if (pattern === 'wave') {
      // Enhanced wave pattern with carved effect
      const rows = carveEffect ? 50 : 40; // More rows for carving effect
      const cols = Math.ceil(particlesCnt / rows);
      const spacingX = 100 / cols;
      const spacingY = 60 / rows;
      
      for (let i = 0; i < particlesCnt; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        
        // Enhanced positioning for more natural wave
        // x position - create a wider grid layout
        posArray[i * 3] = (col * spacingX) - 50;  // -50 to 50
        
        // y position - wave formation with multiple frequencies for natural look
        const baseHeight = (row * spacingY) - 30;
        const waveVariation = Math.sin(col * 0.1) * 3 + Math.sin(col * 0.05 + row * 0.1) * 2;
        posArray[i * 3 + 1] = baseHeight + waveVariation;
        
        // z position - depth variation creates carving effect
        const depthVariation = carveEffect 
          ? (Math.sin(col * 0.3 + row * 0.2) * 10) - (Math.cos(row * 0.2) * 8)
          : (Math.sin(col * 0.2 + row * 0.1) * 10) - 10;
        posArray[i * 3 + 2] = depthVariation;
        
        // Varied particle sizes, bigger for foreground to enhance 3D effect
        const zDepthFactor = (posArray[i * 3 + 2] + 20) / 40; // Normalize z value for depth-based sizing
        scaleArray[i] = 0.8 + Math.random() * 2 + (zDepthFactor * 1.5);
        
        // Opacity variation for depth effect
        opacityArray[i] = 0.6 + Math.random() * 0.4;
      }
    } else {
      // Default random distribution
      for (let i = 0; i < particlesCnt * 3; i += 3) {
        // x position - wider spread
        posArray[i] = (Math.random() - 0.5) * 120;
        // y position - more height variation
        posArray[i + 1] = (Math.random() - 0.5) * 60;
        // z position - more depth
        posArray[i + 2] = (Math.random() - 0.5) * 60;
        
        // Varied particle sizes for more visual interest
        scaleArray[i / 3] = Math.random() * 1.5;
        opacityArray[i / 3] = 0.6 + Math.random() * 0.4;
      }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    particlesGeometry.setAttribute('opacity', new THREE.BufferAttribute(opacityArray, 1));
    
    // Create enhanced particle material with advanced neon glow effect
    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(color) },
        mousePosition: { value: new THREE.Vector2(0, 0) },
        neonIntensity: { value: neonIntensity },
        waveFrequency: { value: waveFrequency },
        carveEffect: { value: carveEffect ? 1.0 : 0.0 }
      },
      vertexShader: `
        attribute float scale;
        attribute float opacity;
        uniform float time;
        uniform vec2 mousePosition;
        uniform float waveFrequency;
        uniform float carveEffect;
        
        varying float vOpacity;
        varying vec3 vPosition;
        varying vec3 vNormal; // For lighting calculation
        
        void main() {
          vOpacity = opacity;
          vPosition = position;
          
          vec3 pos = position;
          float waveFreq = waveFrequency; // Using the uniform value
          
          // Enhanced wave animation specifically for water wave pattern
          ${pattern === 'wave' ? `
            // Multiple wave frequencies for more natural water motion
            float xFactor = pos.x * 0.05;
            float zFactor = pos.z * 0.05;
            float yFactor = pos.y * 0.03;
            
            // Primary waves - smoother sine variations
            float primaryWave = sin(time * 0.4 * waveFreq + xFactor * 2.0) * ${(waveHeight * 0.4).toFixed(1)};
            
            // Secondary ripples - higher frequency
            float ripples = sin(time * 0.7 * waveFreq + xFactor * 4.0 + zFactor * 2.0) * ${(waveHeight * 0.15).toFixed(1)};
            
            // Carving effect - adds realistic water surface displacement
            float carving = carveEffect * sin(time * 0.2 * waveFreq + xFactor * 0.5 + pos.y * 0.1) * ${(waveHeight * 0.3).toFixed(1)};
            
            // Add vertical motion with multiple frequencies
            float verticalMotion = sin(time * 0.15 * waveFreq + (pos.x + pos.z) * 0.05) * ${(waveHeight * 0.2).toFixed(1)};
            verticalMotion += cos(time * 0.3 * waveFreq + pos.x * 0.1) * ${(waveHeight * 0.1).toFixed(1)};
            
            // Apply all wave components
            float totalWaveEffect = primaryWave + ripples + carving;
            pos.y += verticalMotion + totalWaveEffect * 0.6;
            pos.z += totalWaveEffect * 0.4;
            
            // Calculate approximate normal for lighting
            vec3 tangent = vec3(1.0, cos(time * 0.4 * waveFreq + (xFactor + 0.1) * 2.0) * 0.2, 0.0);
            vec3 bitangent = vec3(0.0, 0.0, 1.0);
            vNormal = normalize(cross(tangent, bitangent));
          ` : `
            // Standard wave animation
            float waveX = sin(time * 0.3 + pos.x * 0.05) * ${waveHeight.toFixed(1)};
            float waveY = cos(time * 0.2 + pos.x * 0.04) * ${(waveHeight * 0.6).toFixed(1)};
            
            pos.y += waveY;
            pos.z += waveX;
          `}
          
          // Improved mouse influence with exponential falloff
          if (${interactive ? 'true' : 'false'}) {
            float distX = pos.x - mousePosition.x * 120.0;
            float distY = pos.y - mousePosition.y * 60.0;
            float mouseDist = sqrt(distX * distX + distY * distY);
            
            // Exponential falloff for more natural interaction
            float mouseInfluence = 12.0 * exp(-mouseDist * 0.03);
            
            pos.y += (mousePosition.y * 0.3 * mouseInfluence);
            pos.z += (mousePosition.x * 0.3 * mouseInfluence);
            
            // Create ripple effect around mouse pointer
            if (mouseDist < 30.0) {
              float rippleFactor = (1.0 - mouseDist / 30.0) * 3.0;
              pos.y += sin(time * 5.0 + mouseDist * 0.5) * rippleFactor;
            }
          }
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          
          // Dynamic particle size based on depth, scale attribute and position
          float sizeVariation = scale;
          if (${pattern === 'wave' && carveEffect ? 'true' : 'false'}) {
            // Make particles in the crests of waves larger
            sizeVariation *= 1.0 + 0.5 * sin(time * 0.4 * waveFreq + pos.x * 0.1);
          }
          
          gl_PointSize = sizeVariation * 8.0 * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float neonIntensity;
        uniform float carveEffect;
        
        varying float vOpacity;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          // Enhanced circular particle with soft outer glow
          float distFromCenter = distance(gl_PointCoord, vec2(0.5));
          
          // Core gradient for main particle
          float core = smoothstep(0.5, 0.0, distFromCenter);
          
          // Neon glow with extended radius
          float glow = smoothstep(1.0, 0.2, distFromCenter);
          
          // Combine core and glow with intensity control
          float strength = core + glow * 0.6 * neonIntensity;
          
          // Apply depth lighting effect for carved surface
          float lighting = 1.0;
          if (${carveEffect ? 'true' : 'false'}) {
            // Simple lighting approximation using normal
            vec3 lightDir = normalize(vec3(0.5, 1.0, 0.7));
            lighting = 0.5 + 0.5 * max(0.0, dot(vNormal, lightDir));
            
            // Add rim lighting for water edge effect
            vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
            float rim = 1.0 - max(0.0, dot(vNormal, viewDir));
            lighting += rim * 0.4 * neonIntensity;
          }
          
          // Final color calculation with neon intensity and lighting
          vec3 glowColor = color * neonIntensity * 1.5;
          vec3 baseColor = mix(color, glowColor, glow * 0.7);
          vec3 litColor = baseColor * lighting;
          
          // Combine everything for final output
          gl_FragColor = vec4(litColor, strength * vOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    
    // Create particles system
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    
    // Position the particles based on pattern
    if (pattern === 'wave') {
      // Position the wave pattern to be more visible
      particles.position.y = carveEffect ? -5 : -10;
      particles.rotation.x = carveEffect ? -0.3 : -0.2; // Improved tilt angle for carved effect
    }
    
    scene.add(particles);
    particlesRef.current = particles;
    
    // Create secondary particles for enhanced neon effect if carving is enabled
    if (carveEffect && pattern === 'wave') {
      const secondaryGeometry = new THREE.BufferGeometry();
      const secondaryCount = Math.floor(particleCount * 0.3); // 30% of main particles
      
      const secondaryPos = new Float32Array(secondaryCount * 3);
      const secondaryScale = new Float32Array(secondaryCount);
      
      // Create more sparse distribution for glow effect
      const rows = 20;
      const cols = Math.ceil(secondaryCount / rows);
      const spacingX = 120 / cols;
      const spacingY = 80 / rows;
      
      for (let i = 0; i < secondaryCount; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        
        // More random distribution for glow particles
        secondaryPos[i * 3] = (col * spacingX) - 60 + (Math.random() - 0.5) * 20;
        secondaryPos[i * 3 + 1] = (row * spacingY) - 40 + (Math.random() - 0.5) * 15;
        secondaryPos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 15;
        
        // Larger particles for glow effect
        secondaryScale[i] = 3 + Math.random() * 5;
      }
      
      secondaryGeometry.setAttribute('position', new THREE.BufferAttribute(secondaryPos, 3));
      secondaryGeometry.setAttribute('scale', new THREE.BufferAttribute(secondaryScale, 1));
      
      // Create glow material
      const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(color).multiplyScalar(1.2) }, // Brighter color
          neonIntensity: { value: neonIntensity * 1.5 } // Higher intensity
        },
        vertexShader: `
          attribute float scale;
          uniform float time;
          
          void main() {
            vec3 pos = position;
            
            // Subtle flowing motion
            pos.y += sin(time * 0.2 + position.x * 0.05) * 2.0;
            pos.z += cos(time * 0.15 + position.x * 0.05) * 2.0;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = scale * 10.0 * (1.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          uniform float neonIntensity;
          
          void main() {
            float dist = distance(gl_PointCoord, vec2(0.5));
            float strength = smoothstep(1.0, 0.0, dist * 2.0);
            vec3 glowColor = color * neonIntensity;
            gl_FragColor = vec4(glowColor, strength * 0.3); // Lower opacity for subtle glow
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      
      const secondaryParticles = new THREE.Points(secondaryGeometry, glowMaterial);
      secondaryParticles.position.y = -8;
      secondaryParticles.position.z = -20;
      scene.add(secondaryParticles);
      secondaryParticlesRef.current = secondaryParticles;
    }
    
    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);
    
    if (carveEffect) {
      // Directional light for carved effect highlighting
      const directionalLight = new THREE.DirectionalLight(color, 2.0);
      directionalLight.position.set(1, 2, 1);
      scene.add(directionalLight);
      
      // Add second directional light from opposite side for edge highlighting
      const rimLight = new THREE.DirectionalLight(0xffffff, 1.0);
      rimLight.position.set(-2, 1, 0.5);
      scene.add(rimLight);
    } else {
      const directionalLight = new THREE.DirectionalLight(color, 1.5);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);
    }
    
    // Add point light for glow effect
    const pointLight = new THREE.PointLight(color, 2.5, 100);
    pointLight.position.set(0, 0, 20);
    scene.add(pointLight);
    
    // Setup improved interaction
    const handleMouseMove = (event: MouseEvent) => {
      if (!interactive) return;
      
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
      
      if (particlesRef.current?.material instanceof THREE.ShaderMaterial) {
        particlesRef.current.material.uniforms.mousePosition.value = new THREE.Vector2(
          mouseRef.current.x,
          mouseRef.current.y
        );
        
        // Add subtle camera tilt based on mouse position for 3D effect
        if (cameraRef.current && pattern === 'wave') {
          gsap.to(cameraRef.current.position, {
            y: carveEffect ? 5 + (mouseRef.current.y * 2) : mouseRef.current.y * 2,
            x: mouseRef.current.x * 3,
            duration: 1,
            ease: "power2.out"
          });
          
          // Subtle look-at adjustment
          gsap.to(cameraRef.current.rotation, {
            x: -0.1 + (mouseRef.current.y * 0.05),
            y: mouseRef.current.x * 0.05,
            duration: 1,
            ease: "power2.out"
          });
        }
      }
    };
    
    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      // Update camera
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      
      // Update renderer
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    // Animation loop with improved performance
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      if (particlesRef.current?.material instanceof THREE.ShaderMaterial) {
        // Update time uniform with smooth progression
        particlesRef.current.material.uniforms.time.value += 0.015;
      }
      
      if (secondaryParticlesRef.current?.material instanceof THREE.ShaderMaterial) {
        // Update secondary particles with different time progression
        secondaryParticlesRef.current.material.uniforms.time.value += 0.01;
        
        // Add subtle floating motion to secondary particles
        if (pattern === 'wave') {
          secondaryParticlesRef.current.position.y = -8 + Math.sin(Date.now() * 0.0005) * 2;
        }
      }
      
      // Gentle automatic rotation
      if (particlesRef.current) {
        if (pattern !== 'wave') {
          // Only apply rotation for non-wave patterns
          particlesRef.current.rotation.x += 0.0005;
          particlesRef.current.rotation.y += 0.0003;
        } else if (carveEffect) {
          // For carved wave, add very subtle oscillation
          particlesRef.current.rotation.z = Math.sin(Date.now() * 0.0003) * 0.02;
        }
      }
      
      // Render scene
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    // Start animation
    animate();
    
    // Enhanced entrance animation
    if (particlesRef.current) {
      if (pattern === 'wave') {
        // Special entrance for wave pattern
        gsap.from(particlesRef.current.position, {
          y: carveEffect ? -30 : -50,
          duration: 3,
          ease: "power3.out"
        });
        
        // Add ripple effect entrance
        gsap.from(particlesRef.current.scale, {
          x: 0.5,
          y: 0.5,
          z: 0.5,
          duration: 2.5,
          ease: "elastic.out(1, 0.5)"
        });
        
        if (secondaryParticlesRef.current) {
          // Delayed entrance for glow particles
          gsap.from(secondaryParticlesRef.current.position, {
            y: -40,
            duration: 4,
            delay: 0.5,
            ease: "power3.out"
          });
          
          gsap.from(secondaryParticlesRef.current.material, {
            opacity: 0, 
            duration: 3,
            delay: 1,
            ease: "power2.out"
          });
        }
      } else {
        // Default entrance animation
        gsap.from(particlesRef.current.position, {
          y: -60,
          duration: 2.5,
          ease: "power3.out"
        });
        
        gsap.from(particlesRef.current.rotation, {
          x: -Math.PI / 3,
          duration: 3,
          ease: "power2.out"
        });
      }
    }
    
    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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
      
      if (secondaryParticlesRef.current) {
        if (secondaryParticlesRef.current.geometry) {
          secondaryParticlesRef.current.geometry.dispose();
        }
        
        if (secondaryParticlesRef.current.material instanceof THREE.ShaderMaterial) {
          secondaryParticlesRef.current.material.dispose();
        }
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [color, particleCount, waveHeight, interactive, pattern, carveEffect, neonIntensity, waveFrequency]);
  
  // Render fallback when WebGL is not supported
  if (webGLSupported === false) {
    return (
      <div className={`absolute inset-0 z-1 ${className} bg-gradient-to-b from-transparent to-blue-900/20 overflow-hidden`}>
        <div className="w-full h-full flex items-end justify-center">
          <div className="w-full h-1/3 bg-gradient-radial from-blue-500/30 to-transparent blur-xl"></div>
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

export default ParticleWave;
