"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ExternalLink, X } from "lucide-react";
import type { Project } from "@/types";

// Helper function to check if a file is a video
const isVideoFile = (path: string): boolean => {
  const videoExtensions = ['.mp4', '.webm', '.mov', '.ogg'];
  return videoExtensions.some(ext => path.toLowerCase().endsWith(ext));
};

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Handle ESC key to close modal
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-white dark:bg-black border-2 border-gray-300 dark:border-gray-700 rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white dark:bg-black border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-black dark:text-white" />
        </button>

        {/* Project Image/Video */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-gray-100 dark:bg-gray-900 shrink-0">
          {isVideoFile(project.image) ? (
            <>
              {/* Blurred background for video */}
              <div className="absolute inset-0">
                <video
                  src={project.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover blur-2xl scale-110 opacity-50"
                />
              </div>
              {/* Main video */}
              <div className="relative w-full h-full">
                <video
                  src={project.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            </>
          ) : (
            <>
              {/* Blurred background */}
              <div className="absolute inset-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover blur-2xl scale-110 opacity-50"
                />
              </div>
              {/* Main image */}
              <div className="relative w-full h-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-contain"
                />
              </div>
            </>
          )}
        </div>

        {/* Project Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4 pr-12">
            {project.title}
          </h2>

          {/* Full Description */}
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Full Tech Stack */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-black dark:text-white mb-3">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-800"
                >
                  {tag.logo && (
                    <div className="relative w-6 h-6 shrink-0">
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
            </div>
          </div>
        </div>

        {/* Links - Fixed at bottom, not scrollable */}
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start pt-4 px-6 sm:px-8 pb-6 sm:pb-8 border-t border-gray-200 dark:border-gray-800 shrink-0 bg-white dark:bg-black">
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white hover:border-black dark:hover:border-white hover:bg-gray-50 dark:hover:bg-gray-950 transition-all duration-300"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-600 dark:text-gray-400 hover:border-gray-600 dark:hover:border-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-950 transition-all duration-300"
            >
              <div className="relative w-4 h-4">
                <Image
                  src="/skills/tech/github.svg"
                  alt="GitHub"
                  fill
                  className="object-contain tech-logo"
                />
              </div>
              <span>GitHub</span>
            </a>
          )}
          {project.video && (
            <a
              href={project.video}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-red-600 dark:text-red-400 hover:border-red-600 dark:hover:border-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-300"
            >
              <div className="relative w-4 h-4">
                <Image
                  src="/skills/tech/youtube.svg"
                  alt="YouTube"
                  fill
                  className="object-contain tech-logo"
                />
              </div>
              <span>YouTube</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

