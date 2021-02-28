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
                :required="validationError"
                :placeholder="placeholder"
                :class="validationError ? 'invalid' : ''"
                @blur="$emit('blur')"
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
        },

    },
    computed: {
        required() {
            return this.validationError
        }
    },
}
</script>

<style scoped>
/** copied from astro.css **/
.invalid {
    border: 1px solid var(--inputInvalidBorderColor);
    background-image: url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20128%20128%22%3E%0A%20%20%3Cpath%20fill%3D%22%23FF3030%22%20fill-rule%3D%22evenodd%22%20d%3D%22M64.031%205c8.461%200%2068.88%20107.243%2063.648%20114.184-5.232%206.942-120.805%205.477-127.212%200C-5.941%20113.708%2055.57%205%2064.03%205zm3.45%2075.894l1.822-34.893H56.946l1.82%2034.893h8.715zM56.803%2093.108c0%201.929.547%203.423%201.643%204.483%201.095%201.06%202.642%201.589%204.642%201.589%201.953%200%203.477-.542%204.572-1.625%201.095-1.084%201.643-2.566%201.643-4.447%200-1.952-.542-3.452-1.625-4.5-1.084-1.047-2.613-1.571-4.59-1.571-2.047%200-3.607.512-4.678%201.536-1.072%201.023-1.607%202.535-1.607%204.535z%22%2F%3E%0A%3C%2Fsvg%3E) !important;
    background-repeat: no-repeat;
    background-size: 1.125rem;
    background-position: center right 0.5rem;
}

</style>
