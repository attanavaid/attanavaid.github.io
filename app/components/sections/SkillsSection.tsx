"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { skillsData } from "@/data/skillsData";
import { currentlyLearningData } from "@/data/currentlyLearningData";
import { getTechInfo } from "../utils/getTechInfo";

interface SkillsSectionProps {
  sectionOffset: number;
}

export default function SkillsSection({ sectionOffset }: SkillsSectionProps) {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [isHidingSkills, setIsHidingSkills] = useState(false);
  const skillsHeaderRef = useRef<HTMLDivElement>(null);

  return (
    <section id="skills" className="relative py-8 sm:py-12 md:py-18 lg:py-32 px-6 overflow-hidden">
      {/* Subtle Parallax Background for Skills */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, gray 1px, transparent 1px)`,
            backgroundSize: "45px 45px",
            transform: `translateY(${sectionOffset * 0.3}px)`,
          }}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div ref={skillsHeaderRef} className="text-center mb-20">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-black dark:text-white mb-4">
            Skills
          </h2>
          <div className="w-24 h-1 bg-black dark:bg-white mx-auto"></div>
        </div>
        
        {/* Skills Grid - Show first 6 initially with smooth transitions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((skill, index) => {
            const isVisible = showAllSkills || index < 6;
            const isExiting = isHidingSkills && index >= 6;
            
            if (!isVisible && !isExiting) {
              return null;
            }
            
            return (
              <div
                key={`${skill.name}-${index}`}
                className={`group p-6 rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-black hover:border-black dark:hover:border-white hover:shadow-xl duration-300 skill-card ${
                  isExiting ? 'skill-card-exit' : 'skill-card-enter'
                }`}
                style={
                  isExiting
                    ? {
                        animation: `fade-out-down 0.5s ease-in ${(skillsData.length - 1 - index) * 30}ms forwards`,
                      }
                    : {
                        animation: `fade-in-up 0.6s ease-out ${showAllSkills && index >= 6 ? (index - 6) * 50 : 0}ms forwards`,
                        opacity: 0,
                      }
                }
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative w-14 h-14 shrink-0 rounded-lg">
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                    {skill.name}
                  </h3>
                </div>
                
                {/* Tech Stack with Logos */}
                <div className="flex flex-wrap gap-2.5">
                  {skill.tech.map((tech, techIndex) => {
                    const techInfo = getTechInfo(tech);
                    return (
                      <span
                        key={techIndex}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:scale-105"
                      >
                        {techInfo.logo && (
                          <div className="relative w-6 h-6 shrink-0">
                            <Image
                              src={techInfo.logo}
                              alt={techInfo.name}
                              fill
                              className="object-contain tech-logo"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        <span>{techInfo.name}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Currently Learning Section - Only visible when expanded, positioned above button */}
        <div 
          className={`mt-12 overflow-hidden transition-all duration-500 ease-in-out ${
            showAllSkills && !isHidingSkills ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="mb-12">
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
              {currentlyLearningData.map((skill, index) => {
                return (
                  <div
                    key={index}
                    className={`group p-6 rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-black transition-all duration-500 hover:border-black dark:hover:border-white hover:shadow-xl opacity-90 currently-learning-card ${
                      showAllSkills ? 'currently-learning-card-visible' : 'currently-learning-card-hidden'
                    }`}
                    style={{
                      transitionDelay: showAllSkills ? `${(skillsData.length + index) * 50}ms` : '0ms',
                    }}
                  >
                    <div className="flex items-center gap-4 mb-5">
                      <div className="relative w-14 h-14 shrink-0 rounded-lg">
                        <Image
                          src={skill.icon}
                          alt={skill.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-black dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                        {skill.name}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {skill.tech.map((tech, techIndex) => {
                        const techInfo = getTechInfo(tech);
                        return (
                          <span
                            key={techIndex}
                            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:scale-105"
                          >
                            {techInfo.logo && (
                              <div className="relative w-6 h-6 shrink-0">
                                <Image
                                  src={techInfo.logo}
                                  alt={techInfo.name}
                                  fill
                                  className="object-contain tech-logo"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              </div>
                            )}
                            <span>{techInfo.name}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Show More/Less Button with smooth transition */}
        <div className="flex justify-center mt-12 mb-8">
          <button
            onClick={() => {
              if (showAllSkills) {
                // Show Less: Start exit animations, then scroll, then hide
                setIsHidingSkills(true);
                
                // Wait for exit animations to complete, then scroll and update state
                setTimeout(() => {
                  // Scroll to skills header smoothly
                  if (skillsHeaderRef.current) {
                    skillsHeaderRef.current.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }
                  
                  // Update state after scroll starts
                  setTimeout(() => {
                    setShowAllSkills(false);
                    setIsHidingSkills(false);
                  }, 100);
                }, 300); // Start scroll after exit animations begin
              } else {
                // Show More: Just expand
                setShowAllSkills(true);
              }
            }}
            className="group flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white font-medium transition-all duration-500 hover:border-black dark:hover:border-white hover:shadow-xl hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-950"
          >
            <span className="transition-all duration-300">{showAllSkills ? "Show Less" : "Show More Skills"}</span>
            <svg
              className={`w-5 h-5 transition-transform duration-500 ${showAllSkills ? "rotate-180" : ""}`}
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
      </div>
    </section>
  );
}

