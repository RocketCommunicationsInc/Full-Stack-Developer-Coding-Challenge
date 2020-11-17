<template>
	<tr>
		<td><rux-status v-bind:status="alert.error_severity"></rux-status></td>
		<td>{{ alert.error_message }}</td>
		<td>{{ alert.error_category }}</td>
		<td class="txt--right txt--mono">{{ formattedDate }}</td>
	</tr>
</template>

<script>
	import RuxStatus from '@astrouxds/rux-status'

	export default {
		name: 'Alert',
		props: {
			alert: Object
		},
		components: {
			RuxStatus
		},
		computed: {
			formattedDate() {
				const date = new Date(this.alert.error_time)
				const day = date.getDate()
				const month = date.getMonth() + 1
				const year = date.getFullYear()
				const hours = date.getHours()
				const minutes = "0" + date.getMinutes()
				const seconds = "0" + date.getSeconds()
				return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
			}
		}
	}
</script>
