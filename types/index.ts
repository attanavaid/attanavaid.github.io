export interface Education {
    icon: string;
    title: string;
    subtitle: string;
    period: string;
    location: string;
    cgpa: string;
    honors: string;
}

export interface Language {
    language: string;
    text: string;
    translation: string;
    level: string;
}

export interface Project {
    image: string;
    title: string;
    description: string;
    tags: string[];
    website?: string;
    github?: string;
    video?: string;
}

export interface TechItem {
    name: string;
    logo?: string;
}

export interface Skill {
    icon: string;
    name: string;
    tech: (string | TechItem)[];
}

export interface WorkExperience {
    icon: string;
    title: string;
    subtitle: string;
    period: string;
    location: string;
    description: string[];
    specialization: string;
}

