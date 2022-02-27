<template>
    <table class="table table-striped">
        <colgroup>
            <col span="1" style="width: 65%;">
            <col span="1" style="width: 10%;">
            <col span="1" style="width: 25%;">
        </colgroup>
        <thead class="thead-dark">
            <tr>
                <th>Message</th>
                <th>Category</th>
                <th>Time</th>
            </tr>
        </thead>
        <tbody v-for="alert in alerts" :key="alert.id">
            <tr>
                <td>{{alert.message}}</td>
                <td>{{alert.category.display}}</td>
                <td class="text-right">{{ formatAlertTime(alert) }}</td>
            </tr>

        </tbody>
    </table>
    <div v-if="error">{{ error }}</div>
</template>

<script>
import getAlerts from "../composable/getAlerts.js"
import formatTimeString from "../composable/timeUtils.js"

export default {
  name: 'AlertsView',
  components: {
  },
  setup() {
    const { alerts, error, load } = getAlerts()
    
    load()
    
    const formatAlertTime = (alert) => {
        return formatTimeString(alert.time)
    }

    return { alerts, error, formatAlertTime }
  }
}
</script>

<style scoped>
td, th {
    text-align: left;
}

</style>