// Image path constants for consistent usage
// Note: Next.js optimizes images from /public at runtime, but using constants
// ensures consistency and makes it easier to switch to static imports later if needed

export const parallaxImages = {
  hill1: '/parallax/hill1.png',
  hill2: '/parallax/hill2.png',
  hill3: '/parallax/hill3.png',
  hill4: '/parallax/hill4.png',
  hill5: '/parallax/hill5.png',
  tree: '/parallax/tree.png',
  plant: '/parallax/plant.png',
  leaf: '/parallax/leaf.png',
} as const;

export const commonImages = {
  logo: '/logo512.png',
  githubLogo: '/skills/tech/github.svg',
  youtubeLogo: '/skills/tech/youtube.svg',
} as const;

