<template>
<div class="row justify-content-center text-white">
  <div class="col-3" v-for="state in states" :key="state.id">
    <h1>{{ state.count }}</h1>
    <strong>{{ state.state }}</strong>
    </div>
  <div class="col-3">
    <h1>{{ contacts.length }} </h1>
    <strong>Total</strong>
  </div>
</div> <!-- end row div -->
    <div v-if="contactsError">{{ error }}</div>
<div class="row">
  <div class="col-md-12">
    <rux-table>
      <rux-table-header>
        <rux-table-header-row>
          <rux-table-header-cell @click="sortName">Name <i class="fas fa-sort"></i></rux-table-header-cell>
          <rux-table-header-cell>Status</rux-table-header-cell>
          <rux-table-header-cell>AOC-EOC</rux-table-header-cell>
        </rux-table-header-row>
      </rux-table-header>
        <rux-table-body v-for="contact in contacts" :key="contact.id">
            <rux-table-row>
                <rux-table-cell>{{ contact.name }}</rux-table-cell>
                <rux-table-cell>{{ contact.status.display}}</rux-table-cell>
                <rux-table-cell>{{ formatContactStartEndTimestamps(contact) }}</rux-table-cell>
            </rux-table-row>
        </rux-table-body>
    </rux-table>

  </div>
</div>
</template>

<script>
import getContacts from "../composable/getContacts.js"
import getContactStates from "../composable/getContactStates.js"
import formatTimeString from "../composable/timeUtils.js"
import { ref } from 'vue'
import RuxTable from '@astrouxds/astro-web-components/dist/components/rux-table'
import RuxTableHeader from '@astrouxds/astro-web-components/dist/components/rux-table-header'
import RuxTableHeaderRow from '@astrouxds/astro-web-components/dist/components/rux-table-header-row'
import RuxTableHeaderCell from '@astrouxds/astro-web-components/dist/components/rux-table-header-cell'
import RuxTableBody from '@astrouxds/astro-web-components/dist/components/rux-table-body'
import RuxTableRow from '@astrouxds/astro-web-components/dist/components/rux-table-row'
import RuxTableCell from '@astrouxds/astro-web-components/dist/components/rux-table-cell'

export default {
  name: 'ContactsView',
  components: {
  },
  setup() {
    // Init objects.
    let sort_direction = true
    const { contacts, contactsError, load} = getContacts()
    const { states, stateError, loadStates} = getContactStates()
    
    // Load the contacts data.
    load()
    loadStates()
    
    const formatContactStartEndTimestamps = (contact) => {
        let startTime = formatTimeString(contact.begin_timestamp)
        let endTime = formatTimeString(contact.end_timestamp)
        return startTime + " - " + endTime
    }
    
    const sortName = () => {
      if(sort_direction){
        sort_direction = false
        contacts.value.sort((t1,t2) => t1.name > t2.name ? -1 : 1);
      }
      else{
        sort_direction = true
        contacts.value.sort((t1,t2) => t1.name < t2.name ? -1 : 1);

      }

    }
    
    return { contacts, contactsError, stateError, formatContactStartEndTimestamps, states, sortName}
  },
}
</script>

<style>
td,th{
  text-align: left;
}
div{
  margin: 5px;
}
</style>