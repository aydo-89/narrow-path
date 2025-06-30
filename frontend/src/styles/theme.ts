// Base colors that work in both themes
const baseColors = {
  // Risk level colors for P(Doom) system - consistent across themes
  safe: '#10b981',        // Green
  caution: '#f59e0b',     // Yellow/Amber
  danger: '#f97316',      // Orange
  catastrophe: '#ef4444', // Red
};

// Typography, spacing, and other theme-agnostic values
const baseTheme = {
  typography: {
    fonts: {
      primary: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      monospace: "'JetBrains Mono', 'Fira Code', 'Monaco', monospace",
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    }
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  
  animations: {
    duration: {
      fast: '0.2s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }
  },
  
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  }
};

// Dark Theme - "Elegant Apocalypse" 
export const darkTheme = {
  ...baseTheme,
  colors: {
    ...baseColors,
    
    // Elegant Apocalypse Color Palette
    deepBlue: '#1a1a2e',
    darkerBlue: '#16213e',
    darkestBlue: '#0f172a',
    amberWarning: '#f59e0b',
    amberLight: '#fbbf24',
    clinicalWhite: '#f8fafc',
    dangerRed: '#ef4444',
    dangerDark: '#dc2626',
    
    // Background and surface colors
    background: {
      primary: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f172a 100%)',
      secondary: '#16213e',
      tertiary: '#1a1a2e',
      surface: '#0f172a',
    },
    
    // Glass morphism - optimized for dark theme
    glass: {
      background: 'rgba(255, 255, 255, 0.1)',
      border: 'rgba(255, 255, 255, 0.2)',
      shadow: 'rgba(0, 0, 0, 0.1)',
    },
    
    // Text colors for dark theme
    text: {
      primary: '#f8fafc',
      secondary: 'rgba(248, 250, 252, 0.8)',
      tertiary: 'rgba(248, 250, 252, 0.6)',
      inverse: '#1a1a2e',
    },
    
    // Border colors
    border: {
      primary: 'rgba(255, 255, 255, 0.2)',
      secondary: 'rgba(255, 255, 255, 0.1)',
      accent: 'rgba(245, 158, 11, 0.3)',
    }
  },
  
  shadows: {
    glass: '0 8px 32px rgba(0, 0, 0, 0.1)',
    glow: '0 0 20px rgba(245, 158, 11, 0.3)',
    danger: '0 0 20px rgba(239, 68, 68, 0.3)',
    elevated: '0 4px 20px rgba(0, 0, 0, 0.15)',
  }
};

// Light Theme - "Elegant Dawn" (maintains apocalypse sophistication)
export const lightTheme = {
  ...baseTheme,
  colors: {
    ...baseColors,
    
    // Light theme color palette - sophisticated and elegant
    deepBlue: '#0f172a',     // Darkest for text
    darkerBlue: '#1e293b',   // Dark text
    darkestBlue: '#334155',  // Medium text
    amberWarning: '#d97706', // Slightly darker amber for better contrast
    amberLight: '#f59e0b',
    clinicalWhite: '#1e293b', // Inverted for light theme
    dangerRed: '#dc2626',     // Slightly darker for better contrast
    dangerDark: '#991b1b',
    
    // Background and surface colors for light theme
    background: {
      primary: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
      secondary: '#f1f5f9',
      tertiary: '#e2e8f0',
      surface: '#ffffff',
    },
    
    // Glass morphism adapted for light theme
    glass: {
      background: 'rgba(255, 255, 255, 0.7)',
      border: 'rgba(15, 23, 42, 0.15)',
      shadow: 'rgba(15, 23, 42, 0.1)',
    },
    
    // Text colors for light theme
    text: {
      primary: '#0f172a',
      secondary: 'rgba(15, 23, 42, 0.8)',
      tertiary: 'rgba(15, 23, 42, 0.6)',
      inverse: '#f8fafc',
    },
    
    // Border colors for light theme
    border: {
      primary: 'rgba(15, 23, 42, 0.15)',
      secondary: 'rgba(15, 23, 42, 0.1)',
      accent: 'rgba(217, 119, 6, 0.3)',
    }
  },
  
  shadows: {
    glass: '0 8px 32px rgba(15, 23, 42, 0.08)',
    glow: '0 0 20px rgba(217, 119, 6, 0.2)',
    danger: '0 0 20px rgba(220, 38, 38, 0.2)',
    elevated: '0 4px 20px rgba(15, 23, 42, 0.1)',
  }
};

// Default theme (dark)
export const theme = darkTheme;

// Theme type for TypeScript
export type Theme = typeof darkTheme;
export type ThemeMode = 'dark' | 'light';

// Helper function to get theme by mode
export const getTheme = (mode: ThemeMode): Theme => {
  return mode === 'light' ? lightTheme : darkTheme;
}; 