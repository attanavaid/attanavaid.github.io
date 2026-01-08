export function ThemeScript() {
  const codeToRunOnClient = `
    (function() {
      try {
        const theme = localStorage.getItem('theme') || 'dark';
        if (theme === 'dark' || theme === 'light') {
          document.documentElement.classList.remove('light', 'dark');
          document.documentElement.classList.add(theme);
          document.documentElement.setAttribute('data-theme', theme);
        }
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
}

