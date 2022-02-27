<template>
<rux-pop-up-menu id="popup-menu-1">
    <rux-menu-item>
      <router-link :to="{name: 'home'}">
        Dashboard
      </router-link>
    </rux-menu-item>
    <rux-menu-item-divider></rux-menu-item-divider>
    <rux-menu-item @click="logout">Signout</rux-menu-item>
</rux-pop-up-menu>

<rux-global-status-bar app-domain="Full Stack Demo"
  include-icon="true"
  menu-icons="apps">
    <rux-clock class="right"></rux-clock>
    <rux-icon icon="settings" label="Settings" color="#fff" @click="displayPopupMenu" aria-controls="popup-menu-1" aria-haspopup="true"></rux-icon>
  </rux-global-status-bar>
  
  <div class="row">
    <div class="col-md-12">
      <Dashboard />
    </div>
  </div>
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
    
    const logout = () =>{
      localStorage.clear()
      window.location.href = '/login'
    }
    return { isAuthenticated, getDisplayName , logout}
  },
}
</script>

<style scoped>
.right{
  margin-left: auto;
  margin-right: 0px;
}

div{
  margin: 10px;
}
</style>
