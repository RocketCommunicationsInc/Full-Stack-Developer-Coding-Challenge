<template>
    <div class="flex flex-col">
        <div class="bg-tertiary-600 p-4">
            <div class="text-2xl">
                {{title}}
            </div>
        </div>
        <div class="bg-tertiary-500 p4 flex flex-col overflow-hidden">
            <slot></slot>
        </div>

    </div>
</template>

<script>
export default {
    name: "BasePanel",
    props: {
        title: {
            type: String,
            default: 'Sat 1'
        },
    },
}
</script>

<style scoped>

</style>
