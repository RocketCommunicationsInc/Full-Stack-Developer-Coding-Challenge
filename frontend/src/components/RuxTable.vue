<template>
    <table class="rux-table">
        <tr class="relative rux-table__column-head">
            <th
                v-for="(column, index) in columns"
                :key="index"
                class="sticky top-0"
                :class="column.sort ? 'rux-table__column--sortable' : ''"
            >
                {{ column.label }}
            </th>
        </tr>
        <tr
            v-for="(item,index) in data"
            :key="index"
        >
            <td
                v-for="column in columns"
                :key="column.name"
                class="truncate"
            >
                <template v-if="column.format === 'date'">
                    {{formatDate(item[column.name])}}
                </template>
                <div class="capitalize" v-else>
                    {{ item[column.name] }}
                </div>
            </td>
        </tr>
    </table>
</template>


<script>

import {formatDate} from "../../utils/helpers";

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

    methods: {
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
