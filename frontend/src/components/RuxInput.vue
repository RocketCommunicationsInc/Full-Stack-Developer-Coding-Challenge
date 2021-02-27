<template>
    <div>
        <div class="rux-form-field">
            <label
                class=""
                :for="id"
            >{{ label }}</label>
            <input
                :id="id"
                :value="value"
                class="rux-input"
                :type="type"
                :placeholder="placeholder"
                @input="$emit('input', $event.target.value)"
            >
        </div>
        <div
            v-if="validationError"
            class="mt-2 ml-4 text-white text-left"
        >
            {{ validationError }}
        </div>
    </div>
</template>

<script>
export default {
name: "RuxInput",
    props: {
        id: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        validationError: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: ''
        }
    },
}
</script>

<style scoped>
</style>
