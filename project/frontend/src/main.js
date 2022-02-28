import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Astro-Components
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css'

import {
    applyPolyfills,
    defineCustomElements,
} from '@astrouxds/astro-web-components/loader'

applyPolyfills().then(() => {
    defineCustomElements()
})

createApp(App).use(router).mount('#app')
