<template>
	<tr>
		<td width="1" class="status-symbol-cell"><rux-status v-bind:status="contact.contact_status"></rux-status></td>
		<td width="2" class="status-text-cell">{{ titleText(contact.contact_status) }}</td>
		<td><span class="txt--mono">{{ contact.contact_name }}</span></td>
		<td>{{ contact.contact_ground }}</td>
		<td><span class="contact-state" :class="'txt--' + contact.contact_state">{{ titleText(contact.contact_state) }} (Step: {{ contact.contact_step }})</span></td>
		<td width="2" class="txt--right txt--mono">{{ formatDate(contact.contact_begin_timestamp) }}</td>
		<td width="2" class="txt--right txt--mono">{{ formatDate(contact.contact_end_timestamp) }}</td>
	</tr>
</template>

<style lang="scss">
	td.status-symbol-cell {
		// padding-right: 0;
	}
	td.status-text-cell {
		padding-left: 0;
	}
</style>

<script>
	import RuxStatus from '@astrouxds/rux-status'

	export default {
		name: 'Contact',
		props: {
			contact: Object
		},
		components: {
			RuxStatus
		},
		methods: {
			formatDate(timestamp) {
				const date = new Date(timestamp)
				const day = date.getDate()
				const month = date.getMonth() + 1
				const year = date.getFullYear()
				const hours = date.getHours()
				const minutes = "0" + date.getMinutes()
				const seconds = "0" + date.getSeconds()
				return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
			},
			titleText(str) {
				return (str + '')
				    .replace(/^(.)|\s+(.)/g, function ($1) {
				      return $1.toUpperCase()
				    })
			}
		}
	}
</script>
