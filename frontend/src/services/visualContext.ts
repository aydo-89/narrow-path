// Visual Context System for AI Image Generation
// Maintains consistency while generating dynamic, contextual imagery

export interface VisualStyle {
  // Core aesthetic parameters
  artStyle: 'elegant-apocalypse' | 'cyberpunk' | 'minimalist' | 'documentary';
  colorPalette: {
    primary: string[];
    chaos: string[];      // Red spectrum for P(doom) scenarios
    dystopia: string[];   // Blue spectrum for control scenarios
    safe: string[];       // Green spectrum for narrow path
    neutral: string[];
  };
  lighting: 'dramatic' | 'soft' | 'harsh' | 'ethereal';
  composition: 'centered' | 'rule-of-thirds' | 'dynamic' | 'symmetrical';
  perspective: 'human-eye' | 'bird-eye' | 'worm-eye' | 'isometric';
}

export interface SceneContext {
  // Environmental storytelling
  setting: {
    location: string;
    timeOfDay: 'dawn' | 'day' | 'dusk' | 'night';
    weather: 'clear' | 'cloudy' | 'stormy' | 'foggy';
    atmosphere: 'tense' | 'hopeful' | 'ominous' | 'uncertain';
  };
  
  // Characters and focus
  subjects: {
    primaryFocus: string;
    characters?: string[];
    objects?: string[];
    technology?: string[];
  };
  
  // Narrative elements
  mood: {
    tension: number;      // 0-100
    hope: number;         // 0-100  
    urgency: number;      // 0-100
  };
}

export interface GameStateVisuals {
  // Dynamic elements based on current game state
  pDoomInfluence: {
    chaosLevel: number;           // 0-100, affects scene disorder
    techGlitches: boolean;        // Show AI systems malfunctioning
    crowdBehavior: 'calm' | 'anxious' | 'panicked' | 'chaotic';
    environmentalDecay: number;    // 0-100, visual deterioration
  };
  
  dystopiaInfluence: {
    surveillanceLevel: number;     // 0-100, cameras, monitoring
    controlSymbols: boolean;       // Authoritarian imagery
    uniformity: number;           // 0-100, how standardized everything looks
    architecturalStyle: 'open' | 'imposing' | 'fortress-like' | 'panopticon';
  };
  
  pathPosition: {
    balance: 'chaos-leaning' | 'centered' | 'control-leaning';
    visualMetaphor: string;       // e.g., "walking on tightrope", "balancing on edge"
    proximityToDanger: number;    // 0-100, how close to either extreme
  };
}

export interface VisualPromptTemplate {
  // Complete prompt structure for AI generation
  id: string;
  name: string;
  category: 'scenario' | 'background' | 'character' | 'ui-element';
  
  // Base prompt components
  basePrompt: string;
  styleModifiers: string[];
  qualityTags: string[];
  
  // Dynamic insertion points
  contextSlots: {
    [key: string]: string;  // e.g., {mood}, {setting}, {characters}
  };
  
  // Negative prompts (what to avoid)
  negativePrompts: string[];
  
  // Technical parameters
  dimensions: {
    width: number;
    height: number;
    aspectRatio: string;
  };
  
  // Mobile optimization
  mobileOptimized: boolean;
  compressionLevel: 'high' | 'medium' | 'low';
}

