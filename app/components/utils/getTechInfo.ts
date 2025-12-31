import type { TechItem } from "@/types";

// Helper function to normalize tech items (handles both string and TechItem)
export const getTechInfo = (tech: string | TechItem): { name: string; logo?: string } => {
  if (typeof tech === 'string') {
    return { name: tech };
  }
  return tech;
};

