import { css } from 'styled-components';

// Responsive breakpoint utilities
export const breakpoints = {
  mobile: '480px',
  tablet: '768px', 
  desktop: '1024px',
  wide: '1280px'
} as const;

// Media query helpers
export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  desktop: `@media (max-width: ${breakpoints.desktop})`,
  wide: `@media (min-width: ${breakpoints.wide})`,
  
  // Min-width queries
  fromTablet: `@media (min-width: ${breakpoints.tablet})`,
  fromDesktop: `@media (min-width: ${breakpoints.desktop})`,
  fromWide: `@media (min-width: ${breakpoints.wide})`,
  
  // Range queries
  mobileOnly: `@media (max-width: calc(${breakpoints.tablet} - 1px))`,
  tabletOnly: `@media (min-width: ${breakpoints.tablet}) and (max-width: calc(${breakpoints.desktop} - 1px))`,
  desktopOnly: `@media (min-width: ${breakpoints.desktop}) and (max-width: calc(${breakpoints.wide} - 1px))`,
} as const;

// Container utilities
export const containers = {
  full: css`
    width: 100%;
    max-width: none;
  `,
  
  narrow: css`
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 0 1rem;
    
    ${media.tablet} {
      padding: 0 1.5rem;
    }
    
    ${media.mobile} {
      padding: 0 1rem;
    }
  `,
  
  standard: css`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    
    ${media.tablet} {
      padding: 0 1.5rem;
    }
    
    ${media.mobile} {
      padding: 0 1rem;
    }
  `,
  
  wide: css`
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 3rem;
    
    ${media.desktop} {
      padding: 0 2rem;
    }
    
    ${media.tablet} {
      padding: 0 1.5rem;
    }
    
    ${media.mobile} {
      padding: 0 1rem;
    }
  `,
  
  fluid: css`
    width: 100%;
    max-width: none;
    padding: 0 2rem;
    
    ${media.tablet} {
      padding: 0 1.5rem;
    }
    
    ${media.mobile} {
      padding: 0 1rem;
    }
  `
} as const;

// Responsive grid system
export const grid = {
  container: css`
    display: grid;
    gap: 1.5rem;
    
    ${media.tablet} {
      gap: 1rem;
    }
    
    ${media.mobile} {
      gap: 0.75rem;
    }
  `,
  
  // Responsive column templates
  cols1: css`
    grid-template-columns: 1fr;
  `,
  
  cols2: css`
    grid-template-columns: repeat(2, 1fr);
    
    ${media.mobile} {
      grid-template-columns: 1fr;
    }
  `,
  
  cols3: css`
    grid-template-columns: repeat(3, 1fr);
    
    ${media.tablet} {
      grid-template-columns: repeat(2, 1fr);
    }
    
    ${media.mobile} {
      grid-template-columns: 1fr;
    }
  `,
  
  cols4: css`
    grid-template-columns: repeat(4, 1fr);
    
    ${media.desktop} {
      grid-template-columns: repeat(3, 1fr);
    }
    
    ${media.tablet} {
      grid-template-columns: repeat(2, 1fr);
    }
    
    ${media.mobile} {
      grid-template-columns: 1fr;
    }
  `,
  
  // Auto-fit responsive grid
  autoFit: (minWidth = '300px') => css`
    grid-template-columns: repeat(auto-fit, minmax(${minWidth}, 1fr));
  `,
  
  // Auto-fill responsive grid
  autoFill: (minWidth = '300px') => css`
    grid-template-columns: repeat(auto-fill, minmax(${minWidth}, 1fr));
  `
} as const;

