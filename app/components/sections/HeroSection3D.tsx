"use client";

import { useRef, useEffect } from "react";
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
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const knifeRef = useRef<THREE.Object3D | null>(null);
  const scrollYRef = useRef<number>(0);
  const pathStartRef = useRef<number>(0);
  const pathEndRef = useRef<number>(0);
  const baseRotationRef = useRef({ x: 0, y: 0, z: 0 });

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

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x4a9eff, 1, 100);
    pointLight1.position.set(-3, 2, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff6b9d, 1, 100);
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
        
        // Calculate scale for the model
        const box = new THREE.Box3().setFromObject(knife);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.5 / maxDim;
        
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
        
        // Apply theme-based materials
        const updateMaterials = (model: THREE.Object3D, darkMode: boolean) => {
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              if (child.material instanceof THREE.MeshStandardMaterial) {
                child.material.metalness = 0.8;
                child.material.roughness = 0.2;
                
                // Theme-based colors
                if (darkMode) {
                  // Dark mode: White/light colors with blue glow
                  child.material.color = new THREE.Color(0xffffff);
                  child.material.emissive = new THREE.Color(0x4a9eff);
                  child.material.emissiveIntensity = 0.3;
                } else {
                  // Light mode: Dark colors with subtle glow
                  child.material.color = new THREE.Color(0x000000);
                }
              }
            }
          });
        };
        
        updateMaterials(knife, isDark);
        
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
        
        // Apply only base rotation (no cursor or continuous rotation)
        knife.rotation.x = baseRotationRef.current.x;
        knife.rotation.y = baseRotationRef.current.y;
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

      // Update lights
      pointLight1.intensity = 1 + Math.sin(time * 2) * 0.3;
      pointLight2.intensity = 1 + Math.cos(time * 2) * 0.3;

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
  }, []); // Only run once on mount

  // Update materials when theme changes
  useEffect(() => {
    if (!knifeRef.current) return;
    
    const updateMaterials = (model: THREE.Object3D, darkMode: boolean) => {
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.material instanceof THREE.MeshStandardMaterial) {
            if (darkMode) {
              // Dark mode: White/light colors with blue glow
              child.material.color = new THREE.Color(0xffffff);
              child.material.emissive = new THREE.Color(0x4a9eff);
              child.material.emissiveIntensity = 0.3;
            } else {
              // Light mode: Dark colors with subtle glow
              child.material.color = new THREE.Color(0x1a1a2e);
              child.material.emissive = new THREE.Color(0x4a9eff);
              child.material.emissiveIntensity = 0.15;
            }
          }
        }
      });
    };
    
    updateMaterials(knifeRef.current, isDark);
  }, [isDark]);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* 3D Canvas Container */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      {/* Minimal overlay only at edges for text contrast - seamless with background */}
      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-transparent z-5 pointer-events-none" />

      {/* Content Overlay */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center pt-20 -mt-5">
        <div className="space-y-8">
          <div className="overflow-hidden">
            <h2 className="animate-slide-up text-sm font-medium tracking-widest text-white uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Welcome
            </h2>
          </div>
          <div className="overflow-hidden">
            <h1 className="animate-slide-up-delay uppercase text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]" style={{ fontFamily: 'var(--font-space-mono)' }}>
              <span className="inline-block">Atta</span>{" "}
              <span className="inline-block">Navaid</span>
            </h1>
          </div>
          <div className="h-16 overflow-hidden sm:h-20">
            <div
              key={currentRole}
              className="animate-fade-in-up text-2xl sm:text-3xl md:text-4xl font-light text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
              style={{ fontFamily: 'var(--font-space-mono)' }}
            >
              {roles[currentRole]}
            </div>
          </div>
          <div className="overflow-hidden">
            <p className="animate-slide-up-delay-2 max-w-2xl mx-auto text-sm sm:text-base text-white leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] px-4">
              Full-stack developer based in the United States, specializing in building scalable, production-ready applications. Expertise in React, TypeScript, and Next.js with experience delivering solutions across frontend, backend, and data visualization. Passionate about creating efficient, maintainable code and solving complex technical challenges.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-fade-in">
            <a
              href="#experience"
              className="group relative px-8 py-4 bg-white text-black font-medium rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-linear-to-r from-gray-200 to-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="/resume/Resume.pdf"
              download="Atta_Navaid_Resume.pdf"
              className="px-8 py-4 border-2 border-white text-white font-medium rounded-full transition-all duration-300 hover:bg-white hover:text-black shadow-[0_4px_12px_rgba(0,0,0,0.5)] backdrop-blur-sm bg-white/10 flex items-center gap-2"
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
            <a
              href="#contact"
              className="px-8 py-4 border-2 border-white text-white font-medium rounded-full transition-all duration-300 hover:bg-white hover:text-black shadow-[0_4px_12px_rgba(0,0,0,0.5)] backdrop-blur-sm bg-white/10"
            >
              Get In Touch
            </a>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
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
      </div>
    </section>
  );
}
