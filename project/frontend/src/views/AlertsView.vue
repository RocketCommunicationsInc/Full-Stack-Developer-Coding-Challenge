<template>
    <div v-if="error">{{ error }}</div>
    <rux-table>
        <rux-table-header>
            <rux-table-header-row>
                <rux-table-header-cell>Message</rux-table-header-cell>
                <rux-table-header-cell @click="sortCategory">Category <i class="fas fa-sort"></i></rux-table-header-cell>
                <rux-table-header-cell>Time</rux-table-header-cell>
                </rux-table-header-row>
        </rux-table-header>
        <rux-table-body v-for="alert in alerts" :key="alert.id">
            <rux-table-row>
                <rux-table-cell>{{ alert.message }}</rux-table-cell>
                <rux-table-cell>{{ alert.category.display}}</rux-table-cell>
                <rux-table-cell>{{ formatAlertTime(alert) }}</rux-table-cell>
            </rux-table-row>
        </rux-table-body>
    </rux-table>
</template>

<script>
import getAlerts from "../composable/getAlerts.js"
import formatTimeString from "../composable/timeUtils.js"
import RuxTable from '@astrouxds/astro-web-components/dist/components/rux-table'
import RuxTableHeader from '@astrouxds/astro-web-components/dist/components/rux-table-header'
import RuxTableHeaderRow from '@astrouxds/astro-web-components/dist/components/rux-table-header-row'
import RuxTableHeaderCell from '@astrouxds/astro-web-components/dist/components/rux-table-header-cell'
import RuxTableBody from '@astrouxds/astro-web-components/dist/components/rux-table-body'
import RuxTableRow from '@astrouxds/astro-web-components/dist/components/rux-table-row'
import RuxTableCell from '@astrouxds/astro-web-components/dist/components/rux-table-cell'

export default {
  name: 'AlertsView',
  components: {
  },
  setup() {
    let sort_direction = true
    const { alerts, error, load } = getAlerts()
    
    load()
    
    const formatAlertTime = (alert) => {
        return formatTimeString(alert.time)
    }
    
    const sortCategory = () =>{
        if (sort_direction){
            alerts.value.sort((t1,t2) => t1.category.id < t2.category.id ? -1 : 1);
            sort_direction = false
        }
        else{
            alerts.value.sort((t1,t2) => t1.category.id > t2.category.id ? -1 : 1);
            sort_direction = true
        }
    }

    return { alerts, error, formatAlertTime, sortCategory }
  }
}
</script>

<style scoped>
td, th {
    text-align: left;
}

</style>