/**
 * plugins/vuetify.ts
 *
 * Vuetify configuration with clean, eye-pleasing themes and borderless cards
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { LIGHT_THEME, BLUE_THEME } from '@/theme/LightTheme'
import {
  DARK_THEME,
  DARK_BLUE_THEME,
  DARK_AQUA_THEME,
  DARK_PURPLE_THEME,
  DARK_GREEN_THEME,
  DARK_CYAN_THEME,
  DARK_ORANGE_THEME,
} from '@/theme/DarkTheme'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: LIGHT_THEME,
      dark: DARK_THEME,
      BLUE_THEME,
      DARK_BLUE_THEME,
      DARK_AQUA_THEME,
      DARK_PURPLE_THEME,
      DARK_GREEN_THEME,
      DARK_CYAN_THEME,
      DARK_ORANGE_THEME,
    },
  },
  defaults: {
    VCard: {
      rounded: 'lg',
      elevation: 0,
    },
    VTextField: {
      density: 'comfortable',
      color: 'primary',
    },
    VSelect: {
      density: 'comfortable',
      color: 'primary',
    },
    VListItem: {
      minHeight: '38px',
      rounded: 'md',
    },
    VBtn: {
      rounded: 'md',
      elevation: 0,
    },
    VChip: {
      rounded: 'sm',
    },
  },
})
