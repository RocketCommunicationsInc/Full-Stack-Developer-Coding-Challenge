<template>
    <div v-if="error">{{ error }}</div>
    <div v-for="contact in contacts" :key="contact.id">
      <li>
        {{ contact.name }} - {{ contact.status.status }} - {{ contact.begin_timestamp }} - {{ contact.end_timestamp }}
        </li>
    </div>
</template>

<script>
import getContacts from "../composable/getContacts.js"

export default {
  name: 'ContactsView',
  components: {
  },
  setup() {
    const { contacts, error, load } = getContacts()
    
    load()

    return { contacts, error }
  }
}
</script>

<style>

</style>