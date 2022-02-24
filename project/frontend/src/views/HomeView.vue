<template>
<LoginView></LoginView>
<!-- <rux-button size="large"></rux-button>
<rux-input type="email"></rux-input>
  <div class="home">
    <AlertsView />
    <ContactsView />
  </div> -->
</template>

<script>
import AlertsView from "./AlertsView.vue"
import ContactsView from "./ContactsView.vue"
import LoginView from "./LoginView.vue"


import { RuxButton } from '@astrouxds/astro-web-components/dist/components/rux-button'
import { RuxInput } from '@astrouxds/astro-web-components/dist/components/rux-input'

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

</style>
