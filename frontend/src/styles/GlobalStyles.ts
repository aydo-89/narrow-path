import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    overflow: hidden;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
  }

  #root {
    width: 100%;
    height: 100%;
  }

  /* Elegant Apocalypse Color Palette */
  :root {
    --color-deep-blue: #1a1a2e;
    --color-darker-blue: #16213e;
    --color-darkest-blue: #0f172a;
    --color-amber-warning: #f59e0b;
    --color-amber-light: #fbbf24;
    --color-clinical-white: #f8fafc;
    --color-danger-red: #ef4444;
    --color-danger-dark: #dc2626;
    
    /* Glass morphism colors */
    --glass-bg: rgba(255, 255, 255, 0.1);
    --glass-border: rgba(255, 255, 255, 0.2);
    --glass-shadow: rgba(0, 0, 0, 0.1);
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--glass-bg);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--glass-border);
  }

  /* Glass morphism utilities */
  .glass {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    box-shadow: 0 8px 32px var(--glass-shadow);
  }

  /* Animation utilities */
  .fade-in {
    animation: fadeIn 0.6s ease-out;
  }

  .slide-up {
    animation: slideUp 0.8s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Mobile optimizations */
  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
  }
`; 