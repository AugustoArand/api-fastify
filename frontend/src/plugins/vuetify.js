import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const harleyTheme = {
    dark: true,
    colors: {
        primary: '#E85D04',
        secondary: '#C9A227',
        accent: '#C9A227',
        error: '#E5484D',
        info: '#4A9EFF',
        success: '#4CAF50',
        warning: '#C9A227',
        background: '#0a0a0b',
        surface: '#17171a',
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
