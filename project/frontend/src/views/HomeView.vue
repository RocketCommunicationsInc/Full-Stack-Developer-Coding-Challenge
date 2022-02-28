<template>
  <TopHeader class="header"/> 
  <Dashboard />
</template>

<script>
// Import local controls.
import AlertsView from "./AlertsView.vue"
import TopHeader from "./TopHeader.vue"
import ContactsView from "./ContactsView.vue"
import LoginView from "./LoginView.vue"
import Dashboard from "./Dashboard.vue"
import RegisterView from "./RegisterView.vue"


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
    RegisterView,
    TopHeader
  },
  setup() {

    const getDisplayName = () => {
     username = this.user.firstname.charAt(0) + ". " + this.user.lastname
     return username
    }
    
    return {  getDisplayName }
  },
}
</script>

<style scoped>
.header{
  width:100%;
}
div{
  margin: 10px;
}

</style>
