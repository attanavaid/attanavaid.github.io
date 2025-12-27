"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { projectsData } from "@/data/projectsData";
import { workData } from "@/data/workData";
import { skillsData } from "@/data/skillsData";
import { currentlyLearningData } from "@/data/currentlyLearningData";
import { educationData } from "@/data/educationData";
import { languagesData } from "@/data/languagesData";
import type { WorkExperience, Education } from "@/types";
import Navbar from "./components/Navbar";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [currentRole, setCurrentRole] = useState(0);
  const [timelineView, setTimelineView] = useState<"work" | "education">("work");
  const heroRef = useRef<HTMLDivElement>(null);
  const [sectionOffsets, setSectionOffsets] = useState<Record<string, number>>({});

  const roles = ["Developer", "Designer", "Creator", "Innovator"];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Calculate offsets for each section
      const sections = ['hero', 'experience', 'skills', 'projects', 'languages', 'contact'];
      const offsets: Record<string, number> = {};
      
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          offsets[sectionId] = window.scrollY - rect.top + window.innerHeight;
        }
      });
      
      setSectionOffsets(offsets);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  const parallaxOffset = scrollY * 0.5;

  return (
    <div className="relative overflow-hidden bg-white dark:bg-black">
      <Navbar />
      {/* Hero Section */}
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
              src="/parallax/hill1.png"
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
              src="/parallax/hill2.png"
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
              src="/parallax/hill3.png"
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
              src="/parallax/hill4.png"
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
              src="/parallax/tree.png"
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
              src="/parallax/hill5.png"
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
              src="/parallax/plant.png"
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
              src="/parallax/leaf.png"
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
              <h1 className="animate-slide-up-delay text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                <span className="inline-block">Atta</span>{" "}
                <span className="inline-block">Navaid</span>
              </h1>
            </div>
            <div className="h-16 overflow-hidden sm:h-20">
              <div
                key={currentRole}
                className="animate-fade-in-up text-2xl sm:text-3xl md:text-4xl font-light text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
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

      {/* Timeline Section - Combined Work & Education */}
      <section id="experience" className="relative py-32 px-6 bg-white dark:bg-black overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle, gray 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
              transform: `translateY(${sectionOffsets.experience ? sectionOffsets.experience * 0.25 : 0}px)`,
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Section Header with Toggle */}
          <div className="text-center">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-black dark:text-white mb-8">
              Experience
            </h2>
            
            {/* Smaller Toggle Buttons with Equal Width */}
            <div className="relative inline-flex items-center justify-center gap-2 mb-12 p-1 bg-white dark:bg-black rounded-full border-2 border-gray-300 dark:border-gray-700">
              {/* Sliding Background Circle - Smooth Animation */}
              <div
                className="absolute top-1 bottom-1 rounded-full bg-black dark:bg-white shadow-md transition-all duration-500 ease-in-out"
                style={{
                  width: "calc(50% - 0.25rem)",
                  left: timelineView === "work" ? "0.125rem" : "calc(50% + 0.125rem)",
                }}
              />
              
              <button
                onClick={() => setTimelineView("work")}
                className={`relative z-10 w-24 py-2 rounded-full font-medium text-sm transition-colors duration-300 text-center ${
                  timelineView === "work"
                    ? "text-white dark:text-black"
                    : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                }`}
              >
                Work
              </button>
              <button
                onClick={() => setTimelineView("education")}
                className={`relative z-10 w-24 py-2 rounded-full font-medium text-sm transition-colors duration-300 text-center ${
                  timelineView === "education"
                    ? "text-white dark:text-black"
                    : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                }`}
              >
                Education
              </button>
            </div>
          </div>

          {/* Experience Content - Node Connection Design */}
          <div className="relative">
            {/* Continuous Vertical Line - Runs through all boxes */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700 transform -translate-x-1/2 z-0"></div>

            {/* Centered Items Container */}
            <div className="space-y-16 md:space-y-20">
              {[0, 1].map((index) => (
                <ExperienceNodeWrapper
                  key={`${timelineView}-${index}`}
                  timelineView={timelineView}
                  workData={workData[index]}
                  educationData={educationData[index]}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-32 px-6 bg-white dark:bg-black overflow-hidden">
        {/* Subtle Parallax Background for Skills */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle, gray 1px, transparent 1px)`,
              backgroundSize: "45px 45px",
              transform: `translateY(${sectionOffsets.skills ? sectionOffsets.skills * 0.3 : 0}px)`,
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-black dark:text-white mb-4">
              Skills
            </h2>
            <div className="w-24 h-1 bg-black dark:bg-white mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsData.map((skill, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-black transition-all duration-300 hover:border-black dark:hover:border-white hover:shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 shrink-0">
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white">
                    {skill.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Currently Learning Section */}
          <div className="mt-20">
            <hr className="border-gray-300 dark:border-gray-700 mb-12" />
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2">
                Currently Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Expanding my skill set with emerging technologies
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentlyLearningData.map((skill, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-black transition-all duration-300 hover:border-black dark:hover:border-white hover:shadow-lg opacity-90"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-12 h-12 shrink-0">
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-black dark:text-white">
                      {skill.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-32 px-6 bg-gray-50 dark:bg-gray-950 overflow-hidden">
        {/* Subtle Parallax Background for Projects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle, gray 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
              transform: `translateY(${sectionOffsets.projects ? sectionOffsets.projects * 0.3 : 0}px)`,
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-black dark:text-white mb-4">
              Projects
            </h2>
            <div className="w-24 h-1 bg-black dark:bg-white mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-black transition-all duration-300 hover:border-black dark:hover:border-white hover:shadow-2xl"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-900">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.website && (
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-black dark:text-white hover:underline"
                      >
                        Live Demo →
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                      >
                        GitHub →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section id="languages" className="relative py-32 px-6 bg-white dark:bg-black overflow-hidden">
        {/* Subtle Parallax Background for Languages */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle, gray 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
              transform: `translateY(${sectionOffsets.languages ? sectionOffsets.languages * 0.3 : 0}px)`,
            }}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-black dark:text-white mb-4">
              Languages
            </h2>
            <div className="w-24 h-1 bg-black dark:bg-white mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {languagesData.map((lang, index) => (
              <div
                key={index}
                className="p-8 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-black transition-all duration-300 hover:border-black dark:hover:border-white"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-black dark:text-white">
                    {lang.language}
                  </h3>
                  <span className="px-3 py-1 text-sm font-medium bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
                    {lang.level}
                  </span>
                </div>
                <p className="text-lg mb-2 text-gray-800 dark:text-gray-200">
                  {lang.text}
                </p>
                {lang.translation && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    {lang.translation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}

// Location Icon Component - Reusable
function LocationIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

// Experience Node Wrapper Component - Symmetrical with Continuous Line
function ExperienceNodeWrapper({
  timelineView,
  workData,
  educationData,
}: {
  timelineView: "work" | "education";
  workData: WorkExperience | undefined;
  educationData: Education | undefined;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const data = timelineView === "work" ? workData : educationData;
  const type = timelineView === "work" ? "work" : "education";

  return (
    <div className="relative flex flex-col items-center">
      {/* Centered Content Box - Connected to continuous line */}
      <div className="w-full max-w-2xl mx-auto relative z-10">
        <div className={`p-4 md:p-6 rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-black flex flex-col transition-all duration-300 ${
          isExpanded ? "h-auto" : "h-auto md:h-[350px]"
        }`}>
          <TimelineContent
            key={`${type}-${data?.title || 'empty'}`}
            data={data}
            type={type}
            isExpanded={isExpanded}
            onToggleExpand={() => setIsExpanded(!isExpanded)}
          />
        </div>
      </div>
    </div>
  );
}

// Timeline Content Component - Only content changes
function TimelineContent({
  data,
  type,
  isExpanded,
  onToggleExpand,
}: {
  data: WorkExperience | Education | undefined;
  type: "work" | "education";
  isExpanded: boolean;
  onToggleExpand: () => void;
}) {
  if (!data) return null;

  const isWork = type === "work" && "description" in data;
  const isEducation = type === "education" && "cgpa" in data;
  const hasExpandableContent = isWork && data.description && data.description.length > 2;

  return (
    <div className={`animate-fade-in-up flex flex-col ${isEducation ? "h-full" : ""}`}>
      {/* Logo on top - Left aligned */}
      <div className="mb-4 flex justify-start">
        <div className="relative h-8 w-auto">
          <Image
            src={data.icon}
            alt={data.title}
            width={100}
            height={32}
            className="h-8 w-auto object-contain object-left"
          />
        </div>
      </div>

      {/* Text content below */}
      <div className="mb-4">
        <h3 className="text-lg md:text-xl font-bold text-black dark:text-white mb-1 wrap-break-word">
          {data.title}
        </h3>
        <p className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 mb-2 wrap-break-word">
          {data.subtitle}
        </p>
        {isEducation ? (
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-3">
            <p>{data.period}</p>
            <p className="flex items-center gap-1 mt-1">
              <LocationIcon />
              {data.location}
            </p>
          </div>
        ) : (
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 flex flex-wrap items-center gap-1.5">
            <span>{data.period}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <LocationIcon />
              {data.location}
            </span>
          </p>
        )}
      </div>

      {/* Description/Content Section */}
      <div className={`mb-3 ${isEducation ? "flex-1" : ""}`}>
        {isWork && data.description && (
          <div className="relative">
            <ul className={`text-gray-600 dark:text-gray-400 space-y-2 text-left list-disc pl-5 ${
              isExpanded ? "" : "max-h-24 md:max-h-24 overflow-hidden"
            }`}>
              {(isExpanded ? data.description : data.description.slice(0, 2)).map((item: string, idx: number) => (
                <li key={idx} className="text-xs sm:text-sm wrap-break-word ml-2">
                  {item}
                </li>
              ))}
            </ul>
            {/* Gradient fade overlay when collapsed */}
            {!isExpanded && hasExpandableContent && (
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-linear-to-t from-white via-white/80 to-transparent dark:from-black dark:via-black/80 pointer-events-none"></div>
            )}
          </div>
        )}

        {isEducation && data.cgpa && data.cgpa !== "N/A" && (
          <p className="text-sm md:text-base font-medium text-black dark:text-white mb-1 wrap-break-word">
            CGPA: {data.cgpa}
          </p>
        )}
      </div>

      {/* Expand/Collapse button - Outside scrollable area */}
      {isWork && hasExpandableContent && (
        <div className="shrink-0 mb-2">
          <button
            onClick={onToggleExpand}
            className="flex items-center gap-1 text-xs font-medium text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
          >
            <span>{isExpanded ? "Read less" : "Read more"}</span>
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Always reserve space for bottom section to prevent layout shift */}
      <div className="mt-auto pt-3 border-t-2 border-gray-200 dark:border-gray-800 min-h-[40px] flex items-center">
        {isWork && data.specialization ? (
          <p className="text-xs font-medium text-black dark:text-white wrap-break-word">
            {data.specialization}
          </p>
        ) : isEducation && data.honors && data.honors !== "N/A" ? (
          <p className="text-xs text-gray-600 dark:text-gray-400 italic wrap-break-word">
            {data.honors}
          </p>
        ) : (
          <div className="text-xs font-medium text-transparent">Placeholder</div>
        )}
      </div>
    </div>
  );
}

// Contact Section Component
function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // EmailJS configuration from environment variables
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    // Fallback to mailto if EmailJS is not configured
    if (!serviceId || !templateId || !publicKey) {
      const mailtoLink = `mailto:attanavaid@gmail.com?subject=${encodeURIComponent(
        formData.subject || "Portfolio Contact"
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoLink;
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 3000);
      return;
    }

    // Initialize EmailJS with public key
    emailjs.init(publicKey);

    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: "attanavaid@gmail.com",
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6 bg-linear-to-b from-white to-gray-50 dark:from-black dark:to-gray-950 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 border-2 border-gray-300 dark:border-gray-700 opacity-20 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 border-2 border-gray-300 dark:border-gray-700 opacity-10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div
            className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02]"
            style={{
              backgroundImage: `
                radial-gradient(circle, gray 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-black dark:text-white mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-black dark:text-white mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-black border-2 border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-black dark:focus:border-white transition-colors text-black dark:text-white"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black dark:text-white mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-black border-2 border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-black dark:focus:border-white transition-colors text-black dark:text-white"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-black dark:text-white mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-black border-2 border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-black dark:focus:border-white transition-colors text-black dark:text-white"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-black dark:text-white mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white dark:bg-black border-2 border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-black dark:focus:border-white transition-colors resize-none text-black dark:text-white"
                  placeholder="Tell me about your project or just say hello..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {submitStatus === "success" && (
                <div className="p-4 bg-gray-100 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-lg text-center">
                  <p className="text-black dark:text-white font-medium">
                    {process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
                      ? "✓ Message sent successfully! I'll get back to you soon."
                      : "✓ Your email client should open shortly."}
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 bg-gray-100 dark:bg-gray-900 border-2 border-red-300 dark:border-red-700 rounded-lg text-center">
                  <p className="text-red-600 dark:text-red-400 font-medium">
                    Something went wrong. Please try again or email directly.
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Contact Info & Social Links */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="p-8 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-black">
              <h3 className="text-2xl font-bold text-black dark:text-white mb-6">
                Let&apos;s Connect
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>

              {/* Direct Email */}
              <a
                href="mailto:attanavaid@gmail.com"
                className="flex items-center gap-4 p-4 rounded-lg border-2 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all duration-300 mb-6 group"
              >
                <div className="w-12 h-12 rounded-full bg-black dark:bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white dark:text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                  <p className="text-lg font-medium text-black dark:text-white">
                    attanavaid@gmail.com
                  </p>
                </div>
              </a>

              {/* Social Links */}
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
                  Find me on
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://github.com/attanavaid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all duration-300 hover:scale-110"
                    aria-label="GitHub"
                  >
                    <svg
                      className="w-6 h-6 text-black dark:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/in/attanavaid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all duration-300 hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <svg
                      className="w-6 h-6 text-black dark:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Stats or Info */}
            <div className="p-8 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-black">
              <h4 className="text-lg font-bold text-black dark:text-white mb-4">
                Response Time
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                I typically respond within 24-48 hours. For urgent matters, feel free to reach out directly via email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

