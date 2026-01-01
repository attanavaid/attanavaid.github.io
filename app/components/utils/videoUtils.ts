/**
 * Video utility functions
 */

/**
 * Check if a file path is a video file
 */
export function isVideoFile(path: string): boolean {
  const videoExtensions = ['.mp4', '.webm', '.mov', '.ogg', '.avi'];
  return videoExtensions.some(ext => path.toLowerCase().endsWith(ext));
}

