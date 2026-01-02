"use client";

import { useRef } from "react";
import Image from "next/image";
import { parallaxImages } from "../utils/imageImports";

interface HeroSectionProps {
  scrollY: number;
  currentRole: number;
  roles: string[];
}

export default function HeroSection({ scrollY, currentRole, roles }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxOffset = scrollY * 0.5;

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Parallax Image Layers - Using actual parallax images */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Layer 1: Hill 1 (Background - slowest movement) */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${parallaxOffset * 0.1}px)`,
          }}
        >
          <Image
            src={parallaxImages.hill1}
            alt="Parallax background hill 1"
            fill
            className="object-cover object-bottom"
            priority
            style={{ filter: "grayscale(100%) contrast(1.2)" }}
          />
        </div>

        {/* Layer 2: Hill 2 */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${parallaxOffset * 0.2}px)`,
          }}
        >
          <Image
            src={parallaxImages.hill2}
            alt="Parallax background hill 2"
            fill
            className="object-cover object-bottom"
            style={{ filter: "grayscale(100%) contrast(1.2)" }}
          />
        </div>

        {/* Layer 3: Hill 3 */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${parallaxOffset * 0.3}px)`,
          }}
        >
          <Image
            src={parallaxImages.hill3}
            alt="Parallax background hill 3"
            fill
            className="object-cover object-bottom"
            style={{ filter: "grayscale(100%) contrast(1.2)" }}
          />
        </div>

        {/* Layer 4: Hill 4 */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${parallaxOffset * 0.5}px)`,
          }}
        >
          <Image
            src={parallaxImages.hill4}
            alt="Parallax background hill 4"
            fill
            className="object-cover object-bottom"
            style={{ filter: "grayscale(100%) contrast(1.2)" }}
          />
        </div>

        {/* Layer 5: Tree */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${parallaxOffset * 0.7}px)`,
          }}
        >
          <Image
            src={parallaxImages.tree}
            alt="Parallax tree"
            fill
            className="object-cover object-bottom"
            style={{ filter: "grayscale(100%) contrast(1.2)" }}
          />
        </div>

        {/* Layer 6: Hill 5 */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${parallaxOffset * 0.8}px)`,
          }}
        >
          <Image
            src={parallaxImages.hill5}
            alt="Parallax background hill 5"
            fill
            className="object-cover object-bottom"
            style={{ filter: "grayscale(100%) contrast(1.2)" }}
          />
        </div>

        {/* Layer 7: Plant (foreground - fastest movement) */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${parallaxOffset * 0.9}px)`,
          }}
        >
          <Image
            src={parallaxImages.plant}
            alt="Parallax plant"
            fill
            className="object-cover object-bottom"
            style={{ filter: "grayscale(100%) contrast(1.2)" }}
          />
        </div>

        {/* Layer 8: Leaf (foreground - fastest movement) */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${parallaxOffset * 1.0}px)`,
          }}
        >
          <Image
            src={parallaxImages.leaf}
            alt="Parallax leaf"
            fill
            className="object-cover object-bottom"
            style={{ filter: "grayscale(100%) contrast(1.2)" }}
          />
        </div>
      </div>

      {/* Subtle dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/30 dark:from-black/40 dark:via-transparent dark:to-black/50 z-5 pointer-events-none" />

      <div
        ref={heroRef}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center pt-20 -mt-5"
      >
        <div className="space-y-8">
          <div className="overflow-hidden">
            <h2 className="animate-slide-up text-sm font-medium tracking-widest text-white uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Welcome
            </h2>
          </div>
          <div className="overflow-hidden">
            <h1 className="animate-slide-up-delay text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]" style={{ fontFamily: 'var(--font-space-mono)' }}>
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

