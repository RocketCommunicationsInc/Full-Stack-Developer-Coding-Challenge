<template>
	<div class="pagination" v-if="current !== total">
		<span class="pagination__info">Page {{ current }} of {{ total }}</span>
		<button :disabled="(!prev)" v-if="namespace" class="pagination__button pagination__button--prev" @click="getPrev()">Previous</button>
		<button :disabled="(!next)" v-if="namespace" class="pagination__button pagination__button--next" @click="getNext()">Next</button>
	</div>
</template>

<script>
	export default {
		name: 'Pagination',
		props: {
			namespace: String
		},
		computed: {
			next() {
				return this.$store.getters[this.namespace + '/next']
			},
			prev() {
				return this.$store.getters[this.namespace + '/prev']
			},
			current() {
				return this.$store.getters[this.namespace + '/current']
			},
			total() {
				return this.$store.getters[this.namespace + '/totalPages']
			}
		},
		methods: {
			getPrev() {
				const namespace = this.namespace
				this.$store.dispatch(namespace + '/fetchPrevious')
					.then(() => {})
			},
			getNext() {
				const namespace = this.namespace
				this.$store.dispatch(namespace + '/fetchNext')
					.then(() => {})
			}
		}
	}
</script>

<style lang="scss">
	.pagination {
		color: #a9b2bc;
		font-family: Avenir, Helvetica, Arial, sans-serif;
		&__info {
			display: inline-block;
			margin-right: 20px;
		}
		&__button {
			font-size: 0;
			background: transparent;
			border: 0;
			box-shadow: 0 0;
			cursor: pointer;
			padding: 5px;
			&:after {
				content: '';
				width: 10px;
				height: 10px;
				display: inline-block;
				transition: border-color 0.25s ease-out;
			}
			&--prev {
				&:after {
					border-top: 2px solid #a9b2bc;
					border-left: 2px solid #a9b2bc;
					transform: rotate(-45deg);
				}
			}
			&--next {
				&:after {
					border-top: 2px solid #a9b2bc;
					border-right: 2px solid #a9b2bc;
					transform: rotate(45deg);
				}
			}
			&:hover, &:focus {
				outline: 0;
				&:after {
					border-color: #ffffff;
				}
			}
			&[disabled] {
				cursor: not-allowed;

				&:hover {
					&:after {
						border-color: #a9b2bc;
					}

				}
			}
		}

	}
</style>
