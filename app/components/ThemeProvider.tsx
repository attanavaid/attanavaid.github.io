"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "dark" | "light";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  // Apply theme to document
  const applyTheme = useCallback((currentTheme: Theme) => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(currentTheme);
    root.setAttribute("data-theme", currentTheme);
  }, []);

  // Initialize: read from localStorage and apply theme
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    let initialTheme: Theme = "dark";
    
    if (stored === "dark" || stored === "light") {
      initialTheme = stored as Theme;
    }
    
    setThemeState(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update theme when it changes (only after mount)
  useEffect(() => {
    if (!mounted) return;
    
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme, applyTheme, mounted]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  // Resolved theme is the same as theme now (no system mode)
  const resolvedTheme = theme;

  // Memoize context value
  const contextValue = useMemo(
    () => ({ theme, setTheme, resolvedTheme }),
    [theme, setTheme, resolvedTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
