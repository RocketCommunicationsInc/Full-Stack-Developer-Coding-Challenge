<template>
<rux-global-status-bar app-domain="Full Stack Demo"
  username="D. Nickloy"
  include-icon="true"
  menu-icons="apps">
    <rux-clock class="right"></rux-clock>
  </rux-global-status-bar>
  <Dashboard >
    
  </Dashboard>
<!-- <LoginView v-if="!isAuthenticated" class='content'></LoginView> -->
</template>

<script>
// Import local controls.
import AlertsView from "./AlertsView.vue"
import ContactsView from "./ContactsView.vue"
import LoginView from "./LoginView.vue"

// Import Astro controls.
import { RuxButton } from '@astrouxds/astro-web-components/dist/components/rux-button'
import { RuxInput } from '@astrouxds/astro-web-components/dist/components/rux-input'
import { RuxGlobalStatusBar } from '@astrouxds/astro-web-components/dist/components/rux-global-status-bar'
import { RuxClock } from '@astrouxds/astro-web-components/dist/components/rux-global-status-bar'
import Dashboard from "./Dashboard.vue"

export default {
  name: 'HomeView',
  components: {
    AlertsView,
    ContactsView,
    LoginView,
    Dashboard
},
  setup() {
    let isAuthenticated = false

    return { isAuthenticated }
  }
}
</script>

<style scoped>
.right{
  margin-left: auto;
  margin-right: 0px;
}

</style>
