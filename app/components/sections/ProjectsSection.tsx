"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ExternalLink, Minus, ChevronDown, ChevronUp, Maximize2 } from "lucide-react";
import { projectsData } from "@/data/projectsData";
import ProjectModal from "./ProjectModal";
import { commonImages } from "../utils/imageImports";
import { isVideoFile } from "../utils/videoUtils";

interface ProjectsSectionProps {
  sectionOffset: number;
}

export default function ProjectsSection({ sectionOffset }: ProjectsSectionProps) {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isHidingProjects, setIsHidingProjects] = useState(false);
  const [expandedTechStacks, setExpandedTechStacks] = useState<Set<number>>(new Set());
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<number>>(new Set());
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
  const projectsHeaderRef = useRef<HTMLDivElement>(null);

  const toggleTechStack = (projectIndex: number) => {
    setExpandedTechStacks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(projectIndex)) {
        newSet.delete(projectIndex);
      } else {
        newSet.add(projectIndex);
      }
      return newSet;
    });
  };

  const toggleDescription = (projectIndex: number) => {
    setExpandedDescriptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(projectIndex)) {
        newSet.delete(projectIndex);
      } else {
        newSet.add(projectIndex);
      }
      return newSet;
    });
  };

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
                {isVideoFile(project.image) ? (
                  <video
                    src={project.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload={index < 3 ? "auto" : "metadata"}
                    className="w-full h-full object-cover"
                    aria-label={`${project.title} video preview`}
                  />
                ) : (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenModalIndex(index);
                  }}
                  className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/40 transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
                  aria-label="View project details"
                >
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-black border-2 border-white dark:border-gray-800 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                    <Maximize2 className="w-6 h-6 text-black dark:text-white" />
                  </div>
                </button>
              </div>
              <div className="p-6 flex flex-col grow">
                <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
                  {project.title}
                </h3>
                <div className="mb-4 grow">
                  <p className={`text-gray-600 dark:text-gray-400 transition-all duration-300 ${
                    expandedDescriptions.has(index) ? '' : 'line-clamp-3'
                  }`}>
                    {project.description}
                  </p>
                  {project.description.length > 150 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDescription(index);
                      }}
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                    >
                      <span>{expandedDescriptions.has(index) ? 'Read less' : 'Read more'}</span>
                      {expandedDescriptions.has(index) ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
                {/* Tech Stack with Logos - Matching Skills Section */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {(expandedTechStacks.has(index) ? project.tags : project.tags.slice(0, 5)).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:scale-105"
                    >
                      {tag.logo && (
                        <div className="relative w-5 h-5 shrink-0">
                          <Image
                            src={`/skills/tech/${tag.logo}`}
                            alt={tag.name}
                            fill
                            className="object-contain tech-logo"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      <span>{tag.name}</span>
                    </span>
                  ))}
                  {project.tags.length > 5 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTechStack(index);
                      }}
                      className="inline-flex items-center justify-center w-7 h-7 rounded-full border-2 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110"
                      aria-label={expandedTechStacks.has(index) ? "Collapse tech stack" : `Show ${project.tags.length - 5} more technologies`}
                      title={expandedTechStacks.has(index) ? "Collapse" : `+${project.tags.length - 5}`}
                    >
                      {expandedTechStacks.has(index) ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-semibold">+{project.tags.length - 5}</span>
                      )}
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-3 mt-auto pt-3 border-t border-gray-200 dark:border-gray-800">
                  {project.website && (
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-10 h-10 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white hover:border-black dark:hover:border-white hover:bg-gray-50 dark:hover:bg-gray-950 transition-all duration-300 hover:scale-110"
                      aria-label="Live Demo"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-10 h-10 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-600 dark:text-gray-400 hover:border-gray-600 dark:hover:border-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-950 transition-all duration-300 hover:scale-110"
                      aria-label="GitHub Repository"
                      title="GitHub Repository"
                    >
                      <div className="relative w-5 h-5">
                        <Image
                          src={commonImages.githubLogo}
                          alt="GitHub"
                          fill
                          className="object-contain tech-logo"
                        />
                      </div>
                    </a>
                  )}
                  {project.video && (
                    <a
                      href={project.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-10 h-10 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-red-600 dark:text-red-400 hover:border-red-600 dark:hover:border-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-300 hover:scale-110"
                      aria-label="YouTube Video"
                      title="YouTube Video"
                    >
                      <div className="relative w-5 h-5">
                        <Image
                          src={commonImages.youtubeLogo}
                          alt="YouTube"
                          fill
                          className="object-contain tech-logo"
                        />
                      </div>
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

      {/* Project Detail Modal */}
      {openModalIndex !== null && (
        <ProjectModal
          project={projectsData[openModalIndex]}
          isOpen={openModalIndex !== null}
          onClose={() => setOpenModalIndex(null)}
        />
      )}
    </section>
  );
}

