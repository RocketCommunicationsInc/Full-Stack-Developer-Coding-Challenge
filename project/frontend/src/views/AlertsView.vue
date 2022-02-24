<template>
    <div v-if="error">{{ error }}</div>
    <div v-for="alert in alerts" :key="alert.id">
      <li>
          {{ alert.message }} - {{ alert.category.category }} - {{ alert.time }}
      </li>
    </div>
</template>

<script>
import getAlerts from "../composable/getAlerts.js"

export default {
  name: 'AlertsView',
  components: {
  },
  setup() {
    const { alerts, error, load } = getAlerts()
    
    load()

    return { alerts, error }
  }
}
</script>

<style>

</style>