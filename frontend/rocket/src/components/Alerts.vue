<template>
	<div class="alerts home__pane">
		<div class="home__pane__intro">
			<h2 class="txt--left">Alerts</h2>
			<pagination v-bind:namespace="'alerts'" />
		</div>
		<table class="rux-table">
			<thead>
				<tr class="rux-table__column-head">
					<th><button class="orderby" @click="setFilters('error_severity')" :class="getColumnClass('error_severity')">
						<span>
							<rux-status :status="'off'"></rux-status>
						</span>
					</button></th>
					<th>Message</th>
					<th><button @click="setFilters('error_category')" class="orderby" :class="getColumnClass('error_category')">Category</button></th>
					<th><button @click="setFilters('error_time')" class="orderby txt--right" :class="getColumnClass('error_time')">Time</button></th>
				</tr>
			</thead>
			<tbody v-if="loaded">
				<Alert v-for="alert in alerts" v-bind:alert="alert" />
			</tbody>
		</table>
	</div>
</template>

<script>
	import Alert from '@/components/Alert'
	import RuxStatus from '@astrouxds/rux-status'
	import Pagination from '@/components/Pagination'
	export default {
		name: 'Alerts',
		components: {
			Alert,
			RuxStatus,
			Pagination
		},
		mounted() {
			if (this.$store.getters['alerts/alerts'].length < 1) {
				this.fetchAlerts()
			} else {
				this.loaded = true
			}
		},
		data() {
			return {
				order: null,
				orderBy: null,
				loaded: false,
				filters: {
					error_category: '-',
					error_time: '-',
					error_severity: '-'
				},
				filtering: {}
			}
		},
		computed: {
			alerts() {
				return this.$store.getters['alerts/alerts']
			},
			next() {
				return this.$store.getters['alerts/next']
			}
		},
		serverPrefetch() {
			return this.fetchAlerts()
		},
		methods: {
			fetchAlerts() {
				this.$store.dispatch('alerts/fetchAlerts', this.filtering)
					.then(() => {
						this.loaded = true
					})
			},
			setFilters(value) {
				this.orderBy = value
				this.filtering = {
					ordering: this.filters[value] + value
				}
				if (this.filters[value] == '-') {
					this.filters[value] = ''
				} else {
					this.filters[value] = '-'
				}
			},
			getColumnClass(columnName) {
				let columnClass = ''
				if (this.orderBy == columnName)
					columnClass += 'active '
				columnClass += (this.filters[columnName] == '-') ? 'orderby--asc' : 'orderby--desc'
				return columnClass
			}
		},
		watch: {
			filtering: function(val) {
				this.fetchAlerts()
			}
		}
	}
</script>
