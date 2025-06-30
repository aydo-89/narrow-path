import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      deepBlue: string;
      darkerBlue: string;
      darkestBlue: string;
      amberWarning: string;
      amberLight: string;
      clinicalWhite: string;
      dangerRed: string;
      dangerDark: string;
      safe: string;
      caution: string;
      danger: string;
      catastrophe: string;
      background: {
        primary: string;
        secondary: string;
        tertiary: string;
        surface: string;
      };
      glass: {
        background: string;
        border: string;
        shadow: string;
      };
      text: {
        primary: string;
        secondary: string;
        tertiary: string;
        inverse: string;
      };
      border: {
        primary: string;
        secondary: string;
        accent: string;
      };
    };
    typography: {
      fonts: {
        primary: string;
        monospace: string;
      };
      sizes: {
        xs: string;
        sm: string;
        base: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        '4xl': string;
        '5xl': string;
      };
      weights: {
        light: number;
        normal: number;
        medium: number;
        semibold: number;
        bold: number;
      };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      full: string;
    };
    shadows: {
      glass: string;
      glow: string;
      danger: string;
      elevated: string;
    };
    animations: {
      duration: {
        fast: string;
        normal: string;
        slow: string;
      };
      easing: {
        easeOut: string;
        easeIn: string;
        easeInOut: string;
      };
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
      wide: string;
    };
  }
} 