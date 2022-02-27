<template>
<rux-global-status-bar app-domain="Full Stack Demo"
  include-icon="true"
  menu-icons="apps">
    <rux-clock class="right"></rux-clock>
  </rux-global-status-bar>
  <Dashboard >
    
  </Dashboard>
  <!-- <RegisterView></RegisterView> -->
<!-- <LoginView v-if="!isAuthenticated" class='content'></LoginView> -->
</template>

<script>
// Import local controls.
import AlertsView from "./AlertsView.vue"
import ContactsView from "./ContactsView.vue"
import LoginView from "./LoginView.vue"
import Dashboard from "./Dashboard.vue"
import RegisterView from "./RegisterView.vue"

// Import Astro controls.
import { RuxButton } from '@astrouxds/astro-web-components/dist/components/rux-button'
import { RuxInput } from '@astrouxds/astro-web-components/dist/components/rux-input'
import { RuxGlobalStatusBar } from '@astrouxds/astro-web-components/dist/components/rux-global-status-bar'
import { RuxClock } from '@astrouxds/astro-web-components/dist/components/rux-global-status-bar'

export default {
  name: 'HomeView',
  props:{
    user: {
      firstname: "",
      lastname: "",
      email: ""
    }
  },
  components: {
    AlertsView,
    ContactsView,
    LoginView,
    Dashboard,
    RegisterView
  },
  setup() {
    let isAuthenticated = false

    const getDisplayName = () => {
     username = this.user.firstname.charAt(0) + ". " + this.user.lastname
     return username
    }
    return { isAuthenticated, getDisplayName }
  },
}
</script>

<style scoped>
.right{
  margin-left: auto;
  margin-right: 0px;
}

</style>