// Visual Context Profiles
export const VISUAL_PROFILES = {
  // Main game aesthetic
  elegantApocalypse: {
    artStyle: 'elegant-apocalypse',
    colorPalette: {
      primary: ['#1a1a2e', '#16213e', '#0f172a'],
      chaos: ['#ef4444', '#dc2626', '#991b1b'],
      dystopia: ['#3b82f6', '#1e40af', '#1e3a8a'],
      safe: ['#10b981', '#059669', '#047857'],
      neutral: ['#6b7280', '#4b5563', '#374151']
    },
    lighting: 'dramatic',
    composition: 'rule-of-thirds',
    perspective: 'human-eye'
  } as VisualStyle,

  // Scenario-specific templates
  scenarioTemplates: {
    aiSummit: {
      id: 'ai-summit-2025',
      name: 'AI Safety Summit',
      category: 'scenario',
      basePrompt: 'World leaders gathered around a futuristic conference table, discussing AI governance in a sleek, modern conference room',
      styleModifiers: [
        'elegant apocalypse aesthetic',
        'dramatic lighting with deep blues and subtle amber accents',
        'sophisticated, professional atmosphere',
        'subtle tension in body language'
      ],
      qualityTags: ['8k resolution', 'photorealistic', 'professional photography'],
      contextSlots: {
        mood: '{tension_level} atmosphere',
        setting: 'in {time_of_day} with {weather} visible through large windows',
        characters: 'featuring {character_count} diverse world leaders',
        chaos_level: 'with {chaos_indicators} visible in background screens',
        control_level: 'and {surveillance_elements} suggesting monitoring'
      },
      negativePrompts: [
        'cartoon', 'anime', 'low quality', 'blurry', 'distorted faces',
        'inappropriate content', 'violence', 'explicit imagery'
      ],
      dimensions: { width: 1792, height: 1024, aspectRatio: '16:9' },
      mobileOptimized: true,
      compressionLevel: 'medium'
    } as VisualPromptTemplate,

    techStartup: {
      id: 'tech-startup-scene',
      name: 'Tech Startup Decision',
      category: 'scenario',
      basePrompt: 'Modern tech startup office with developers working on AI systems, multiple monitors showing code and neural networks',
      styleModifiers: [
        'elegant apocalypse color scheme',
        'soft blue glow from screens',
        'minimalist modern office design',
        'subtle signs of pressure and intensity'
      ],
      qualityTags: ['high detail', 'realistic lighting', 'modern architecture'],
      contextSlots: {
        mood: 'conveying {tension_level} energy',
        chaos_level: 'with {error_messages} visible on some screens',
        control_level: 'and {monitoring_software} interfaces displayed',
        atmosphere: '{uncertainty_level} about the future'
      },
      negativePrompts: ['cluttered', 'messy', 'outdated technology', 'poor lighting'],
      dimensions: { width: 1024, height: 1024, aspectRatio: '1:1' },
      mobileOptimized: true,
      compressionLevel: 'high'
    } as VisualPromptTemplate
  }
};

// Dynamic Context Generator
export class VisualContextGenerator {
  
  static generateSceneContext(
    pDoom: number,
    dystopiaLevel: number,
    pathPosition: number,
    scenarioId: string
  ): SceneContext {
    
    // Calculate environmental storytelling based on game state
    const chaosInfluence = pDoom / 100;
    const controlInfluence = dystopiaLevel / 100;
    const balance = pathPosition / 50; // -1 to 1
    
    // Dynamic atmosphere calculation
    const tension = Math.max(chaosInfluence, controlInfluence) * 100;
    const hope = Math.max(0, (1 - Math.max(chaosInfluence, controlInfluence)) * 100);
    const urgency = Math.abs(balance) * 100;
    
    // Environmental conditions based on risk levels
    const getWeather = () => {
      if (tension > 70) return 'stormy';
      if (tension > 40) return 'cloudy';
      if (hope > 60) return 'clear';
      return 'foggy';
    };
    
    const getTimeOfDay = () => {
      if (controlInfluence > 0.7) return 'night';  // Dystopia = darkness
      if (chaosInfluence > 0.7) return 'dusk';     // Chaos = twilight
      if (hope > 60) return 'dawn';                // Hope = new beginning
      return 'day';
    };
    
    return {
      setting: {
        location: this.getScenarioLocation(scenarioId),
        timeOfDay: getTimeOfDay(),
        weather: getWeather(),
        atmosphere: tension > 70 ? 'ominous' : tension > 40 ? 'tense' : hope > 60 ? 'hopeful' : 'uncertain'
      },
      subjects: {
        primaryFocus: this.getScenarioFocus(scenarioId),
        characters: this.getScenarioCharacters(scenarioId, controlInfluence, chaosInfluence),
        technology: this.getTechnologyElements(scenarioId, chaosInfluence, controlInfluence)
      },
      mood: {
        tension: Math.round(tension),
        hope: Math.round(hope),
        urgency: Math.round(urgency)
      }
    };
  }
  
  static buildPrompt(
    template: VisualPromptTemplate,
    context: SceneContext,
    gameState: GameStateVisuals
  ): string {
    let prompt = template.basePrompt;
    
    // Replace context slots with actual values
    Object.entries(template.contextSlots).forEach(([slot, slotTemplate]) => {
      const contextValue = this.resolveContextSlot(slot, context, gameState);
      prompt += `, ${slotTemplate.replace(`{${slot}}`, contextValue)}`;
    });
    
    // Add style modifiers
    prompt += `. Style: ${template.styleModifiers.join(', ')}`;
    
    // Add quality tags
    prompt += `. Quality: ${template.qualityTags.join(', ')}`;
    
    return prompt;
  }
  
