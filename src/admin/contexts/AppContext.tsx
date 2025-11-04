import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AppContext, type Language, type Theme } from './AppContextType';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('admin_language');
    return (saved as Language) || 'vi';
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('admin_theme');
    return (saved as Theme) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('admin_language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('admin_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleLanguage = () => {
    setLanguageState(prev => prev === 'en' ? 'vi' : 'en');
  };

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <AppContext.Provider value={{ language, theme, toggleLanguage, toggleTheme, setLanguage, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};

// @refresh reset
