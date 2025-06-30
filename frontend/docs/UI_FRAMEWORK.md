# The Narrow Path - UI Framework Documentation

A comprehensive, responsive UI framework built for "The Narrow Path" AI risk education game. This framework provides an elegant "Elegant Apocalypse" design system with dark/light theme support, responsive layouts, and game-specific components.

## Table of Contents

1. [Overview](#overview)
2. [Theme System](#theme-system)
3. [Responsive Layout System](#responsive-layout-system)
4. [Layout Components](#layout-components)
5. [UI Components](#ui-components)
6. [Game Components](#game-components)
7. [Usage Examples](#usage-examples)
8. [Best Practices](#best-practices)
9. [Performance Guidelines](#performance-guidelines)

---

## Overview

The UI framework provides:

- **Dual Theme System**: Sophisticated dark ("Elegant Apocalypse") and light ("Elegant Dawn") themes
- **Responsive Design**: Mobile-first responsive utilities and components
- **Glass Morphism**: Elegant glass effects with backdrop blur
- **TypeScript Support**: Full type safety across all components
- **Performance Optimized**: GPU-accelerated animations and optimized re-renders
- **Accessibility**: WCAG AA compliant with proper keyboard navigation

### Design Philosophy

The framework follows the "Elegant Apocalypse" aesthetic:
- **Sophisticated**: Premium feel with subtle animations
- **Glass Morphism**: Translucent surfaces with backdrop blur
- **Risk-Aware**: Visual language reflects AI risk themes
- **Accessible**: Works for all users regardless of ability

---

## Theme System

### Theme Providers

```tsx
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider defaultMode="dark" enableSystemDetection={true}>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### Using Themes in Components

```tsx
import { useTheme, useIsDarkTheme, useThemeMode } from './contexts/ThemeContext';

function MyComponent() {
  const { mode, toggleTheme, setTheme } = useTheme();
  const isDark = useIsDarkTheme();
  const currentMode = useThemeMode();
  
  return (
    <div>
      <p>Current theme: {mode}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### Theme Structure

Both themes provide consistent structure:

```typescript
interface Theme {
  colors: {
    // Risk level colors (consistent across themes)
    safe: string;
    caution: string; 
    danger: string;
    catastrophe: string;
    
    // Theme-specific colors
    background: {
      primary: string;    // Main gradient background
      secondary: string;  // Secondary surfaces
      tertiary: string;   // Tertiary surfaces
      surface: string;    // Card/modal surfaces
    };
    
    glass: {
      background: string; // Glass morphism background
      border: string;     // Glass borders
      shadow: string;     // Glass shadows
    };
    
    text: {
      primary: string;    // Main text
      secondary: string;  // Secondary text
      tertiary: string;   // Muted text
      inverse: string;    // Contrast text
    };
    
    border: {
      primary: string;    // Default borders
      secondary: string;  // Subtle borders
      accent: string;     // Accent borders
    };
  };
  
  typography: { /* fonts, sizes, weights */ };
  spacing: { /* responsive spacing scale */ };
  shadows: { /* glass, glow, danger, elevated */ };
  animations: { /* duration, easing */ };
  breakpoints: { /* mobile, tablet, desktop, wide */ };
}
```

### Theme Toggle Component

```tsx
import { ThemeToggle } from './components/ui/ThemeToggle';

// Basic usage
<ThemeToggle />

// With options
<ThemeToggle 
  size="lg"           // 'sm' | 'md' | 'lg'
  showLabel={true}    // Show text label
  className="custom"  // Custom styling
/>
```

---

## Responsive Layout System

### Breakpoints

```typescript
const breakpoints = {
  mobile: '480px',    // 0-480px
  tablet: '768px',    // 481-768px  
  desktop: '1024px',  // 769-1024px
  wide: '1280px'      // 1025px+
};
```

### Media Query Utilities

```tsx
import { media } from '../styles/responsive';

const Component = styled.div`
  padding: 1rem;
  
  ${media.tablet} {
    padding: 1.5rem;
  }
  
  ${media.desktop} {
    padding: 2rem;
  }
  
  ${media.fromTablet} {    // 768px and up
    display: flex;
  }
  
  ${media.mobile} {        // 0-480px only
    font-size: 0.875rem;
  }
`;
```

### Responsive Utilities

```tsx
import { 
  container, 
  grid, 
  flex, 
  spacing, 
  typography,
  aspectRatio 
} from '../styles/responsive';

const MyComponent = styled.div`
  ${container.standard}        // Responsive container
  ${grid.columns(3)}          // 3-column grid
  ${flex.row}                 // Flex row layout
  ${spacing.p('2rem')}        // Responsive padding
  ${typography.fluidText}     // Fluid text scaling
  ${aspectRatio.video}        // 16:9 aspect ratio
`;
```

---

## Layout Components

### Container

Responsive containers with automatic padding:

```tsx
import { Container } from './components/ui/Layout';

<Container variant="narrow">    {/* Max 640px */}
<Container variant="standard">  {/* Max 1024px */}
<Container variant="wide">      {/* Max 1280px */}
<Container variant="fluid">     {/* 90% width */}
<Container variant="full">      {/* 100% width */}
```

### Grid System

Responsive grid layouts:

```tsx
import { Grid, CardGrid } from './components/ui/Layout';

{/* Basic grid */}
<Grid cols={3} gap="1rem">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>

{/* Auto-fit grid */}
<Grid autoFit="250px" gap="1.5rem">
  {items.map(item => <Card key={item.id} {...item} />)}
</Grid>

{/* Game-specific card grid */}
<CardGrid variant="scenarios">
  {scenarios.map(scenario => <ScenarioCard key={scenario.id} {...scenario} />)}
</CardGrid>
```

### Flexible Layouts

```tsx
import { Flex, Stack, Inline } from './components/ui/Layout';

{/* Flex container */}
<Flex direction="column" align="center" gap="1rem">
  <div>Header</div>
  <div>Content</div>
</Flex>

{/* Vertical stack */}
<Stack space="1.5rem">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>

{/* Horizontal inline */}
<Inline space="1rem" align="center">
  <button>Button 1</button>
  <button>Button 2</button>
</Inline>
```

### Responsive Panels

Game-specific positioned panels:

```tsx
import { ResponsivePanel } from './components/ui/Layout';

{/* Top status bar */}
<ResponsivePanel position="top" size="md">
  <GameTitle>The Narrow Path</GameTitle>
  <StatusDisplay />
</ResponsivePanel>

{/* Bottom controls */}
<ResponsivePanel position="bottom" size="lg">
  <ActionButton>Start Scenario</ActionButton>
</ResponsivePanel>

{/* Floating panel */}
<ResponsivePanel position="center" size="sm">
  <Modal>Game Over</Modal>
</ResponsivePanel>
```

---

## UI Components

### Button Component

Versatile button with multiple variants:

```tsx
import { Button } from './components/ui/Button';

{/* Basic usage */}
<Button>Click me</Button>

{/* Variants */}
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="danger">Danger Button</Button>

{/* Sizes */}
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

{/* States */}
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>

{/* With animations */}
<Button 
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  Animated Button
</Button>
```

### Form Components

Comprehensive form input system:

```tsx
import { 
  Input, 
  EmailInput, 
  PasswordInput, 
  Select, 
  Checkbox,
  CreditCardInput 
} from './components/ui';

{/* Basic input */}
<Input 
  label="Username"
  placeholder="Enter username"
  error={errors.username}
  variant={errors.username ? 'error' : 'default'}
/>

{/* Specialized inputs */}
<EmailInput 
  label="Email Address"
  value={email}
  onChange={setEmail}
  error={errors.email}
/>

<PasswordInput 
  label="Password"
  showStrength={true}
  value={password}
  onChange={setPassword}
/>

{/* Select dropdown */}
<Select
  label="Country"
  options={countryOptions}
  value={selectedCountry}
  onChange={setSelectedCountry}
  placeholder="Select a country"
/>

{/* Checkbox */}
<Checkbox
  label="I accept the terms and conditions"
  checked={agreed}
  onChange={setAgreed}
  variant={errors.terms ? 'error' : 'default'}
/>

{/* Credit card input */}
<CreditCardInput
  label="Card Number"
  value={cardNumber}
  onChange={setCardNumber}
  onCardTypeDetected={setCardType}
  error={errors.cardNumber}
/>
```

### Loading Components

```tsx
import { LoadingScreen } from './components/ui/LoadingScreen';

{/* Full screen loading */}
<LoadingScreen />

{/* Custom loading */}
<LoadingScreen 
  message="Initializing AI Risk Simulation..."
  progress={75}
  showProgress={true}
/>
```

---

## Game Components

### Game UI

Main game interface component:

```tsx
import { GameUI } from './components/ui/GameUI';

<GameUI 
  pDoomValue={0.15}        // 0-1 scale
  dystopiaLevel={0.23}     // 0-1 scale  
  pathPosition={0.67}      // 0-1 scale
  onStartScenario={handleStartScenario}
/>
```

### Scenario Viewer

Interactive scenario display:

```tsx
import { ScenarioViewer } from './components/scenarios/ScenarioViewer';

<ScenarioViewer
  title="AI Safety Summit"
  description="World leaders gather to discuss AI governance..."
  choices={choices}
  onChoice={handleChoice}
  gameState={gameState}
  visible={showScenario}
/>
```

### Responsive Typography

```tsx
import { 
  ResponsiveTitle, 
  ResponsiveSubtitle, 
  ResponsiveText 
} from './components/ui/Layout';

<ResponsiveTitle size="xl">Game Title</ResponsiveTitle>
<ResponsiveSubtitle>Subtitle text</ResponsiveSubtitle>
<ResponsiveText>Body text that scales fluidly</ResponsiveText>
```

---

## Usage Examples

### Complete Form Example

```tsx
import { 
  Container, 
  Stack, 
  Button, 
  Input, 
  EmailInput, 
  Select,
  Checkbox 
} from './components/ui';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    terms: false
  });
  
  const [errors, setErrors] = useState({});

  return (
    <Container variant="narrow">
      <Stack space="1.5rem">
        <Input
          label="Full Name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            name: e.target.value 
          }))}
          error={errors.name}
          variant={errors.name ? 'error' : 'default'}
        />
        
        <EmailInput
          label="Email Address"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            email: e.target.value 
          }))}
          error={errors.email}
        />
        
        <Select
          label="Country"
          options={countryOptions}
          value={formData.country}
          onChange={(value) => setFormData(prev => ({ 
            ...prev, 
            country: value 
          }))}
          error={errors.country}
        />
        
        <Checkbox
          label="I accept the terms and conditions"
          checked={formData.terms}
          onChange={(checked) => setFormData(prev => ({ 
            ...prev, 
            terms: checked 
          }))}
          error={errors.terms}
          variant={errors.terms ? 'error' : 'default'}
        />
        
        <Button 
          variant="primary" 
          size="lg"
          onClick={handleSubmit}
          loading={isSubmitting}
        >
          Create Account
        </Button>
      </Stack>
    </Container>
  );
}
```

### Responsive Game Layout

```tsx
import { 
  Container, 
  Grid, 
  ResponsivePanel, 
  ThemeToggle,
  GameUI 
} from './components/ui';

function GameScreen() {
  return (
    <Container variant="full">
      {/* Top status bar */}
      <ResponsivePanel position="top">
        <Flex justify="space-between" align="center">
          <ResponsiveTitle>The Narrow Path</ResponsiveTitle>
          <Inline space="1rem" align="center">
            <StatusDisplay />
            <ThemeToggle size="sm" />
          </Inline>
        </Flex>
      </ResponsivePanel>
      
      {/* Main game area */}
      <Container variant="standard">
        <Grid cols={1} gap="2rem">
          <Canvas3D />
          <ScenarioPanel />
        </Grid>
      </Container>
      
      {/* Bottom controls */}
      <ResponsivePanel position="bottom">
        <Inline space="1rem" justify="center">
          <Button variant="primary">Continue</Button>
          <Button variant="outline">Reset</Button>
        </Inline>
      </ResponsivePanel>
    </Container>
  );
}
```

---

## Best Practices

### Component Development

1. **Use TypeScript**: All components should have proper type definitions
2. **Responsive First**: Use responsive utilities for all layouts
3. **Theme Aware**: Use theme colors and spacing consistently
4. **Performance**: Use GPU acceleration for animations
5. **Accessibility**: Include ARIA labels and keyboard navigation

### Styling Guidelines

```tsx
// ✅ Good: Use theme variables
const Button = styled.button`
  background: ${props => props.theme.colors.glass.background};
  color: ${props => props.theme.colors.text.primary};
  padding: ${props => props.theme.spacing.md};
`;

// ❌ Bad: Hard-coded values
const Button = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  padding: 16px;
`;
```

### Animation Best Practices

```tsx
// ✅ Good: GPU accelerated
const AnimatedComponent = styled(motion.div)`
  will-change: transform, opacity;
  transform: translateZ(0);
`;

// ✅ Good: Use theme timing
<motion.div
  transition={{ 
    duration: theme.animations.duration.normal,
    ease: theme.animations.easing.easeOut 
  }}
/>

// ❌ Bad: CPU intensive animations
const BadComponent = styled.div`
  transition: width 0.3s ease; // Causes layout recalculation
`;
```

### Responsive Design Patterns

```tsx
// ✅ Good: Mobile-first approach
const ResponsiveComponent = styled.div`
  // Mobile styles (default)
  padding: 1rem;
  font-size: 0.875rem;
  
  // Tablet and up
  ${media.tablet} {
    padding: 1.5rem;
    font-size: 1rem;
  }
  
  // Desktop and up
  ${media.desktop} {
    padding: 2rem;
    font-size: 1.125rem;
  }
`;
```

---

## Performance Guidelines

### Animation Performance

1. **Use transform properties**: `translateX/Y/Z`, `scale`, `rotate`
2. **Avoid layout properties**: `width`, `height`, `top`, `left`
3. **Use `will-change`**: For elements that will animate
4. **Use GPU acceleration**: `transform: translateZ(0)`

### Bundle Size Optimization

1. **Tree shaking**: Import only what you need
2. **Code splitting**: Use dynamic imports for large components
3. **Image optimization**: Use appropriate formats and sizes

### Rendering Performance

1. **Memoization**: Use `React.memo` for expensive components
2. **Virtual scrolling**: For large lists
3. **Lazy loading**: For off-screen content

---

## Component API Reference

### Theme System

| Hook | Description | Returns |
|------|-------------|---------|
| `useTheme()` | Main theme hook | `{ mode, theme, toggleTheme, setTheme, isSystemTheme, setSystemTheme }` |
| `useThemeMode()` | Current theme mode | `'dark' \| 'light'` |
| `useIsDarkTheme()` | Check if dark theme | `boolean` |

### Layout Components

| Component | Props | Description |
|-----------|-------|-------------|
| `Container` | `variant`, `className` | Responsive container |
| `Grid` | `cols`, `autoFit`, `autoFill`, `gap` | CSS Grid wrapper |
| `Flex` | `direction`, `align`, `justify`, `gap` | Flexbox wrapper |
| `Stack` | `space`, `align` | Vertical layout |
| `Inline` | `space`, `align`, `wrap` | Horizontal layout |
| `ResponsivePanel` | `position`, `size` | Game UI panels |

### Form Components

| Component | Props | Description |
|-----------|-------|-------------|
| `Button` | `variant`, `size`, `loading`, `disabled` | Interactive button |
| `Input` | `label`, `error`, `variant`, `size` | Text input |
| `EmailInput` | `label`, `error`, `variant` | Email validation |
| `PasswordInput` | `label`, `showStrength`, `error` | Password with strength |
| `Select` | `options`, `placeholder`, `error` | Dropdown selection |
| `Checkbox` | `label`, `checked`, `error`, `variant` | Checkbox input |

---

This documentation provides a comprehensive guide to using the UI framework effectively. For specific implementation details, refer to the component source files in `src/components/ui/` and styling utilities in `src/styles/`. 