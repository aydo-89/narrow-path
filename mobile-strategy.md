# Mobile App Strategy for "The Narrow Path"

## Phase 1: PWA (Immediate - 1 week)
- ✅ Already have workbox-webpack-plugin installed
- Add app manifest for "Add to Home Screen"
- Optimize touch interactions
- Test on mobile browsers

## Phase 2: React Native (2-4 weeks)
### Advantages:
- Reuse 90% of our React/TypeScript code
- Three.js works via `react-native-three`
- Same dual-axis game logic
- Cross-platform (iOS + Android)

### Key Changes Needed:
```javascript
// Replace styled-components with
import { StyleSheet } from 'react-native';

// Replace Canvas with
import { Canvas } from '@react-three/fiber/native';

// Replace navigation with
import { NavigationContainer } from '@react-navigation/native';
```

## Phase 3: Native Features (1-2 weeks)
- Push notifications for daily scenarios
- Offline mode with cached scenarios
- Share results to social media
- Haptic feedback for choices

## Distribution Strategy:
1. **iOS App Store** - Educational game category
2. **Google Play Store** - Educational section
3. **Web version** - Remains accessible
4. **Corporate training** - B2B licensing potential

## Marketing Angles:
- "Learn AI safety through gameplay"
- "Navigate the future of AI governance"
- "Educational tool for understanding AI risk"
- Target audience: Tech professionals, policy makers, students

## Revenue Models:
- Freemium: Basic scenarios free, advanced content paid
- Corporate licensing for training programs
- Educational institution partnerships
- Premium "scenarios designed by AI safety experts"

Would you like me to start with the PWA setup first? 