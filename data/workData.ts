import type { WorkExperience } from '@/types';

export const workData: WorkExperience[] = [
    {
        icon: "/work/lp2.png",
        title: "Learn Prompting Company, INC.",
        subtitle: "Fullstack Developer",
        period: "April 2024 - Present",
        location: "College Park, Maryland, United States",
        description: [
            "Build and enhance production features across the frontend and backend of learnprompting.org, a large-scale educational platform serving a global audience",
            "Develop and maintain React and Next.js components using TypeScript, Tailwind CSS, and MDX, optimizing for performance, SEO, and search discoverability",
            "Contribute to CI/CD pipeline through GitHub pull requests, resolving merge conflicts, and implementing code review feedback in an agile development environment",
            "Debug and resolve production issues by tracing component logic, data flow, and build output, improving system stability and user experience",
            "Collaborate asynchronously in a fast-paced startup environment, balancing feature development, bug fixes, and continuous site improvements",
            "Implement responsive design patterns and accessibility standards to ensure cross-browser compatibility and optimal user experience"
        ],
        specialization: "NextJS, React, Typescript, Markdown, Tailwind CSS"
    },
    {
        icon: "/work/3d.png",
        title: "ModelsByAT",
        subtitle: "3D Asset Seller",
        period: "August 2019 - Present",
        location: "Catonsville, Maryland, United States",
        description: [
            "Design and sell game-ready low-poly 3D assets, adhering to technical constraints and performance requirements for real-time rendering",
            "Build and maintain a complete asset creation pipeline using Blender, Substance Painter, and Marmoset, ensuring consistent quality and workflow efficiency",
            "Publish and manage digital products across multiple online marketplaces, handling version control, updates, and customer relationship management",
            "Operate independently as a freelance developer and digital product seller, managing production schedules, quality assurance, and technical support"
        ],
        specialization: "Blender, Substance Painter, Marmoset"
    }
];

