<template>
    <div class="flex items-center flex-col leading-tight">
        <div class="text-6xl font-bold">
            {{ value }}
        </div>
        <div class="capitalize">
            {{ label }}
        </div>
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
            type: Number,
            default: 0
        }
    },
}
</script>

<style scoped>

</style>
