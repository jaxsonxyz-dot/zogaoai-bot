
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Logo3DProps {
  width?: number;
  height?: number;
  highResolution?: boolean;
}

const Logo3D: React.FC<Logo3DProps> = ({ 
  width = 100, 
  height = 100,
  highResolution = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);

  useEffect(() => {
    // Check for WebGL support
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
    const pixelRatio = highResolution ? 2 : window.devicePixelRatio;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    
    let renderer: THREE.WebGLRenderer;
    
    try {
      renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        precision: highResolution ? 'highp' : 'mediump'
      });
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(pixelRatio);
      containerRef.current.appendChild(renderer.domElement);
    } catch (error) {
      console.error("Failed to create WebGL renderer:", error);
      setWebGLSupported(false);
      return;
    }

    // Create a simple geometric logo instead of using a texture
    const geometry = new THREE.CircleGeometry(1, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0x1FB6FA,
      transparent: true,
      side: THREE.DoubleSide
    });
    
    const logo = new THREE.Mesh(geometry, material);
    scene.add(logo);

    // Add a soft pulsing light for glow effect
    const light = new THREE.PointLight(0x1FB6FA, 1, 100);
    light.position.set(0, 0, 5);
    scene.add(light);

    // Position camera
    camera.position.z = 4;

    // Animation variables
    let time = 0;
    const floatIntensity = 0.05;

    // Animation
    const animate = () => {
      const frameId = requestAnimationFrame(animate);
      
      // Time-based animations
      time += 0.01;
      
      // Floating effect
      logo.position.y = Math.sin(time) * floatIntensity;
      
      // Light pulsing
      light.intensity = 1 + Math.sin(time * 2) * 0.3;
      
      renderer.render(scene, camera);
      
      return frameId;
    };

    const frameId = animate();

    // Interactive movement based on mouse position
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / width) * 2 - 1;
      const y = -((e.clientY - rect.top) / height) * 2 + 1;
      
      // Subtle tilt based on mouse position
      logo.rotation.x = y * 0.1;
      logo.rotation.y = x * 0.1;
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        if (containerRef.current.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [width, height, highResolution, webGLSupported]);

  // Render a gradient fallback when WebGL is not supported
  if (webGLSupported === false) {
    return (
      <div 
        style={{ width, height }} 
        className="inline-block rounded-full bg-gradient-to-r from-zogago-blue to-zogago-purple"
      />
    );
  }

  return (
    <div 
      ref={containerRef}
      style={{ width, height }}
      className="inline-block"
    />
  );
};

export default Logo3D;
