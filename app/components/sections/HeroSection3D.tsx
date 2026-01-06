"use client";

import { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useTheme } from "../ThemeProvider";

interface HeroSection3DProps {
  currentRole: number;
  roles: string[];
  scrollY: number;
}

export default function HeroSection3D({ currentRole, roles, scrollY }: HeroSection3DProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const mountRef = useRef<HTMLDivElement>(null);
  const isDarkRef = useRef(isDark);
  
  // Update ref when theme changes
  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);
  
  // Shared function to update model materials based on theme
  const updateMaterials = useCallback((model: THREE.Object3D, darkMode: boolean) => {
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.metalness = 0.8;
          child.material.roughness = 0.2;
          
          if (darkMode) {
            // Dark mode: Dark/black model
            child.material.color = new THREE.Color(0x1a1a1a);
            child.material.emissive = new THREE.Color(0x000000);
            child.material.emissiveIntensity = 0;
          } else {
            // Light mode: White/light model
            child.material.color = new THREE.Color(0xffffff);
            child.material.emissive = new THREE.Color(0xffffff);
            child.material.emissiveIntensity = 1;
          }
        }
      }
    });
  }, []);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const knifeRef = useRef<THREE.Object3D | null>(null);
  const scrollYRef = useRef<number>(0);
  const pathStartRef = useRef<number>(0);
  const pathEndRef = useRef<number>(0);
  const baseRotationRef = useRef({ x: 0, y: 0, z: 0 });
  
  // Mouse interaction state (for drag rotation only)
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0, y: 0 });

  // Update scroll ref without re-running effect
  useEffect(() => {
    scrollYRef.current = scrollY;
  }, [scrollY]);

  useEffect(() => {
    if (!mountRef.current) return;

    let isMounted = true;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false; // Disable shadows to save memory
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting - white lights only to avoid color tinting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // White point lights instead of colored ones
    const pointLight1 = new THREE.PointLight(0xffffff, 1, 100);
    pointLight1.position.set(-3, 2, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1, 100);
    pointLight2.position.set(3, -2, 3);
    scene.add(pointLight2);

    // Calculate path from hero to contact section
    const calculatePath = () => {
      const heroSection = document.getElementById('hero');
      const contactSection = document.getElementById('contact');
      
      if (heroSection && contactSection) {
        pathStartRef.current = heroSection.offsetTop;
        pathEndRef.current = contactSection.offsetTop + contactSection.offsetHeight;
      } else {
        pathStartRef.current = 0;
        pathEndRef.current = window.innerHeight * 6;
      }
    };
    
    calculatePath();

    // Load Cyberpunk Knife Model
    const loader = new GLTFLoader();
    const modelPath = "/models/logo.glb";
    
    loader.load(
      modelPath,
      (gltf) => {
        if (!isMounted) return;
        
        const knife = gltf.scene;
        
        // Calculate scale for the model (enlarged for both themes)
        const box = new THREE.Box3().setFromObject(knife);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 4.5 / maxDim; // Increased from 2.5 to 4.5
        
        // Apply scale and center
        knife.scale.multiplyScalar(scale);
        const knifeBox = new THREE.Box3().setFromObject(knife);
        const knifeCenter = knifeBox.getCenter(new THREE.Vector3());
        knife.position.sub(knifeCenter);
        
        // Starting position in hero section
        knife.position.set(0, 1, 0);
        
        // Set initial/base rotation/orientation (adjust these values to fix the initial orientation)
        // X, Y, Z rotations in radians (Math.PI = 180 degrees)
        // This is the base orientation that will be preserved
        baseRotationRef.current = { x: Math.PI / 2, y: 0, z: 0 }; // Adjust these values
        // Common adjustments:
        // baseRotationRef.current = { x: 0, y: Math.PI / 2, z: 0 }; // Rotate 90 degrees on Y axis
        // baseRotationRef.current = { x: Math.PI / 2, y: 0, z: 0 }; // Rotate 90 degrees on X axis
        // baseRotationRef.current = { x: 0, y: 0, z: Math.PI / 2 }; // Rotate 90 degrees on Z axis
        // baseRotationRef.current = { x: Math.PI / 2, y: Math.PI / 2, z: 0 }; // Combine rotations
        
        // Apply theme-based materials (using current theme at mount time)
        updateMaterials(knife, isDarkRef.current);
        
        scene.add(knife);
        knifeRef.current = knife;
        console.log("Cyberpunk knife loaded successfully");
      },
      (progress) => {
        if (progress.total > 0) {
          const percent = (progress.loaded / progress.total) * 100;
          console.log(`Knife loading: ${percent.toFixed(2)}%`);
        }
      },
      (error) => {
        console.error("Error loading knife model:", error);
        if (!isMounted) return;
        
        // Fallback: Create simple geometry
        const knifeGeometry = new THREE.BoxGeometry(0.3, 1.5, 0.1);
        const knifeMaterial = new THREE.MeshStandardMaterial({
          color: 0x4a9eff,
          metalness: 0.8,
          roughness: 0.2,
          emissive: 0x1a3a5c,
          emissiveIntensity: 0.5,
        });
        const knife = new THREE.Mesh(knifeGeometry, knifeMaterial);
        knife.position.set(0, 1, 0);
        scene.add(knife);
        knifeRef.current = knife;
        console.log("Using fallback knife geometry");
      }
    );

    // Mouse interaction handlers (drag rotation only, no cursor response)
    const handleMouseMove = (e: MouseEvent) => {
      // Handle drag rotation (only if dragging started on canvas)
      if (isDraggingRef.current) {
        const deltaX = e.clientX - lastMousePosRef.current.x;
        const deltaY = e.clientY - lastMousePosRef.current.y;
        
        // Calculate rotation velocity based on drag speed
        const sensitivity = 0.005;
        rotationVelocityRef.current.y += deltaX * sensitivity;
        rotationVelocityRef.current.x -= deltaY * sensitivity;
        
        lastMousePosRef.current.x = e.clientX;
        lastMousePosRef.current.y = e.clientY;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Only start dragging if clicking directly on the WebGL canvas element
      const target = e.target as HTMLElement;
      
      // Check if the click is on the actual canvas element (not the container div)
      if (target.tagName === 'CANVAS') {
        isDraggingRef.current = true;
        lastMousePosRef.current.x = e.clientX;
        lastMousePosRef.current.y = e.clientY;
        // Change cursor to grabbing
        const canvasElement = mountRef.current;
        if (canvasElement) {
          canvasElement.style.cursor = 'grabbing';
        }
        // Prevent default only when dragging the canvas
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        const canvasElement = mountRef.current;
        if (canvasElement) {
          canvasElement.style.cursor = 'grab';
        }
      }
    };

    const handleMouseLeave = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        const canvasElement = mountRef.current;
        if (canvasElement) {
          canvasElement.style.cursor = 'grab';
        }
      }
    };

    // Add event listeners
    // Use document for mousedown to catch canvas clicks, but check target
    document.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    let time = 0;
    const animate = () => {
      if (!isMounted) return;
      
      animationFrameRef.current = requestAnimationFrame(animate);
      time += 0.01;

      // Calculate scroll progress
      const pathLength = pathEndRef.current - pathStartRef.current;
      const scrollProgress = Math.max(0, Math.min(1, (scrollYRef.current - pathStartRef.current) / pathLength));
      
      // Animate knife
      const knife = knifeRef.current;
      if (knife) {
        // Path coordinates
        const startX = 0;
        const startY = 1;
        const startZ = 0;
        
        const endX = 0;
        const endY = -6;
        const endZ = 2;
        
        // Curved path
        const pathX = startX + (endX - startX) * scrollProgress;
        const pathY = startY + (endY - startY) * scrollProgress + Math.sin(scrollProgress * Math.PI) * 1.5;
        const pathZ = startZ + (endZ - startZ) * scrollProgress;
        
        // Floating animation
        const floatY = Math.sin(time * 0.8) * 0.3;
        const floatX = Math.cos(time * 0.6) * 0.2;
        const floatZ = Math.sin(time * 0.7) * 0.15;
        
        // Apply position
        knife.position.x = pathX + floatX;
        knife.position.y = pathY + floatY;
        knife.position.z = pathZ + floatZ;
        
        // Scroll-based rotation: rotate based on scroll progress on X-axis
        // Full rotation (2π) over the scroll path
        const scrollRotationX = scrollProgress * Math.PI * 2; // One full rotation as user scrolls
        
        // Apply momentum decay (friction) for drag rotation
        rotationVelocityRef.current.x *= 0.95;
        rotationVelocityRef.current.y *= 0.95;
        
        // Combine rotations: base + scroll + drag with momentum
        knife.rotation.x = baseRotationRef.current.x + scrollRotationX + rotationVelocityRef.current.x;
        knife.rotation.y = baseRotationRef.current.y + rotationVelocityRef.current.y;
        knife.rotation.z = baseRotationRef.current.z;
        
        // Scale pulsing
        const pulseScale = 1 + Math.sin(time * 2) * 0.05;
        knife.scale.setScalar(pulseScale);
        
        // Camera follows knife
        if (cameraRef.current) {
          cameraRef.current.position.x += (knife.position.x * 0.3 - cameraRef.current.position.x) * 0.05;
          cameraRef.current.position.y += (knife.position.y * 0.3 + 2 - cameraRef.current.position.y) * 0.05;
          cameraRef.current.position.z = 5;
          cameraRef.current.lookAt(knife.position.x, knife.position.y, knife.position.z);
        }
      }

      // Update lights (keep intensity constant to avoid color shifts)
      pointLight1.intensity = 0.2;
      pointLight2.intensity = 0.2;

      renderer.render(scene, camera);
    };

    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!isMounted || !cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      calculatePath();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      isMounted = false;
      
      // Remove mouse event listeners
      document.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
      
      window.removeEventListener("resize", handleResize);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      // Dispose knife
      if (knifeRef.current) {
        knifeRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.geometry) child.geometry.dispose();
            if (child.material instanceof THREE.Material) {
              child.material.dispose();
            } else if (Array.isArray(child.material)) {
              child.material.forEach((mat) => mat.dispose());
            }
          }
        });
        if (sceneRef.current && knifeRef.current.parent) {
          sceneRef.current.remove(knifeRef.current);
        }
        knifeRef.current = null;
      }

      // Dispose renderer
      if (rendererRef.current) {
        const mount = mountRef.current;
        if (mount && rendererRef.current.domElement.parentNode === mount) {
          mount.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
        rendererRef.current = null;
      }

      // Clear scene
      if (sceneRef.current) {
        while (sceneRef.current.children.length > 0) {
          sceneRef.current.remove(sceneRef.current.children[0]);
        }
        sceneRef.current = null;
      }
    };
  }, [updateMaterials]); // Only run once on mount (updateMaterials is stable)

  // Update materials when theme changes
  useEffect(() => {
    if (!knifeRef.current) return;
    updateMaterials(knifeRef.current, isDark);
  }, [isDark, updateMaterials]);


  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* 3D Canvas Container */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1, pointerEvents: 'none' }}
      />

      {/* Minimal overlay only at edges for text contrast - seamless with background */}
      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-transparent z-5 pointer-events-none" />

      {/* Content Overlay */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 sm:px-8 md:px-12 text-center pt-20 -mt-5">
        <div className="space-y-8 w-full">
          {/* Name - with padding to allow shadows to extend */}
          <div className="px-8 sm:px-12 md:px-16">
            <h1 className={`animate-slide-up-delay uppercase text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight ${isDark ? 'text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]' : 'text-black drop-shadow-[0_4px_12px_rgba(255,255,255,0.8)]'}`} style={{ fontFamily: 'var(--font-space-mono)' }}>
              <span className="inline-block">Atta</span>{" "}
              <span className="inline-block">Navaid</span>
            </h1>
          </div>
          
          {/* Role - with padding to allow shadows to extend */}
          <div className="h-16 sm:h-20 px-4 sm:px-8 flex items-center justify-center gap-2">
            <div
              key={currentRole}
              className={`animate-fade-in-up text-2xl sm:text-3xl md:text-4xl font-light ${isDark ? 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]' : 'text-black drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)]'}`}
              style={{ fontFamily: 'var(--font-space-mono)' }}
            >
              {roles[currentRole]}
            </div>
            <span className={`text-2xl sm:text-3xl md:text-4xl font-light ${isDark ? 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]' : 'text-black drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)]'}`} style={{ fontFamily: 'var(--font-space-mono)' }}>
              Developer
            </span>
          </div>
          
          {/* About text - with padding to allow shadows to extend */}
          <div className="px-4 sm:px-8 md:px-12">
            <p className={`animate-slide-up-delay-2 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed ${isDark ? 'text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]' : 'text-gray-800 drop-shadow-[0_2px_6px_rgba(255,255,255,0.8)]'}`}>
              Full-stack developer based in the United States, specializing in building scalable, production-ready applications with experience delivering solutions across frontend, backend, and data visualization.
            </p>
          </div>
          
          {/* Single button - Download Resume */}
          <div className="flex justify-center items-center pt-8 animate-fade-in px-4">
            <a
              href="/resume/Resume.pdf"
              download="Atta_Navaid_Resume.pdf"
              className={`px-8 py-4 border-2 font-medium rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)] backdrop-blur-sm flex items-center gap-2 ${
                isDark 
                  ? 'border-white text-white bg-white/10 hover:bg-white hover:text-black' 
                  : 'border-black text-black bg-black/10 hover:bg-black hover:text-white'
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download Resume
            </a>
          </div>
        </div>
        
        {/* Scroll indicator - responsive positioning */}
        <div className={`absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 animate-bounce hidden sm:flex flex-col items-center gap-2 ${isDark ? 'text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]' : 'text-black drop-shadow-[0_2px_6px_rgba(255,255,255,0.8)]'}`}>
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
