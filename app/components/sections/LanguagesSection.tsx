"use client";

import { languagesData } from "@/data/languagesData";

interface LanguagesSectionProps {
  sectionOffset: number;
}

export default function LanguagesSection({ sectionOffset }: LanguagesSectionProps) {
  return (
    <section id="languages" className="relative py-32 px-6 bg-white dark:bg-black overflow-hidden">
      {/* Subtle Parallax Background for Languages */}
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
  );
}

