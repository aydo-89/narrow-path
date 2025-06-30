export const theme = {
  colors: {
    // Elegant Apocalypse Color Palette
    deepBlue: '#1a1a2e',
    darkerBlue: '#16213e',
    darkestBlue: '#0f172a',
    amberWarning: '#f59e0b',
    amberLight: '#fbbf24',
    clinicalWhite: '#f8fafc',
    dangerRed: '#ef4444',
    dangerDark: '#dc2626',
    
    // Risk level colors for P(Doom) system
    safe: '#10b981',        // Green
    caution: '#f59e0b',     // Yellow/Amber
    danger: '#f97316',      // Orange
    catastrophe: '#ef4444', // Red
    
    // Glass morphism
    glass: {
      background: 'rgba(255, 255, 255, 0.1)',
      border: 'rgba(255, 255, 255, 0.2)',
      shadow: 'rgba(0, 0, 0, 0.1)',
    },
    
    // Text colors
    text: {
      primary: '#f8fafc',
      secondary: 'rgba(248, 250, 252, 0.8)',
      tertiary: 'rgba(248, 250, 252, 0.6)',
    }
  },
  
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
  
  shadows: {
    glass: '0 8px 32px rgba(0, 0, 0, 0.1)',
    glow: '0 0 20px rgba(245, 158, 11, 0.3)',
    danger: '0 0 20px rgba(239, 68, 68, 0.3)',
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