<template>
<rux-global-status-bar app-domain="Full Stack Demo"
  username="D. Nickloy"
  include-icon="true">
    <rux-clock class="right"></rux-clock>
  </rux-global-status-bar>
<LoginView class='content'></LoginView>
</template>

<script>
import AlertsView from "./AlertsView.vue"
import ContactsView from "./ContactsView.vue"
import LoginView from "./LoginView.vue"


import { RuxButton } from '@astrouxds/astro-web-components/dist/components/rux-button'
import { RuxInput } from '@astrouxds/astro-web-components/dist/components/rux-input'
import { RuxGlobalStatusBar } from '@astrouxds/astro-web-components/dist/components/rux-global-status-bar'
import { RuxClock } from '@astrouxds/astro-web-components/dist/components/rux-global-status-bar'

export default {
  name: 'HomeView',
  components: {
    AlertsView,
    ContactsView,
    LoginView
},
  setup() {
  }
}
</script>

<style scoped>
.right{
  margin-left: auto;
  margin-right: 0px;
}

</style>
