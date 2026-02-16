import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const harleyTheme = {
    dark: true,
    colors: {
        primary: '#FF6B00',
        secondary: '#FF8533',
        accent: '#FFA500',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        background: '#0a0a0a',
        surface: '#1a1a1a',
    }
}

export default createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'harleyTheme',
        themes: {
            harleyTheme
        }
    }
})
