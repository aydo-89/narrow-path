import styled from 'styled-components';
import { containers, grid, flex, spacing, media, visibility } from '../../styles/responsive';

// Base container components
export const Container = styled.div<{
  variant?: 'narrow' | 'standard' | 'wide' | 'fluid' | 'full';
}>`
  ${props => {
    switch (props.variant) {
      case 'narrow': return containers.narrow;
      case 'wide': return containers.wide;
      case 'fluid': return containers.fluid;
      case 'full': return containers.full;
      default: return containers.standard;
    }
  }}
`;

// Responsive grid components
export const Grid = styled.div<{
  cols?: 1 | 2 | 3 | 4;
  autoFit?: string;
  autoFill?: string;
}>`
  ${grid.container}
  
  ${props => {
    if (props.autoFit) return grid.autoFit(props.autoFit);
    if (props.autoFill) return grid.autoFill(props.autoFill);
    
    switch (props.cols) {
      case 1: return grid.cols1;
      case 2: return grid.cols2;
      case 3: return grid.cols3;
      case 4: return grid.cols4;
      default: return grid.cols3;
    }
  }}
`;

// Responsive flexbox components
export const Flex = styled.div<{
  direction?: 'row' | 'column' | 'rowReverse';
  align?: 'center' | 'spaceBetween' | 'wrap';
  responsive?: boolean;
}>`
  ${props => {
    if (props.align === 'center') return flex.center;
    if (props.align === 'spaceBetween') return flex.spaceBetween;
    if (props.align === 'wrap') return flex.wrap;
    
    switch (props.direction) {
      case 'column': return flex.column;
      case 'rowReverse': return flex.rowReverse;
      default: return props.responsive ? flex.row : 'display: flex;';
    }
  }}
`;

// Responsive spacing components
export const Section = styled.section<{
  padding?: string;
  margin?: string;
}>`
  ${props => props.padding ? spacing.p(props.padding) : spacing.p('2rem')}
  ${props => props.margin ? spacing.my(props.margin) : ''}
`;

export const Spacer = styled.div<{
  size?: string;
  responsive?: boolean;
}>`
  ${props => {
    const size = props.size || '1rem';
    if (props.responsive) {
      return spacing.my(size);
    }
    return `margin: ${size} 0;`;
  }}
`;

// Responsive visibility components
export const Hide = styled.div<{
  on?: 'mobile' | 'tablet' | 'desktop';
}>`
  ${props => {
    switch (props.on) {
      case 'mobile': return visibility.hideMobile;
      case 'tablet': return visibility.hideTablet;
      case 'desktop': return visibility.hideDesktop;
      default: return '';
    }
  }}
`;

export const Show = styled.div<{
  on?: 'mobile' | 'tablet' | 'desktop';
}>`
  ${props => {
    switch (props.on) {
      case 'mobile': return visibility.showMobile;
      case 'tablet': return visibility.showTablet;
      case 'desktop': return visibility.showDesktop;
      default: return '';
    }
  }}
`;

// Game-specific responsive layouts
export const GameLayout = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  ${media.mobile} {
    /* Ensure proper mobile viewport handling */
    height: 100dvh; /* Dynamic viewport height for mobile */
    min-height: -webkit-fill-available;
  }
`;

export const GameContent = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`;

export const GameUI = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
  
  > * {
    pointer-events: auto;
  }
