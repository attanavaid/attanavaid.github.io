import type { WorkExperience } from "@/types";

export const workData: WorkExperience[] = [
  {
    icon: "/work/lp2.png",
    title: "LearnPrompting",
    subtitle: "Fullstack Developer",
    period: "April 2024 - November 2025",
    location: "Remote",
    description: [
      "Build and enhance production features across the frontend and backend of learnprompting.org, a large-scale educational platform serving a global audience",
      "Develop and maintain React and Next.js components using TypeScript, Tailwind CSS, and MDX, optimizing for performance, SEO, and search discoverability",
      "Contribute to CI/CD pipeline through GitHub pull requests, resolving merge conflicts, and implementing code review feedback in an agile development environment",
      "Debug and resolve production issues by tracing component logic, data flow, and build output, improving system stability and user experience",
      "Collaborate asynchronously in a fast-paced startup environment, balancing feature development, bug fixes, and continuous site improvements",
      "Implement responsive design patterns and accessibility standards to ensure cross-browser compatibility and optimal user experience",
    ],
    specialization: [
      { name: "NextJS", logo: "nextjs.svg" },
      { name: "React", logo: "react.svg" },
      { name: "TypeScript", logo: "typescript.svg" },
      { name: "Markdown", logo: "markdown.svg" },
      { name: "Tailwind", logo: "tailwindcss.svg" },
      { name: "GitHub", logo: "github.svg" },
      { name: "Vercel", logo: "vercel.svg" },
      { name: "Google Search Console", logo: "googlesearchconsole.svg" },
    ],
  },
  {
    icon: "/work/3d.png",
    title: "Freelance Developer",
    subtitle: "3D Designer and Web Developer",
    period: "August 2019 - Present",
    location: "Remote",
    description: [
      "Develop and maintain production-ready websites and web applications for clients, implementing CI/CD pipelines for automated deployment and continuous integration",
      "Build scalable full-stack applications using modern frameworks, ensuring optimal performance, security, and user experience for real-world production environments",
      "Manage production deployments, monitor application performance, and implement bug fixes and feature updates for live websites serving active users",
      "Design and sell game-ready low-poly 3D assets, adhering to technical constraints and performance requirements for real-time rendering",
      "Build and maintain a complete asset creation pipeline using Blender, Substance Painter, and Marmoset, ensuring consistent quality and workflow efficiency",
      "Publish and manage digital products across multiple online marketplaces, handling version control, updates, and customer relationship management",
    ],
    specialization: [
      { name: "Blender", logo: "blender.svg" },
      { name: "Substance Painter", logo: "substance.svg" },
      { name: "Marmoset", logo: "marmoset.svg" },
      { name: "GitHub", logo: "github.svg" },
      { name: "Google Analytics", logo: "googleanalytics.svg" },
      { name: "Google Search Console", logo: "googlesearchconsole.svg" },
      { name: "Artstation", logo: "artstation.svg" },
      { name: "Vercel", logo: "vercel.svg" },
    ],
  },
];
