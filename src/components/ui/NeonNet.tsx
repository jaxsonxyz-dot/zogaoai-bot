
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface NeonNetProps {
  color?: string;
  density?: number;
  speed?: number;
  depth?: number;
  className?: string;
}

const NeonNet: React.FC<NeonNetProps> = ({
  color = '#1FB6FA',
  density = 15,
  speed = 0.2,
  depth = 50,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameIdRef = useRef<number>(0);
  const mousePosition = useRef({ x: 0, y: 0 });
  const netRef = useRef<THREE.Object3D | null>(null);
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);

  // Check WebGL support
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

  // Initialize three.js scene
  useEffect(() => {
    if (!containerRef.current || webGLSupported === null || !webGLSupported) return;

    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;
    cameraRef.current = camera;

    try {
      // Setup renderer
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true 
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } catch (error) {
      console.error("Failed to create WebGL renderer:", error);
      setWebGLSupported(false);
      return;
    }

    // Create neon net
    createNeonNet();

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2, 800);
    pointLight.position.set(0, 0, 50);
    scene.add(pointLight);

    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      if (netRef.current) {
        // Gentle rotation based on mouse position
        const targetRotationX = mousePosition.current.y * 0.2;
        const targetRotationY = mousePosition.current.x * 0.2;
        
        netRef.current.rotation.x += (targetRotationX - netRef.current.rotation.x) * 0.02;
        netRef.current.rotation.y += (targetRotationY - netRef.current.rotation.y) * 0.02;
        
        // Gentle pulsing
        const time = Date.now() * 0.001;
        netRef.current.scale.set(
          1 + Math.sin(time) * 0.03,
          1 + Math.sin(time) * 0.03,
          1 + Math.sin(time) * 0.03
        );
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      cancelAnimationFrame(frameIdRef.current);
      
      if (containerRef.current && rendererRef.current) {
        if (containerRef.current.contains(rendererRef.current.domElement)) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      }
      
      // Dispose of Three.js resources
      if (netRef.current) {
        netRef.current.traverse(node => {
          if (node instanceof THREE.Mesh) {
            if (node.geometry) node.geometry.dispose();
            if (node.material) {
              if (Array.isArray(node.material)) {
                node.material.forEach(material => material.dispose());
              } else {
                node.material.dispose();
              }
            }
          }
        });
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [color, density, depth, webGLSupported]);

  // Create the neon net effect
  const createNeonNet = () => {
    if (!sceneRef.current) return;

    // Create grid of points
    const netGeometry = new THREE.BufferGeometry();
    const netMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      linewidth: 1,
      transparent: true,
      opacity: 0.8
    });

    // Create grid of vertices
    const gridSize = density;
    const gridSpacing = 2;
    const gridDepth = depth;
    
    const vertices = [];
    const indices = [];

    // Create vertices in a 3D grid
    for (let z = -gridDepth/2; z <= gridDepth/2; z += gridDepth/5) {
      for (let x = -gridSize/2; x <= gridSize/2; x++) {
        for (let y = -gridSize/2; y <= gridSize/2; y++) {
          // Add some variation to make it less uniform
          const jitterX = (Math.random() - 0.5) * 0.5;
          const jitterY = (Math.random() - 0.5) * 0.5;
          const jitterZ = (Math.random() - 0.5) * 1;
          
          vertices.push(
            x * gridSpacing + jitterX,
            y * gridSpacing + jitterY,
            z + jitterZ
          );
        }
      }
    }

    // Create connections between nearby points
    const pointsPerLayer = (gridSize + 1) * (gridSize + 1);
    const totalPoints = vertices.length / 3;
    
    for (let i = 0; i < totalPoints; i++) {
      // Connect to right neighbor
      if ((i + 1) % (gridSize + 1) !== 0 && i + 1 < totalPoints) {
        indices.push(i, i + 1);
      }
      
      // Connect to bottom neighbor
      if (i + (gridSize + 1) < totalPoints) {
        indices.push(i, i + (gridSize + 1));
      }
      
      // Connect to forward neighbor (next layer)
      if (i + pointsPerLayer < totalPoints) {
        // Only connect some points to create a sparser network
        if (Math.random() > 0.7) {
          indices.push(i, i + pointsPerLayer);
        }
      }
    }

    netGeometry.setFromPoints(Array.from({ length: totalPoints }, (_, i) => {
      return new THREE.Vector3(
        vertices[i * 3],
        vertices[i * 3 + 1],
        vertices[i * 3 + 2]
      );
    }));
    
    netGeometry.setIndex(indices);

    const net = new THREE.LineSegments(netGeometry, netMaterial);
    netRef.current = net;
    sceneRef.current.add(net);

    // Add blinking animation to line segments
    gsap.to(netMaterial, {
      opacity: 0.4,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  };

  // Render fallback when WebGL is not supported
  if (webGLSupported === false) {
    return (
      <div className={`absolute inset-0 z-0 ${className}`}>
        <div className="w-full h-full bg-gradient-to-b from-zogago-blue/5 via-zogago-purple/5 to-transparent"></div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
    />
  );
};

export default NeonNet;
