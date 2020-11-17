<template>
  <div class="home">
  	<Alerts />
  	<Contacts />
  </div>
</template>

<script>
import Alerts from '@/components/Alerts'
import Contacts from '@/components/Contacts'

export default {
	mounted() {

	},
	components: {
		Alerts,
		Contacts
	},
	data() {
		return {
			isLoadingContacts: true,
			isLoadingAlerts: true,
		}
	},
	computed: {
		alerts() {
			return this.$store.getters['alerts/alerts']
		},
		contacts() {
			return this.$store.getters['contacts/contacts']
		}
	},
	methods: {

	}
}
</script>