`;

export const ResponsivePanel = styled.div<{
  position?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
}>`
  position: absolute;
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors.glass.border};
  border-radius: 16px;
  box-shadow: ${props => props.theme.shadows.glass};
  
  ${spacing.p('1.5rem')}
  
  ${props => {
    const position = props.position || 'top';
    const size = props.size || 'md';
    
    switch (position) {
      case 'top':
        return `
          top: 2rem;
          left: 2rem;
          right: 2rem;
          
          ${media.tablet} {
            top: 1.5rem;
            left: 1.5rem;
            right: 1.5rem;
          }
          
          ${media.mobile} {
            top: 1rem;
            left: 1rem;
            right: 1rem;
          }
        `;
      
      case 'bottom':
        return `
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          max-width: ${size === 'lg' ? '600px' : size === 'md' ? '400px' : '300px'};
          
          ${media.tablet} {
            bottom: 1.5rem;
            left: 1.5rem;
            right: 1.5rem;
            transform: none;
            max-width: none;
          }
          
          ${media.mobile} {
            bottom: 1rem;
            left: 1rem;
            right: 1rem;
          }
        `;
      
      case 'left':
        return `
          top: 50%;
          left: 2rem;
          transform: translateY(-50%);
          width: ${size === 'lg' ? '320px' : size === 'md' ? '280px' : '240px'};
          
          ${media.desktop} {
            width: ${size === 'lg' ? '280px' : size === 'md' ? '240px' : '200px'};
          }
          
          ${media.tablet} {
            position: relative;
            top: auto;
            left: auto;
            transform: none;
            width: 100%;
            margin: 1rem;
          }
        `;
      
      case 'right':
        return `
          top: 50%;
          right: 2rem;
          transform: translateY(-50%);
          width: ${size === 'lg' ? '320px' : size === 'md' ? '280px' : '240px'};
          
          ${media.desktop} {
            width: ${size === 'lg' ? '280px' : size === 'md' ? '240px' : '200px'};
          }
          
          ${media.tablet} {
            position: relative;
            top: auto;
            right: auto;
            transform: none;
            width: 100%;
            margin: 1rem;
          }
        `;
      
      default:
        return '';
    }
  }}
`;

// Card grid for scenarios, achievements, etc.
export const CardGrid = styled(Grid)<{
  variant?: 'scenarios' | 'achievements' | 'stats';
}>`
  ${props => {
    switch (props.variant) {
      case 'scenarios':
        return `
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          
          ${media.tablet} {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          }
          
          ${media.mobile} {
            grid-template-columns: 1fr;
          }
        `;
      
      case 'achievements':
        return `
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          
          ${media.mobile} {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          }
        `;
      
      case 'stats':
        return `
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          
          ${media.mobile} {
            grid-template-columns: repeat(2, 1fr);
          }
        `;
      
      default:
        return grid.autoFit('300px');
    }
  }}
`;

// Responsive text components with game-appropriate styling
export const ResponsiveTitle = styled.h1`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: ${props => props.theme.typography.weights.bold};
  color: ${props => props.theme.colors.text.primary};
  line-height: 1.2;
  margin: 0;
  text-align: center;
  
  ${media.mobile} {
    font-size: clamp(1.25rem, 5vw, 2rem);
    line-height: 1.3;
  }
`;

export const ResponsiveSubtitle = styled.h2`
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  font-weight: ${props => props.theme.typography.weights.medium};
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.4;
  margin: 0;
  text-align: center;
  
  ${media.mobile} {
    font-size: clamp(0.875rem, 3vw, 1.25rem);
  }
`;

export const ResponsiveText = styled.p`
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  color: ${props => props.theme.colors.text.primary};
  line-height: 1.6;
  margin: 0;
  
  ${media.mobile} {
    line-height: 1.5;
  }
`;

// Layout wrapper with proper responsive behavior
export const ResponsiveWrapper = styled.div<{
  maxWidth?: string;
  centered?: boolean;
}>`
  width: 100%;
  max-width: ${props => props.maxWidth || '1200px'};
  margin: ${props => props.centered ? '0 auto' : '0'};
  
  ${spacing.px('2rem')}
  
  ${media.tablet} {
    ${spacing.px('1.5rem')}
  }
  
  ${media.mobile} {
    ${spacing.px('1rem')}
  }
`;

// Stack component for vertical layouts
export const Stack = styled.div<{
  space?: string;
  align?: 'start' | 'center' | 'end';
}>`
  display: flex;
  flex-direction: column;
  align-items: ${props => {
    switch (props.align) {
      case 'start': return 'flex-start';
      case 'end': return 'flex-end';
      case 'center': return 'center';
      default: return 'stretch';
    }
  }};
  
  ${props => spacing.gap(props.space || '1rem')}
`;

// Inline component for horizontal layouts
export const Inline = styled.div<{
  space?: string;
  align?: 'start' | 'center' | 'end';
  wrap?: boolean;
}>`
  display: flex;
  flex-wrap: ${props => props.wrap ? 'wrap' : 'nowrap'};
  align-items: ${props => {
    switch (props.align) {
      case 'start': return 'flex-start';
      case 'end': return 'flex-end';
      case 'center': return 'center';
      default: return 'stretch';
    }
  }};
  
  ${props => spacing.gap(props.space || '1rem')}
  
  ${props => props.wrap && media.mobile} {
    flex-direction: column;
  }
`; 