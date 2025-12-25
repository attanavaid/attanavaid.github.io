export function ThemeScript() {
  const codeToRunOnClient = `
    (function() {
      try {
        const theme = localStorage.getItem('theme') || 'system';
        const getSystemTheme = () => {
          return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        };
        const resolvedTheme = theme === 'system' ? getSystemTheme() : theme;
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(resolvedTheme);
        document.documentElement.setAttribute('data-theme', resolvedTheme);
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
}