  private static getScenarioLocation(scenarioId: string): string {
    const locations: { [key: string]: string } = {
      'ai-summit': 'United Nations headquarters conference room',
      'tech-startup': 'Modern Silicon Valley office space',
      'government-meeting': 'Government situation room',
      'research-lab': 'High-tech AI research laboratory',
      'public-forum': 'Modern auditorium with public audience'
    };
    return locations[scenarioId] || 'Modern meeting space';
  }
  
  private static getScenarioFocus(scenarioId: string): string {
    const focus: { [key: string]: string } = {
      'ai-summit': 'International diplomats in discussion',
      'tech-startup': 'Developers at workstations',
      'government-meeting': 'Policy makers reviewing documents',
      'research-lab': 'Scientists examining AI systems',
      'public-forum': 'Speaker addressing concerned audience'
    };
    return focus[scenarioId] || 'People in professional meeting';
  }
  
  private static getScenarioCharacters(
    scenarioId: string,
    controlInfluence: number,
    chaosInfluence: number
  ): string[] {
    const baseCharacters: { [key: string]: string[] } = {
      'ai-summit': ['world leaders', 'diplomats', 'advisors'],
      'tech-startup': ['software engineers', 'product managers', 'executives'],
      'government-meeting': ['policy makers', 'military advisors', 'intelligence officials'],
      'research-lab': ['AI researchers', 'data scientists', 'lab technicians'],
      'public-forum': ['speakers', 'audience members', 'moderators']
    };
    
    let characters = baseCharacters[scenarioId] || ['professionals'];
    
    // Modify based on game state
    if (controlInfluence > 0.6) {
      characters.push('security personnel', 'monitors');
    }
    if (chaosInfluence > 0.6) {
      characters.push('concerned individuals', 'protesters visible outside');
    }
    
    return characters;
  }
  
  private static getTechnologyElements(
    scenarioId: string,
    chaosInfluence: number,
    controlInfluence: number
  ): string[] {
    const baseTech: { [key: string]: string[] } = {
      'ai-summit': ['large displays', 'conference systems', 'translation devices'],
      'tech-startup': ['multiple monitors', 'development workstations', 'neural network visualizations'],
      'government-meeting': ['secure communication systems', 'classified displays', 'situation monitors'],
      'research-lab': ['AI training rigs', 'data visualization screens', 'robotic systems'],
      'public-forum': ['projection systems', 'broadcast equipment', 'social media feeds']
    };
    
    let tech = baseTech[scenarioId] || ['modern displays', 'communication systems'];
    
    // Dynamic tech based on game state
    if (chaosInfluence > 0.5) {
      tech.push('error messages', 'system glitches', 'warning indicators');
    }
    if (controlInfluence > 0.5) {
      tech.push('surveillance cameras', 'monitoring systems', 'biometric scanners');
    }
    
    return tech;
  }
  
  private static resolveContextSlot(
    slot: string,
    context: SceneContext,
    gameState: GameStateVisuals
  ): string {
    const resolvers: { [key: string]: () => string | number } = {
      tension_level: () => context.mood.tension > 70 ? 'high-tension' : 
                          context.mood.tension > 40 ? 'moderate-tension' : 'calm',
      time_of_day: () => context.setting.timeOfDay,
      weather: () => context.setting.weather,
      character_count: () => Math.floor(Math.random() * 5) + 3,
      chaos_indicators: () => gameState.pDoomInfluence.chaosLevel > 50 ? 
                             'system alerts and error messages' : 'stable system displays',
      surveillance_elements: () => gameState.dystopiaInfluence.surveillanceLevel > 50 ?
                                  'security cameras and monitoring interfaces' : 'standard office equipment',
      uncertainty_level: () => context.mood.urgency > 70 ? 'high uncertainty' : 
                              context.mood.urgency > 40 ? 'moderate concern' : 'cautious optimism'
    };
    
    return String(resolvers[slot]?.() || slot);
  }
}

// Export for use in components
export default VisualContextGenerator; 