// Responsive flexbox utilities
export const flex = {
  row: css`
    display: flex;
    flex-direction: row;
    
    ${media.mobile} {
      flex-direction: column;
    }
  `,
  
  rowReverse: css`
    display: flex;
    flex-direction: row-reverse;
    
    ${media.mobile} {
      flex-direction: column;
    }
  `,
  
  column: css`
    display: flex;
    flex-direction: column;
  `,
  
  center: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  
  spaceBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    ${media.mobile} {
      flex-direction: column;
      gap: 1rem;
    }
  `,
  
  wrap: css`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    
    ${media.tablet} {
      gap: 0.75rem;
    }
    
    ${media.mobile} {
      gap: 0.5rem;
    }
  `
} as const;

// Responsive spacing system
export const spacing = {
  // Responsive padding
  p: (base: string) => css`
    padding: ${base};
    
    ${media.tablet} {
      padding: calc(${base} * 0.75);
    }
    
    ${media.mobile} {
      padding: calc(${base} * 0.5);
    }
  `,
  
  px: (base: string) => css`
    padding-left: ${base};
    padding-right: ${base};
    
    ${media.tablet} {
      padding-left: calc(${base} * 0.75);
      padding-right: calc(${base} * 0.75);
    }
    
    ${media.mobile} {
      padding-left: calc(${base} * 0.5);
      padding-right: calc(${base} * 0.5);
    }
  `,
  
  py: (base: string) => css`
    padding-top: ${base};
    padding-bottom: ${base};
    
    ${media.tablet} {
      padding-top: calc(${base} * 0.75);
      padding-bottom: calc(${base} * 0.75);
    }
    
    ${media.mobile} {
      padding-top: calc(${base} * 0.5);
      padding-bottom: calc(${base} * 0.5);
    }
  `,
  
  // Responsive margin
  m: (base: string) => css`
    margin: ${base};
    
    ${media.tablet} {
      margin: calc(${base} * 0.75);
    }
    
    ${media.mobile} {
      margin: calc(${base} * 0.5);
    }
  `,
  
  mx: (base: string) => css`
    margin-left: ${base};
    margin-right: ${base};
    
    ${media.tablet} {
      margin-left: calc(${base} * 0.75);
      margin-right: calc(${base} * 0.75);
    }
    
    ${media.mobile} {
      margin-left: calc(${base} * 0.5);
      margin-right: calc(${base} * 0.5);
    }
  `,
  
  my: (base: string) => css`
    margin-top: ${base};
    margin-bottom: ${base};
    
    ${media.tablet} {
      margin-top: calc(${base} * 0.75);
      margin-bottom: calc(${base} * 0.75);
    }
    
    ${media.mobile} {
      margin-top: calc(${base} * 0.5);
      margin-bottom: calc(${base} * 0.5);
    }
  `,
  
  // Gap utility
  gap: (base: string) => css`
    gap: ${base};
    
    ${media.tablet} {
      gap: calc(${base} * 0.75);
    }
    
    ${media.mobile} {
      gap: calc(${base} * 0.5);
    }
  `
} as const;

// Responsive typography
export const typography = {
  // Fluid text scaling
  fluidText: (minSize: string, maxSize: string) => css`
    font-size: clamp(${minSize}, 4vw, ${maxSize});
  `,
  
  // Responsive headings
  h1: css`
    font-size: clamp(2rem, 5vw, 3rem);
    line-height: 1.2;
    
    ${media.mobile} {
      line-height: 1.3;
    }
  `,
  
  h2: css`
    font-size: clamp(1.5rem, 4vw, 2.25rem);
    line-height: 1.3;
    
    ${media.mobile} {
      line-height: 1.4;
    }
  `,
  
  h3: css`
    font-size: clamp(1.25rem, 3vw, 1.875rem);
    line-height: 1.4;
  `,
  
  h4: css`
    font-size: clamp(1.125rem, 2.5vw, 1.5rem);
    line-height: 1.4;
  `,
  
  // Responsive body text
  body: css`
    font-size: clamp(0.875rem, 2vw, 1rem);
    line-height: 1.6;
    
    ${media.mobile} {
      line-height: 1.5;
    }
  `,
  
  small: css`
    font-size: clamp(0.75rem, 1.5vw, 0.875rem);
    line-height: 1.5;
  `
} as const;

// Responsive visibility utilities
export const visibility = {
  // Show/hide at specific breakpoints
  showMobile: css`
    display: block;
    
    ${media.fromTablet} {
      display: none;
    }
  `,
  
  hideMobile: css`
    display: block;
    
    ${media.mobile} {
      display: none;
    }
  `,
  
  showTablet: css`
    display: none;
    
    ${media.tabletOnly} {
      display: block;
    }
  `,
  
  hideTablet: css`
    display: block;
    
    ${media.tabletOnly} {
      display: none;
    }
  `,
  
  showDesktop: css`
    display: none;
    
    ${media.fromDesktop} {
      display: block;
    }
  `,
  
  hideDesktop: css`
    display: block;
    
    ${media.desktop} {
      display: none;
    }
  `,
  
  // Screen reader only
  srOnly: css`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  `
} as const;

// Layout position utilities
export const position = {
  // Responsive absolute positioning
  absoluteResponsive: css`
    position: absolute;
    
    ${media.mobile} {
      position: relative;
    }
  `,
  
  // Responsive fixed positioning  
  fixedResponsive: css`
    position: fixed;
    
    ${media.mobile} {
      position: relative;
    }
  `,
  
  // Responsive sticky positioning
  stickyResponsive: css`
    position: sticky;
    top: 0;
    
    ${media.mobile} {
      position: relative;
    }
  `
} as const;

// Aspect ratio utilities
export const aspectRatio = {
  square: css`
    aspect-ratio: 1 / 1;
    
    @supports not (aspect-ratio: 1 / 1) {
      &::before {
        content: '';
        display: block;
        padding-bottom: 100%;
      }
    }
  `,
  
  video: css`
    aspect-ratio: 16 / 9;
    
    @supports not (aspect-ratio: 16 / 9) {
      &::before {
        content: '';
        display: block;
        padding-bottom: 56.25%;
      }
    }
  `,
  
  portrait: css`
    aspect-ratio: 3 / 4;
    
    @supports not (aspect-ratio: 3 / 4) {
      &::before {
        content: '';
        display: block;
        padding-bottom: 133.33%;
      }
    }
  `
} as const;

// Performance optimizations
export const performance = {
  // GPU acceleration for animations
  willChange: css`
    will-change: transform, opacity;
    transform: translateZ(0);
  `,
  
  // Optimize rendering
  optimizeRender: css`
    contain: layout style paint;
    content-visibility: auto;
  `,
  
  // Smooth scrolling
  smoothScroll: css`
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  `
} as const; 