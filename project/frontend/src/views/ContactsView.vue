<template>
<div class="row">
  <div class="col-3" v-for="state in states" :key="state.id">
    <h1>{{ state.count }}</h1>
    <strong>{{ state.state }}</strong>
    </div>
  <div class="col-3">
    <h1>{{ contacts.length }} </h1>
    <strong>Total</strong>
  </div>
</div> <!-- end row div -->
<div class="row">
  <div class="col-md-12">
    <table class="table table-striped">
        <colgroup>
            <col span="1" style="width: 15%;">
            <col span="1" style="width: 50%;">
            <col span="1" style="width: 35%;">
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
import formatTimeString from "../composable/timeUtils.js"
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
        let startTime = formatTimeString(contact.begin_timestamp)
        let endTime = formatTimeString(contact.end_timestamp)
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
div{
  margin: 5px;
}
</style>