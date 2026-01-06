"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import AnimatedGradientBackground from "./components/AnimatedGradientBackground";
import HeroSection3D from "./components/sections/HeroSection3D";
import ExperienceSection from "./components/sections/ExperienceSection";
import SkillsSection from "./components/sections/SkillsSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import LanguagesSection from "./components/sections/LanguagesSection";
import ContactSection from "./components/sections/ContactSection";
import Footer from "./components/sections/Footer";
import { workData } from "@/data/workData";
import { educationData } from "@/data/educationData";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [currentRole, setCurrentRole] = useState(0);
  const [sectionOffsets, setSectionOffsets] = useState<Record<string, number>>({});

  const roles = ["Frontend", "Software", "Fullstack"];

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

  return (
    <div className="relative overflow-hidden">
      {/* Animated gradient background spanning hero to contact */}
      <AnimatedGradientBackground />
      
      {/* Content wrapper with sections */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection3D scrollY={scrollY} currentRole={currentRole} roles={roles} />
        <ExperienceSection 
          sectionOffset={sectionOffsets.experience || 0}
          workData={workData}
          educationData={educationData}
        />
        <SkillsSection sectionOffset={sectionOffsets.skills || 0} />
        <ProjectsSection sectionOffset={sectionOffsets.projects || 0} />
        <LanguagesSection sectionOffset={sectionOffsets.languages || 0} />
        <ContactSection />
      </div>
      
      {/* Footer with its own background */}
      <Footer />
    </div>
  );
}
