type Theme = 'system' | 'light' | 'dark';

class ThemeManager {
  currentTheme = $state<Theme>('system');

  resolvedTheme = $derived.by(() => {
    if (this.currentTheme !== 'system') return this.currentTheme;
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = document.cookie.match(/theme=([^;]+)/)?.[1] as Theme;
      this.currentTheme = saved || 'system';

      if (this.currentTheme === 'system') {
        this.applySystemTheme();
      }
    }
  }

  // Sets the color theme based on the clients theme
  private applySystemTheme() {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolved = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', resolved);
  }

  // Sets the 'data-theme' attribute located in the root
  set(newTheme: Theme) {
    this.currentTheme = newTheme;
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
    if (newTheme === 'system') return this.applySystemTheme();
    document.documentElement.setAttribute('data-theme', this.currentTheme);
  }

  // A basic light/dark mode toggle
  toggle() {
    this.set(this.resolvedTheme === 'light' ? 'dark' : 'light');
  }
}

export const themeManager = new ThemeManager();
