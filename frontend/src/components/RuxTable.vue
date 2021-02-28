<template>
    <table class="rux-table">
        <tr class="relative rux-table__column-head">
            <th
                v-for="(column, index) in columns"
                :key="index"
                class="sticky top-0"
                :class="column.sort ? 'rux-table__column--sortable' : ''"
                @click.prevent="column.sort ? sortColumn(column) : null"
            >
                <span class="inline-flex items-center">

                    {{ column.label }}
                    <svg
                        v-if="column.sort && sort === 'desc'"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        class="ml-2 w-4 h-4"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>

                    <svg
                        v-if="column.sort && sort === 'asc'"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        class="ml-2 w-4 h-4"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </span>
            </th>
        </tr>
        <tr
            v-for="(item,index) in sortedData"
            :key="index"
        >
            <td
                v-for="column in columns"
                :key="column.name"
                class="truncate"
            >
                <template v-if="column.format === 'date'">
                    {{ formatDate(item[column.name]) }}
                </template>
                <div
                    v-else
                    class="capitalize"
                >
                    {{ item[column.name] }}
                </div>
            </td>
        </tr>
    </table>
</template>

<script>
import {formatDate} from "../../utils/helpers";
import { orderBy } from 'lodash'
export default {
    name: "RuxTable",
    props: {
        columns: {
            type: Array,
            default: (() => [])
        },
        data: {
            type: Array,
            default: (() => [])
        },
    },
    data() {
        return {
            sort: null,
            sortBy: null
        }
    },
    computed: {
        sortedData() {
            return this.sort ? orderBy(this.data, [this.sortBy], [this.sort]) : this.data;
        }
    },

    methods: {
        sortColumn(column) {
            if (!this.sort) {
                this.sort = 'asc'
                this.sortBy = column.name
            }
            else if(this.sort === 'asc') {
                this.sort = 'desc'
                this.sortBy = column.name
            }
            else if (this.sort === 'desc') {
                this.sort = null
                this.sortBy = null
            }

        },
        formatDate(date) {
            return formatDate(date)
        }
    },
}
</script>

<style>
.rux-table__column--sortable {
    cursor: pointer;
}
</style>
