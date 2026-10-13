/**
 * Minimalist White, Black & Blue Light Theme
 */
export const LIGHT_THEME = {
  name: 'light',
  dark: false,
  colors: {
    primary: '#0066cc', // Clean signature Blue
    secondary: '#475569', // Slate 600
    info: '#0284c7', // Sky Blue
    success: '#059669', // Emerald Green
    warning: '#d97706', // Amber
    error: '#dc2626', // Red
    background: '#f8fafc', // Soft Slate White
    surface: '#ffffff', // Pure White
    'surface-variant': '#f1f5f9', // Clean soft surface
    'on-background': '#0f172a', // Deep Slate text
    'on-surface': '#0f172a', // Deep Slate text
    'on-surface-variant': '#334155', // Slate text
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    containerBg: '#ffffff',
    grey100: '#64748b',
    grey200: '#0f172a',
  },
  variables: {
    'border-color': '#e2e8f0',
    'border-opacity': 0.8,
  },
}

export const BLUE_THEME = LIGHT_THEME
