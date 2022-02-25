<template>
<div class="row">
  <div class="col-md-4">
    <table>
      <thead>
        <tr>State</tr>
        <tr>Total</tr>
      </thead>
      <tbody v-for="state in states" :key="state.id">
        <tr>
          <td>{{ state.state}}</td>
          <td>{{ state.count }}</td>
        </tr>
      </tbody>
    </table>
    <div class="col-md-4">
    Contacts: {{ contacts.length }}
    </div>
  </div>
<!-- Contacts total
contactState / totals -->
</div>
<div class="row">
  <div class="col-md-12">
    <table class="table table-striped">
        <colgroup>
            <col span="1" style="width: 50%;">
            <col span="1" style="width: 25%;">
            <col span="1" style="width: 25%;">
        </colgroup>
        <thead class="thead-dark">
            <tr>
                <th>Name</th>
                <th>Status</th>
                <th>AOC-EOC</th>
            </tr>
        </thead>
        <tbody v-for="contact in contacts" :key="contact.id">
            <tr>
                <td>{{ contact.name }}</td>
                <td>{{ contact.status.display }} (Step: {{ contact.step.step }})</td>
                <td class="text-right">{{ formatContactStartEndTimestamps(contact) }}</td>
            </tr>
        </tbody>
    </table>
    <div v-if="contactsError">{{ error }}</div>

  </div>
</div>
</template>

<script>
import getContacts from "../composable/getContacts.js"
import getContactStates from "../composable/getContactStates.js"
import { ref } from 'vue'

export default {
  name: 'ContactsView',
  components: {
  },
  setup() {
    // Init objects.
    const { contacts, contactsError, load} = getContacts()
    const { states, stateError, loadStates} = getContactStates()
    
    // Load the contacts data.
    load()
    loadStates()
    
    const formatContactStartEndTimestamps = (contact) => {
        let start = new Date(contact.begin_timestamp)
        let startTime = start.getHours() + ':' + start.getMinutes() + ':' + start.getSeconds()

        let end = new Date(contact.end_timestamp)
        let endTime = end.getHours() + ':' + end.getMinutes() + ':' + end.getSeconds()
        
        return startTime + " - " + endTime
    }
    
    return { contacts, contactsError, stateError, formatContactStartEndTimestamps, states}
  },
}
</script>

<style>
td,th{
  text-align: left;
}
</style>