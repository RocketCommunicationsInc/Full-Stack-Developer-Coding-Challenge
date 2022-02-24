<template>
  <div class="home">
    <AlertsView />
    <ContactsView />
  </div>
</template>

<script>
import AlertsView from "./AlertsView.vue"
import ContactsView from "./ContactsView.vue"

export default {
  name: 'HomeView',
  components: {
    AlertsView,
    ContactsView
},
  setup() {
  }
}
</script>
