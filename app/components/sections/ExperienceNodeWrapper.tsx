"use client";

import { useState } from "react";
import type { WorkExperience, Education } from "@/types";
import TimelineContent from "./TimelineContent";

interface ExperienceNodeWrapperProps {
  timelineView: "work" | "education";
  workData: WorkExperience | undefined;
  educationData: Education | undefined;
}

export default function ExperienceNodeWrapper({
  timelineView,
  workData,
  educationData,
}: ExperienceNodeWrapperProps) {
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

