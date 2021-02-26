<template>
    <table class="rux-table">
        <tr class="rux-table__column-head">
            <th
                v-for="(column, index) in columns"
                :key="index"
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
                {{ item[column.name] }}
            </td>
        </tr>
    </table>
</template>


<script>

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
        }
    },
}
</script>

<style>
.rux-table__column--sortable {
    cursor: pointer;
}

</style>
