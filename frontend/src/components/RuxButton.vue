<template>
    <button
        :type="type"
        outline
        class="rux-button"
        :class="outline ? 'rux-button--outline' : ''"
    >
        <slot />
    </button>
</template>

<script>
export default {
    name: "RuxButton",
    props: {
        outline: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'submit'
        },
    },
}
</script>

<style scoped>

</style>
