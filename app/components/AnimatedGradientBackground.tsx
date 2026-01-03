"use client";

import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";

export default function AnimatedGradientBackground() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="animated-gradient-background fixed inset-0 w-full h-full pointer-events-none z-0">
      {/* Main animated gradient - covers entire viewport */}
      <div 
        className={`animated-gradient-base ${isDark ? 'dark-gradient' : 'light-gradient'}`}
      />
      
      {/* Additional animated overlay for depth - colored blurs */}
      <motion.div
        className={`animated-gradient-overlay ${isDark ? 'dark-overlay' : 'light-overlay'}`}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 30, 0],
          y: [0, 20, 0],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Additional colored blur layers for dark mode */}
      {isDark && (
        <>
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 15% 30%, rgba(74, 158, 255, 0.08), transparent 60%)",
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 85% 70%, rgba(255, 107, 157, 0.08), transparent 60%)",
            }}
            animate={{
              x: [0, -40, 0],
              y: [0, -25, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03), transparent 70%)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.03, 0.08, 0.03],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 70% 20%, rgba(139, 92, 246, 0.06), transparent 55%)",
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, 40, 0],
              scale: [1, 1.25, 1],
            }}
            transition={{
              duration: 32,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 30% 80%, rgba(34, 197, 94, 0.05), transparent 55%)",
            }}
            animate={{
              x: [0, -35, 0],
              y: [0, -30, 0],
              scale: [1, 1.18, 1],
            }}
            transition={{
              duration: 38,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 90% 40%, rgba(251, 146, 60, 0.06), transparent 50%)",
            }}
            animate={{
              x: [0, -25, 0],
              y: [0, 35, 0],
              scale: [1, 1.22, 1],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}
      
      {/* Additional colored blur layers for light mode */}
      {!isDark && (
        <>
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 25% 35%, rgba(74, 158, 255, 0.1), transparent 55%)",
            }}
            animate={{
              x: [0, 45, 0],
              y: [0, 35, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 75% 65%, rgba(255, 107, 157, 0.1), transparent 55%)",
            }}
            animate={{
              x: [0, -35, 0],
              y: [0, -28, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 33,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 60% 15%, rgba(139, 92, 246, 0.08), transparent 50%)",
            }}
            animate={{
              x: [0, 25, 0],
              y: [0, 45, 0],
              scale: [1, 1.25, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 40% 85%, rgba(34, 197, 94, 0.07), transparent 50%)",
            }}
            animate={{
              x: [0, -30, 0],
              y: [0, -32, 0],
              scale: [1, 1.18, 1],
            }}
            transition={{
              duration: 36,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}
      
      {/* Subtle animated particles effect */}
      <motion.div
        className={`animated-gradient-particles ${isDark ? 'dark-particles' : 'light-particles'}`}
        animate={{
          x: [0, 50, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
