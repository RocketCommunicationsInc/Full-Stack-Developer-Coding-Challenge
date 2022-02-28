<template>
  <TopHeader class="header"/> 
  <Dashboard />
</template>

<script>
// Import local controls.
import TopHeader from "./TopHeader.vue"
import Dashboard from "./Dashboard.vue"

export default {
  name: 'HomeView',
  components: {
    Dashboard,
    TopHeader
  }
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
