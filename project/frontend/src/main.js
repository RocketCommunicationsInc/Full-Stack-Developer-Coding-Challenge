import { createApp, Vue } from 'vue'
import App from './App.vue'
import router from './router'

Vue.prototype.$API_BASE_URL = "http://nickloy-fullstack-challenge.herokuapp.com/api/"

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
