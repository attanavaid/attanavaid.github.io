"use client";

import { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useTheme } from "../ThemeProvider";
import Image from "next/image";
import { Dock, DockIcon } from "@/app/components/ui/dock";
import { Highlighter } from "@/app/components/ui/highlighter";

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
  
  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);
  
  const updateMaterials = useCallback((model: THREE.Object3D, darkMode: boolean) => {
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.metalness = 0.8;
          child.material.roughness = 0.2;
          
          if (darkMode) {
            child.material.color = new THREE.Color(0x1a1a1a);
            child.material.emissive = new THREE.Color(0x000000);
            child.material.emissiveIntensity = 0;
          } else {
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
  const logoRef = useRef<THREE.Object3D | null>(null);
  const scrollYRef = useRef<number>(0);
  const pathStartRef = useRef<number>(0);
  const pathEndRef = useRef<number>(0);
  const baseRotationRef = useRef({ x: 0, y: 0, z: 0 });
  const baseScaleRef = useRef<number>(1);
  
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    scrollYRef.current = scrollY;
  }, [scrollY]);

  useEffect(() => {
    if (!mountRef.current) return;

    let isMounted = true;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

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

    const loader = new GLTFLoader();
    const modelPath = "/models/logo.glb";
    
    loader.load(
      modelPath,
      (gltf) => {
        if (!isMounted) return;
        
        const logo = gltf.scene;
        
        const box = new THREE.Box3().setFromObject(logo);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 4.5 / maxDim;
        
        baseScaleRef.current = scale;
        
        logo.scale.multiplyScalar(scale);
        const logoBox = new THREE.Box3().setFromObject(logo);
        const logoCenter = logoBox.getCenter(new THREE.Vector3());
        logo.position.sub(logoCenter);
        
        logo.position.set(0, 1, 0);
        baseRotationRef.current = { x: Math.PI / 2, y: 0, z: 0 };
        
        updateMaterials(logo, isDarkRef.current);
        
        scene.add(logo);
        logoRef.current = logo;
      },
      undefined,
      (error) => {
        console.error("Error loading logo model:", error);
      }
    );

    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        const deltaX = e.clientX - lastMousePosRef.current.x;
        const deltaY = e.clientY - lastMousePosRef.current.y;
        
        const sensitivity = 0.005;
        rotationVelocityRef.current.y += deltaX * sensitivity;
        rotationVelocityRef.current.x -= deltaY * sensitivity;
        
        lastMousePosRef.current.x = e.clientX;
        lastMousePosRef.current.y = e.clientY;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.tagName === 'CANVAS') {
        isDraggingRef.current = true;
        lastMousePosRef.current.x = e.clientX;
        lastMousePosRef.current.y = e.clientY;
        const canvasElement = mountRef.current;
        if (canvasElement) {
          canvasElement.style.cursor = 'grabbing';
        }
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

    document.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;
    const animate = () => {
      if (!isMounted) return;
      
      animationFrameRef.current = requestAnimationFrame(animate);
      time += 0.01;

      const pathLength = pathEndRef.current - pathStartRef.current;
      const scrollProgress = Math.max(0, Math.min(1, (scrollYRef.current - pathStartRef.current) / pathLength));
      
      const logo = logoRef.current;
      if (logo) {
        const startX = 0;
        const startY = 1;
        const startZ = 0;
        
        const endX = 0;
        const endY = -6;
        const endZ = 2;
        
        const pathX = startX + (endX - startX) * scrollProgress;
        const pathY = startY + (endY - startY) * scrollProgress + Math.sin(scrollProgress * Math.PI) * 1.5;
        const pathZ = startZ + (endZ - startZ) * scrollProgress;
        
        const floatY = Math.sin(time * 0.8) * 0.3;
        const floatX = Math.cos(time * 0.6) * 0.2;
        const floatZ = Math.sin(time * 0.7) * 0.15;
        
        logo.position.x = pathX + floatX;
        logo.position.y = pathY + floatY;
        logo.position.z = pathZ + floatZ;
        
        const scrollRotationX = scrollProgress * Math.PI * 2;
        
        rotationVelocityRef.current.x *= 0.95;
        rotationVelocityRef.current.y *= 0.95;
        
        logo.rotation.x = baseRotationRef.current.x + scrollRotationX + rotationVelocityRef.current.x;
        logo.rotation.y = baseRotationRef.current.y + rotationVelocityRef.current.y;
        logo.rotation.z = baseRotationRef.current.z;
        
        const pulseScale = 1 + Math.sin(time * 2) * 0.05;
        logo.scale.setScalar(baseScaleRef.current * pulseScale);
        
        if (cameraRef.current) {
          cameraRef.current.position.x += (logo.position.x * 0.3 - cameraRef.current.position.x) * 0.05;
          cameraRef.current.position.y += (logo.position.y * 0.3 + 2 - cameraRef.current.position.y) * 0.05;
          cameraRef.current.position.z = 5;
          cameraRef.current.lookAt(logo.position.x, logo.position.y, logo.position.z);
        }
      }

      renderer.render(scene, camera);
    };

    animate();
    
    const handleResize = () => {
      if (!isMounted || !cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      calculatePath();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      
      document.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
      
      window.removeEventListener("resize", handleResize);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      if (logoRef.current) {
        logoRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.geometry) child.geometry.dispose();
            if (child.material instanceof THREE.Material) {
              child.material.dispose();
            } else if (Array.isArray(child.material)) {
              child.material.forEach((mat) => mat.dispose());
            }
          }
        });
        if (sceneRef.current && logoRef.current.parent) {
          sceneRef.current.remove(logoRef.current);
        }
        logoRef.current = null;
      }

      if (rendererRef.current) {
        const mount = mountRef.current;
        if (mount && rendererRef.current.domElement.parentNode === mount) {
          mount.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
        rendererRef.current = null;
      }

      if (sceneRef.current) {
        while (sceneRef.current.children.length > 0) {
          sceneRef.current.remove(sceneRef.current.children[0]);
        }
        sceneRef.current = null;
      }
    };
  }, [updateMaterials]);

  useEffect(() => {
    if (!logoRef.current) return;
    updateMaterials(logoRef.current, isDark);
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
          <div className="px-4 sm:px-8 md:px-12 relative flex items-center justify-center">
            {/* Signature background design */}
            <div className="absolute -bottom-8 right-1/4 flex items-center justify-center pointer-events-none z-0">
              <Image
                src="/signature.png"
                alt="Signature"
                width={500}
                height={200}
                className="w-auto h-24 object-contain dark:invert invert-0 opacity-20"
                priority={false}
              />
            </div>
            
            <p className={`relative z-10 animate-slide-up-delay-2 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed ${isDark ? 'text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]' : 'text-gray-800 drop-shadow-[0_2px_6px_rgba(255,255,255,0.8)]'}`}>
              Based in the&nbsp;
              <span className="inline-flex items-center gap-1.5">
                United States
                <Image
                  src="/us-flag.png"
                  alt="United States flag"
                  width={30}
                  height={30}
                  className="inline-block align-middle"
                />
              </span>
              , specializing in&nbsp;
              <Highlighter action="underline" color="#787878">
                building scalable, production-ready apps
              </Highlighter>
              &nbsp;with experience delivering solutions across frontend, backend, and data visualization.
            </p>
          </div>

          <div className="relative">
            <Dock direction="middle">
              <DockIcon>
                <a
                  href="https://github.com/attanavaid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full h-full"
                  aria-label="GitHub"
                >
                  <Image
                    src="/skills/tech/github.svg"
                    alt="GitHub"
                    width={24}
                    height={24}
                    className="w-6 h-6 dark:invert"
                  />
                </a>
              </DockIcon>
              <DockIcon>
                <a
                  href="https://linkedin.com/in/attanavaid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full h-full"
                  aria-label="LinkedIn"
                >
                  <Image
                    src="/skills/tech/linkedin.svg"
                    alt="LinkedIn"
                    width={24}
                    height={24}
                    className="w-6 h-6 dark:invert"
                  />
                </a>
              </DockIcon>
              <DockIcon>
                <a
                  href="https://www.youtube.com/@attanavaid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full h-full"
                  aria-label="YouTube"
                >
                  <Image
                    src="/skills/tech/youtube.svg"
                    alt="YouTube"
                    width={24}
                    height={24}
                    className="w-6 h-6 dark:invert"
                  />
                </a>
              </DockIcon>
{/*               <DockIcon>
                <a
                  href="https://discordapp.com/users/302309055672614922"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full h-full"
                  aria-label="Discord"
                >
                  <Image
                    src="/skills/tech/discord.svg"
                    alt="Discord"
                    width={24}
                    height={24}
                    className="w-6 h-6 dark:invert"
                  />
                </a>
              </DockIcon>
              <DockIcon>
                <a
                  href="https://api.whatsapp.com/send?phone=16673454340"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full h-full"
                  aria-label="WhatsApp"
                >
                  <Image
                    src="/skills/tech/whatsapp.svg"
                    alt="WhatsApp"
                    width={24}
                    height={24}
                    className="w-6 h-6 dark:invert"
                  />
                </a>
              </DockIcon>
              <DockIcon>
                <a
                  href="mailto:attanavaid@gmail.com"
                  className="flex items-center justify-center w-full h-full"
                  aria-label="Email"
                >
                  <MailIcon className="w-6 h-6 text-black dark:text-white" />
                </a>
              </DockIcon> */}
            </Dock>
          </div>
          
          {/* Single button - Download Resume */}
          <div className="flex justify-center items-center pt-2 animate-fade-in px-4">
            <a
              href="/resume.pdf"
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
