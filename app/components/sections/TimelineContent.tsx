"use client";

import Image from "next/image";
import type { WorkExperience, Education } from "@/types";
import LocationIcon from "../ui/LocationIcon";

interface TimelineContentProps {
  data: WorkExperience | Education | undefined;
  type: "work" | "education";
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function TimelineContent({
  data,
  type,
  isExpanded,
  onToggleExpand,
}: TimelineContentProps) {
  if (!data) return null;

  const isWork = type === "work" && "description" in data;
  const isEducation = type === "education" && "cgpa" in data;
  const hasExpandableContent = isWork && data.description && data.description.length > 2;

  return (
    <div className={`animate-fade-in-up flex flex-col ${isEducation ? "h-full" : ""}`}>
      {/* Logo on top - Left aligned */}
      <div className="mb-4 flex justify-start">
        <div className="relative h-10 w-auto">
          <Image
            src={data.icon}
            alt={data.title}
            width={100}
            height={32}
            className={`h-10 w-auto object-contain object-left ${data.icon === "/work/lp2.png" ? "dark:bg-transparent bg-gray-600 rounded-lg p-1" : ""}`}
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
            <ul className={`text-gray-600 dark:text-gray-400 space-y-2 text-left list-disc pl-5 overflow-hidden transition-[max-height] duration-500 ease-in-out ${
              isExpanded ? "max-h-[800px]" : "max-h-24 md:max-h-24"
            }`}>
              {data.description.map((item: string, idx: number) => (
                <li key={idx} className="text-xs sm:text-sm wrap-break-word ml-2">
                  {item}
                </li>
              ))}
            </ul>
            {/* Gradient fade overlay when collapsed */}
            <div className={`absolute bottom-0 left-0 right-0 h-10 bg-linear-to-t from-white via-white/80 to-transparent dark:from-black dark:via-black/80 pointer-events-none transition-opacity duration-500 ${
              !isExpanded && hasExpandableContent ? "opacity-100" : "opacity-0"
            }`}></div>
          </div>
        )}

        {isEducation && data.cgpa && data.cgpa !== "N/A" && (
          <p className="text-sm md:text-base font-medium text-black dark:text-white mb-1 wrap-break-word">
            CGPA: {data.cgpa}
          </p>
        )}
      </div>

      {/* Expand/Collapse button */}
      {isWork && hasExpandableContent && (
        <div className="shrink-0 mb-3">
          <button
            onClick={onToggleExpand}
            className="flex items-center gap-1 text-xs font-medium text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors cursor-pointer"
          >
            <span>{isExpanded ? "Show less" : "Read more"}</span>
            <svg
              className={`w-4 h-4 transition-transform duration-500 ease-in-out ${isExpanded ? "rotate-180" : ""}`}
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

      {/* Bottom border section */}
      <div className="mt-auto pt-3 border-t-2 border-gray-200 dark:border-gray-800 min-h-[40px]">
        {isEducation && data.honors && data.honors !== "N/A" ? (
          <p className="text-xs text-gray-600 dark:text-gray-400 italic wrap-break-word">
            {data.honors}
          </p>
        ) : isWork && data.specialization ? (
          /* Tech Stack - Below the border line */
          <div className="flex flex-wrap gap-2">
            {data.specialization.map((tech, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:scale-105"
              >
                {tech.logo && (
                  <div className="relative w-5 h-5 shrink-0">
                    <Image
                      src={`/skills/tech/${tech.logo}`}
                      alt={tech.name}
                      fill
                      className="object-contain tech-logo"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <span>{tech.name}</span>
              </span>
            ))}
          </div>
        ) : (
          <div className="text-xs font-medium text-transparent">Placeholder</div>
        )}
      </div>
    </div>
  );
}
