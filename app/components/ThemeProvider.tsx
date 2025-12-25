"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";

type Theme = "system" | "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "dark" | "light";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  // Get system preference
  const getSystemTheme = useCallback((): "dark" | "light" => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  }, []);

  // Resolve the actual theme (system -> dark/light)
  const resolveTheme = useCallback((currentTheme: Theme): "dark" | "light" => {
    if (currentTheme === "system") {
      return getSystemTheme();
    }
    return currentTheme;
  }, [getSystemTheme]);

  // Compute resolved theme
  const resolvedTheme = useMemo(() => {
    if (!mounted) return "light";
    return resolveTheme(theme);
  }, [theme, resolveTheme, mounted]);

  // Apply theme to document
  const applyTheme = useCallback((currentTheme: Theme) => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;
    const resolved = resolveTheme(currentTheme);

    root.classList.remove("light", "dark");
    root.classList.add(resolved);
    root.setAttribute("data-theme", resolved);
  }, [resolveTheme]);

  // Initialize: read from localStorage and apply theme
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    let initialTheme: Theme = "system";
    
    if (stored === "system" || stored === "dark" || stored === "light") {
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

  // Listen for system theme changes when in system mode
  useEffect(() => {
    if (!mounted || theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      applyTheme("system");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, applyTheme, mounted]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

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
