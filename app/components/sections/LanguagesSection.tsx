"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Typewriter from "typewriter-effect";
import { languagesData } from "@/data/languagesData";
import { TextAnimate } from "@/app/components/ui/text-animate";

interface LanguagesSectionProps {
  sectionOffset: number;
}

export default function LanguagesSection({ sectionOffset }: LanguagesSectionProps) {
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);
  const [key, setKey] = useState(0); // Key to force re-render of Typewriter components
  const isManualSelectionRef = useRef(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const textTypewriterRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const translationTypewriterRef = useRef<any>(null);
  const translationStartedRef = useRef(false);

  const currentLang = languagesData[currentLanguageIndex];
  const isRTL = currentLang.text.match(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/);
  const isDevanagari = currentLang.text.match(/[\u0900-\u097F]/);

  // Cleanup function for typewriters
  const cleanupTypewriters = useCallback(() => {
    if (textTypewriterRef.current) {
      try {
        textTypewriterRef.current.stop();
        textTypewriterRef.current.deleteAll();
      } catch {
        // Ignore errors if typewriter is not initialized
      }
    }
    if (translationTypewriterRef.current) {
      try {
        translationTypewriterRef.current.stop();
        translationTypewriterRef.current.deleteAll();
      } catch {
        // Ignore errors if typewriter is not initialized
      }
    }
    translationStartedRef.current = false;
  }, []);

  // Handle manual language selection
  const handleLanguageSelect = useCallback((index: number) => {
    // Clear any pending resume timeout
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }

    // Cleanup typewriters immediately
    cleanupTypewriters();

    // Set manual selection and update language
    isManualSelectionRef.current = true;
    setCurrentLanguageIndex(index);
    setKey((prev) => prev + 1);
    
    // Resume auto-cycling after 5 seconds
    resumeTimeoutRef.current = setTimeout(() => {
      isManualSelectionRef.current = false;
      translationStartedRef.current = false;
      const nextIndex = (index + 1) % languagesData.length;
      setCurrentLanguageIndex(nextIndex);
      setKey((prev) => prev + 1);
      resumeTimeoutRef.current = null;
    }, 5000);
  }, [cleanupTypewriters]);

  // Move to next language after translation completes
  const moveToNextLanguage = useCallback(() => {
    if (!isManualSelectionRef.current) {
      translationStartedRef.current = false;
      setCurrentLanguageIndex((prev) => (prev + 1) % languagesData.length);
      setKey((prev) => prev + 1);
    }
  }, []);

  // Reset translation flag when language changes
  useEffect(() => {
    translationStartedRef.current = false;
  }, [currentLanguageIndex, key]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupTypewriters();
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [cleanupTypewriters]);

  return (
    <section id="languages" className="relative py-8 sm:py-12 md:py-18 lg:py-32 px-6 overflow-hidden">
      {/* Subtle Parallax Background */}
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
        <div className="text-center mb-12">
          <TextAnimate 
            animation="blurIn" 
            as="h2"
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-black dark:text-white mb-4"
          >
            Languages
          </TextAnimate>
        </div>

        {/* Typewriter Display Area */}
        <div className="mb-12">
          <div className="bg-white dark:bg-black rounded-xl p-6 sm:p-8 min-h-[200px] flex flex-col justify-center">
            {/* Language Name and Level */}
            <div className="mb-4 flex items-baseline gap-3 flex-wrap">
              <h3 className="text-2xl sm:text-3xl font-bold text-black dark:text-white">
                {currentLang.language}
              </h3>
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium italic">
                Fluency: {currentLang.level}
              </span>
            </div>

            {/* Native Text with Typewriter Effect */}
            <div className="mb-4">
              <div
                className={`text-xl sm:text-2xl leading-relaxed font-medium text-gray-900 dark:text-gray-100 min-h-12 ${
                  isRTL ? 'text-right' : isDevanagari ? 'text-left' : 'text-left'
                }`}
              >
                <Typewriter
                  key={`text-${key}`}
                  onInit={(typewriter) => {
                    textTypewriterRef.current = typewriter;
                    if (isManualSelectionRef.current) {
                      // For manual selection, type very fast (appears instant)
                      typewriter
                        .changeDelay(1)
                        .typeString(currentLang.text)
                        .start();
                    } else {
                      if (currentLang.translation) {
                        // Type text, pause, then trigger translation
                        typewriter
                          .changeDelay(50)
                          .typeString(currentLang.text)
                          .pauseFor(1500)
                          .callFunction(() => {
                            // Ensure translation typewriter is ready and hasn't started
                            if (translationTypewriterRef.current && !translationStartedRef.current && !isManualSelectionRef.current) {
                              translationStartedRef.current = true;
                              translationTypewriterRef.current
                                .stop()
                                .deleteAll()
                                .changeDelay(30)
                                .typeString(currentLang.translation!)
                                .pauseFor(2500)
                                .callFunction(() => {
                                  if (!isManualSelectionRef.current) {
                                    moveToNextLanguage();
                                  }
                                })
                                .start();
                            }
                          })
                          .start();
                      } else {
                        // No translation, type text, wait, then move to next language
                        typewriter
                          .changeDelay(50)
                          .typeString(currentLang.text)
                          .pauseFor(2000)
                          .callFunction(() => {
                            if (!isManualSelectionRef.current) {
                              moveToNextLanguage();
                            }
                          })
                          .start();
                      }
                    }
                  }}
                  options={{
                    delay: 50,
                    skipAddStyles: true,
                  }}
                />
              </div>
            </div>

            {/* Translation with Typewriter Effect - Always render to prevent layout shift */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 min-h-[60px]">
              {currentLang.translation ? (
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 italic leading-relaxed">
                  <Typewriter
                    key={`translation-${key}`}
                    onInit={(typewriter) => {
                      translationTypewriterRef.current = typewriter;
                      if (isManualSelectionRef.current) {
                        // For manual selection, type very fast (appears instant)
                        typewriter
                          .changeDelay(1)
                          .typeString(currentLang.translation!)
                          .start();
                        translationStartedRef.current = true;
                      }
                      // For auto-cycling, don't start here - wait for text typewriter callback
                    }}
                    options={{
                      delay: 30,
                      skipAddStyles: true,
                      autoStart: false,
                    }}
                  />
                </div>
              ) : (
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 italic leading-relaxed min-h-[24px]">
                  {/* Empty space to maintain layout */}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Language Selection Block with Underline */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {languagesData.map((lang, index) => (
            <button
              key={index}
              onClick={() => handleLanguageSelect(index)}
              className="relative py-3 text-center group transition-colors duration-300"
            >
              <h4 className={`font-bold text-sm sm:text-base transition-colors ${
                currentLanguageIndex === index
                  ? 'text-black dark:text-white'
                  : 'text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white'
              }`}>
                {lang.language}
              </h4>
              {/* Underline directly under the button text */}
              <div 
                className={`absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white transition-opacity duration-500 ${
                  currentLanguageIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
