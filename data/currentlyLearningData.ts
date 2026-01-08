import type { Skill } from "@/types";

export const currentlyLearningData: Skill[] = [
  {
    icon: "/skills/angular.png",
    name: "More Web Frameworks",
    tech: [
      { name: "Angular", logo: "/skills/tech/angular.svg" },
      { name: "Svelte", logo: "/skills/tech/svelte.svg" },
      { name: "Ruby on Rails", logo: "/skills/tech/rubyonrails.svg" },
    ],
  },
  {
    icon: "/skills/flutter.png",
    name: "Cross-Platform Development",
    tech: [
      { name: "Flutter", logo: "/skills/tech/flutter.svg" },
      { name: "Expo", logo: "/skills/tech/expo.svg" },
      { name: "React Native", logo: "/skills/tech/react.svg" },
      { name: "Kotlin", logo: "/skills/tech/kotlin.svg" },
    ],
  },
  {
    icon: "/skills/seo.png",
    name: "Backend & DevOps",
    tech: [
      { name: "Docker", logo: "/skills/tech/docker.svg" },
      { name: "AWS", logo: "/skills/tech/amazonaws.svg" },
      { name: "Kubernetes", logo: "/skills/tech/kubernetes.svg" },
      { name: "Supabase", logo: "/skills/tech/supabase.svg" },
    ],
  },
  {
    icon: "/skills/rust.png",
    name: "Systems Programming Languages",
    tech: [
      { name: "Rust", logo: "/skills/tech/rust.svg" },
      { name: "Go", logo: "/skills/tech/go.svg" },
    ],
  },
];
