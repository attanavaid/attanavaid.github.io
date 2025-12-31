"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { projectsData } from "@/data/projectsData";

interface ProjectsSectionProps {
  sectionOffset: number;
}

// Mapping function to get tech SVG path
const getTechSvgPath = (tag: string): string | null => {
  const techMap: Record<string, string> = {
    javascript: "javascript.svg",
    typescript: "typescript.svg",
    react: "react.svg",
    "nextjs": "nextjs.svg",
    "next.js": "nextjs.svg",
    vue: "vue.svg",
    angular: "angular.svg",
    svelte: "svelte.svg",
    node: "nodejs.svg",
    "nodejs": "nodejs.svg",
    express: "express.svg",
    django: "django.svg",
    flask: "flask.svg",
    python: "python.svg",
    mongodb: "mongodb.svg",
    mysql: "mysql.svg",
    postgresql: "postgresql.svg",
    sqlite: "sqlite.svg",
    "sqlite3": "sqlite.svg",
    prisma: "prisma.svg",
    tailwind: "tailwindcss.svg",
    "tailwindcss": "tailwindcss.svg",
    bootstrap: "bootstrap.svg",
    mui: "mui.svg",
    redux: "redux.svg",
    jquery: "jquery.svg",
    solidity: "solidity.svg",
    hardhat: "hardhat.svg",
    metamask: "metamask.svg",
    alchemy: "alchemy.svg",
    html: "html.svg",
    css: "css.svg",
    sass: "sass.svg",
    vite: "vite.svg",
    docker: "docker.svg",
    kubernetes: "kubernetes.svg",
    git: "git.svg",
    github: "github.svg",
    vercel: "vercel.svg",
    netlify: "netlify.svg",
    render: "render.svg",
    supabase: "supabase.svg",
    clerk: "clerk.svg",
    graphql: "graphql.svg",
    restapi: "restapi.svg",
    "c-sharp": "dotnet.svg",
    "c#": "dotnet.svg",
    dotnet: "dotnet.svg",
    cplusplus: "cplusplus.svg",
    "c++": "cplusplus.svg",
    tensorflow: "tensorflow.svg",
    keras: "keras.svg",
    scikitlearn: "scikitlearn.svg",
    unity: "unity.svg",
    unreal: "unrealengine.svg",
    "unrealengine": "unrealengine.svg",
    blender: "blender.svg",
    figma: "figma.svg",
    prettier: "prettier.svg",
    cursor: "cursor.svg",
    robloxstudio: "robloxstudio.svg",
    flutter: "flutter.svg",
    kotlin: "kotlin.svg",
    expo: "expo.svg",
    rubyonrails: "rubyonrails.svg",
    perl: "perl.svg",
    racket: "racket.svg",
    lua: "lua.svg",
    jupyter: "jupyter.svg",
    anaconda: "anaconda.svg",
    amazonaws: "amazonaws.svg",
    xampp: "xampp.svg",
    phpmyadmin: "phpmyadmin.svg",
    rapidapi: "rapid.svg",
    "rapid": "rapid.svg",
    shadcnui: "shadcnui.svg",
    "shadcn": "shadcnui.svg",
  };

  const normalizedTag = tag.toLowerCase().replace(/\s+/g, "");
  return techMap[normalizedTag] || null;
};

// Capitalize tech name
const capitalizeTech = (tag: string): string => {
  return tag
    .split(/[-_\s]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export default function ProjectsSection({ sectionOffset }: ProjectsSectionProps) {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isHidingProjects, setIsHidingProjects] = useState(false);
  const projectsHeaderRef = useRef<HTMLDivElement>(null);

  return (
    <section id="projects" className="relative py-32 px-6 bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {/* Subtle Parallax Background for Projects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, gray 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            transform: `translateY(${sectionOffset * 0.3}px)`,
          }}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div ref={projectsHeaderRef} className="text-center mb-20">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-black dark:text-white mb-4">
            Projects
          </h2>
          <div className="w-24 h-1 bg-black dark:bg-white mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => {
            const isVisible = showAllProjects || index < 3;
            const isExiting = isHidingProjects && index >= 3;
            
            if (!isVisible && !isExiting) {
              return null;
            }
            
            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-black transition-all duration-300 hover:border-black dark:hover:border-white hover:shadow-2xl flex flex-col project-card ${
                  isExiting ? 'project-card-exit' : 'project-card-enter'
                }`}
                style={
                  isExiting
                    ? {
                        animation: `fade-out-down 0.5s ease-in ${(projectsData.length - 1 - index) * 30}ms forwards`,
                      }
                    : {
                        animation: `fade-in-up 0.6s ease-out ${showAllProjects && index >= 3 ? (index - 3) * 50 : 0}ms forwards`,
                        opacity: 0,
                      }
                }
              >
              <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-900">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6 flex flex-col grow">
                <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 grow">
                  {project.description}
                </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 5).map((tag, tagIndex) => {
                      const svgPath = getTechSvgPath(tag);
                      return (
                        <span
                          key={tagIndex}
                          className="px-3 py-1.5 text-xs font-medium bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full flex items-center gap-1.5"
                        >
                          {svgPath && (
                            <Image
                              src={`/skills/tech/${svgPath}`}
                              alt={tag}
                              width={14}
                              height={14}
                              className="object-contain"
                            />
                          )}
                          {capitalizeTech(tag)}
                        </span>
                      );
                    })}
                    {project.tags.length > 5 && (
                      <span className="px-3 py-1.5 text-xs font-medium bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
                        +{project.tags.length - 5}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 mt-auto pt-2 border-t border-gray-200 dark:border-gray-800">
                    {project.website && (
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-black dark:text-white hover:underline flex items-center gap-1 transition-colors"
                      >
                        <span>Live Demo</span>
                        <span>→</span>
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <span>GitHub</span>
                        <span>→</span>
                      </a>
                    )}
                    {project.video && (
                      <a
                        href={project.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 flex items-center gap-1 transition-colors"
                      >
                        <span>YouTube</span>
                        <span>→</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show More/Less Button with smooth transition */}
        {projectsData.length > 3 && (
          <div className="flex justify-center mt-12 mb-8">
            <button
              onClick={() => {
                if (showAllProjects) {
                  // Show Less: Start exit animations, then scroll, then hide
                  setIsHidingProjects(true);
                  
                  // Wait for exit animations to complete, then scroll and update state
                  setTimeout(() => {
                    // Scroll to projects header smoothly
                    if (projectsHeaderRef.current) {
                      projectsHeaderRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      });
                    }
                    
                    // Update state after scroll starts
                    setTimeout(() => {
                      setShowAllProjects(false);
                      setIsHidingProjects(false);
                    }, 100);
                  }, 300); // Start scroll after exit animations begin
                } else {
                  // Show More: Just expand
                  setShowAllProjects(true);
                }
              }}
              className="group flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white font-medium transition-all duration-500 hover:border-black dark:hover:border-white hover:shadow-xl hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-950"
            >
              <span className="transition-all duration-300">{showAllProjects ? "Show Less" : "Show More Projects"}</span>
              <svg
                className={`w-5 h-5 transition-transform duration-500 ${showAllProjects ? "rotate-180" : ""}`}
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
      </div>
    </section>
  );
}

