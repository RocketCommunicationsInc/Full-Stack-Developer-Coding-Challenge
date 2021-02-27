<template>
    <div class="flex items-center flex-col leading-tight">
        <div class="text-6xl font-bold">{{value}}</div>
        <div>{{label}}</div>
    </div>
</template>

<script>
export default {
    name: "BaseBadge",
    props: {
        label: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        }
    },
}
</script>

<style scoped>

</style>
