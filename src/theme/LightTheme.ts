/**
 * Minimalist White, Black & Blue Light Theme
 */
export const LIGHT_THEME = {
  name: 'light',
  dark: false,
  colors: {
    primary: '#0066cc', // Clean signature Blue
    secondary: '#475569', // Neutral Black/Slate
    info: '#0066cc', // Blue
    success: '#0066cc', // Blue
    warning: '#0f172a', // Black
    error: '#0066cc', // Blue
    background: '#f8fafc', // Soft White
    surface: '#ffffff', // Pure White
    'surface-variant': '#f1f5f9', // Clean soft surface
    'on-background': '#000000', // Pure Black text
    'on-surface': '#000000', // Pure Black text
    'on-surface-variant': '#0f172a', // Clean Black text
    textPrimary: '#000000',
    textSecondary: '#475569',
    containerBg: '#ffffff',
    grey100: '#64748b',
    grey200: '#000000',
  },
  variables: {
    'border-color': 'transparent',
    'border-opacity': 0,
  },
}

export const BLUE_THEME = LIGHT_THEME
