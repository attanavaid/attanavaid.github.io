"use client";

import { useState } from "react";
import type { WorkExperience, Education } from "@/types";
import ExperienceNodeWrapper from "./ExperienceNodeWrapper";

interface ExperienceSectionProps {
  sectionOffset: number;
  workData: WorkExperience[];
  educationData: Education[];
}

export default function ExperienceSection({ sectionOffset, workData, educationData }: ExperienceSectionProps) {
  const [timelineView, setTimelineView] = useState<"work" | "education">("work");

  return (
    <section id="experience" className="relative py-8 sm:py-12 md:py-18 lg:py-32 px-6 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, gray 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            transform: `translateY(${sectionOffset * 0.25}px)`,
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
          <div className="relative inline-flex items-center justify-center gap-2 mb-12 p-1 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-full border-2 border-gray-300 dark:border-gray-700">
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
  );
}

