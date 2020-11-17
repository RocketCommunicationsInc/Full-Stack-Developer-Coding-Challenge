<template>
	<div class="contacts home__pane">
		<div class="home__pane__intro">
			<h2 class="txt--left">Contacts</h2>
			<pagination v-bind:namespace="'contacts'" />
		</div>
		<div v-if="loaded" class="totals">
			<div class="totals__block totals__block--total txt--center">
				<span class="totals__stat txt--mono">{{ total }}</span>
				<span class="totals__label">Contacts</span>
			</div>
			<div :class="'txt--center totals__block totals__block--' + state.contact_state" v-for="state in states">
				<span class="totals__stat txt--mono">{{ state.total }}</span>
				<span class="totals__label">{{ state.contact_state }}</span>
			</div>
		</div>
		<table class="rux-table">
			<thead>
				<tr class="rux-table__column-head">
					<th colspan="2"><button class="orderby" @click="setFilters('contact_status')" :class="getColumnClass('contact_status')">
						<span>
							Status
						</span>
					</button></th>
					<th><button class="orderby" @click="setFilters('contact_name')" :class="getColumnClass('contact_name')">Name</button></th>
					<th><button class="orderby" @click="setFilters('contact_ground')" :class="getColumnClass('contact_ground')">Ground</button></th>
					<th><button class="orderby" @click="setFilters('contact_state')" :class="getColumnClass('contact_state')">State</button></th>
					<th class="txt--right"><button class="orderby" @click="setFilters('contact_begin_timestamp')" :class="getColumnClass('contact_begin_timestamp')">BTS</button></th>
					<th class="txt--right"><button class="orderby" @click="setFilters('contact_end_timestamp')" :class="getColumnClass('contact_end_timestamp')">ETS</button></th>
				</tr>
			</thead>
			<tbody v-if="loaded">
				<Contact v-for="contact in contacts" v-bind:contact="contact" :key="contact.id" />
			</tbody>
		</table>
	</div>
</template>

<style lang="scss">
	.totals {
		display: flex;
		margin: 5px 20px;
		padding: 20px 0;
		&__block {
			display: block;
			margin-right: 40px;
			color: #ffffff;
			&--executing, &--executing button {
				color: rgb(86, 240, 0);
			}
			&--failed, &--failed button {
				color: rgb(255, 56, 56);
			}
		}
		&__stat {
			display: block;
			font-size: 32px;
			font-weight: bold;
		}
		&__label {
			font-size: 16px;
			text-transform: uppercase;
		}
		&__select {
			background: transparent;
			border: 0;
			box-shadow: 0;
			color: initial;
		}
	}
</style>

<script>
	import Contact from '@/components/Contact'
	import Pagination from '@/components/Pagination'
	import RuxStatus from '@astrouxds/rux-status'
	export default {
		name: 'Contacts',
		components: {
			Contact,
			Pagination,
			RuxStatus
		},
		mounted() {
			if (this.$store.getters['contacts/contacts'].length < 1) {
				this.fetchContacts()
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
					contact_status: '-',
					contact_ground: '-',
					contact_name: '-',
					contact_state: '-',
					contact_begin_timestamp: '-',
					contact_end_timestamp: '-'
				},
				filtering: {}
			}
		},
		computed: {
			contacts() {
				return this.$store.getters['contacts/contacts']
			},
			total() {
				return this.$store.getters['contacts/total']
			},
			states() {
				return this.$store.getters['contacts/states']
			},
		},
		serverPrefetch() {
			return this.fetchContacts()
		},
		methods: {
			fetchContacts() {
				this.$store.dispatch('contacts/fetchContacts', this.filtering)
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
				this.fetchContacts()
			}
		}
	}
</script>
