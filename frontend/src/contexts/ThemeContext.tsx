import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { getTheme, ThemeMode, Theme } from '../styles/theme';

interface ThemeContextType {
  mode: ThemeMode;
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  isSystemTheme: boolean;
  setSystemTheme: (useSystem: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultMode?: ThemeMode;
  enableSystemDetection?: boolean;
}

const THEME_STORAGE_KEY = 'narrow-path-theme-mode';
const SYSTEM_THEME_KEY = 'narrow-path-use-system-theme';

// Helper function to detect system theme preference
const getSystemTheme = (): ThemeMode => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'dark'; // Default fallback
};

// Helper function to get stored theme preference
const getStoredTheme = (): ThemeMode | null => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  }
  return null;
};

// Helper function to get system theme preference setting
const getStoredSystemPreference = (): boolean => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(SYSTEM_THEME_KEY);
    return stored === 'true';
  }
  return false;
};

export function ThemeProvider({ 
  children, 
  defaultMode = 'dark',
  enableSystemDetection = true 
}: ThemeProviderProps) {
  // Initialize theme state
  const [isSystemTheme, setIsSystemThemeState] = useState<boolean>(() => {
    if (!enableSystemDetection) return false;
    
    const storedSystemPref = getStoredSystemPreference();
    const hasStoredTheme = getStoredTheme() !== null;
    
    // If no explicit theme is stored, use system preference
    return storedSystemPref || !hasStoredTheme;
  });

  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (!enableSystemDetection) {
      return getStoredTheme() || defaultMode;
    }
    
    if (isSystemTheme) {
      return getSystemTheme();
    }
    
    return getStoredTheme() || defaultMode;
  });

  const theme = getTheme(mode);

  // Update theme based on system changes
  useEffect(() => {
    if (!enableSystemDetection || !isSystemTheme) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setModeState(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [isSystemTheme, enableSystemDetection]);

  // Persist theme preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isSystemTheme) {
        localStorage.setItem(SYSTEM_THEME_KEY, 'true');
        localStorage.removeItem(THEME_STORAGE_KEY);
      } else {
        localStorage.setItem(THEME_STORAGE_KEY, mode);
        localStorage.setItem(SYSTEM_THEME_KEY, 'false');
      }
    }
  }, [mode, isSystemTheme]);

  const toggleTheme = () => {
    if (isSystemTheme) {
      // If using system theme, switch to explicit opposite of current system theme
      setIsSystemThemeState(false);
      const currentSystemTheme = getSystemTheme();
      const newMode = currentSystemTheme === 'dark' ? 'light' : 'dark';
      setModeState(newMode);
    } else {
      // Normal toggle
      setModeState(prevMode => prevMode === 'dark' ? 'light' : 'dark');
    }
  };

  const setTheme = (newMode: ThemeMode) => {
    setIsSystemThemeState(false);
    setModeState(newMode);
  };

  const setSystemTheme = (useSystem: boolean) => {
    setIsSystemThemeState(useSystem);
    if (useSystem) {
      setModeState(getSystemTheme());
    }
  };

  const contextValue: ThemeContextType = {
    mode,
    theme,
    toggleTheme,
    setTheme,
    isSystemTheme,
    setSystemTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme context
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Helper hook for theme-aware components
export function useThemeMode(): ThemeMode {
  const { mode } = useTheme();
  return mode;
}

// Helper hook to check if current theme is dark
export function useIsDarkTheme(): boolean {
  const { mode } = useTheme();
  return mode === 'dark';
} 