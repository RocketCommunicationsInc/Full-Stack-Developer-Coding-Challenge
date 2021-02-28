<template>
    <div class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <base-panel title="Register">
                <div class="py-8 px-4 sm:px-10">
                    <form
                        class="space-y-6"
                        @submit.prevent="submitForm"
                    >
                        <rux-input
                            id="name"
                            v-model="form.name"
                            label="Name"
                            :validation-error="getError('name')"
                            @blur="clearErrors"
                        />
                        <rux-input
                            id="email"
                            v-model="form.email"
                            label="Email"
                            type="email"
                            :validation-error="getError('email')"
                            @blur="clearErrors"
                        />
                        <rux-input
                            id="password"
                            v-model="form.password"
                            label="Password"
                            type="password"
                            :validation-error="getError('password')"
                            @blur="clearErrors"
                        />
                        <rux-input
                            id="password_confirmation"
                            v-model="form.password_confirmation"
                            label="Confirm Password"
                            type="password"
                            :validation-error="getError('password_confirmation')"
                            @blur="clearErrors"
                        />

                        <div class="flex items-center">
                            <rux-button
                                size="large"
                                class="ml-auto mr-4"
                                :outline="true"
                                type="button"
                                @click.native="goToLogin"
                            >
                                Cancel
                            </rux-button>

                            <rux-button
                                size="large"
                                type="submit"
                                :disabled="loading"
                            >
                                Submit
                            </rux-button>
                        </div>
                    </form>
                </div>
            </base-panel>
        </div>
    </div>
</template>

<script>
import BasePanel from "@/components/BasePanel";
import RuxInput from "@/components/RuxInput";
import RuxButton from "@/components/RuxButton";
import client from "../../utils/client";

export default {
    name: "ViewRegister",
    components: {RuxButton, RuxInput, BasePanel},
    data() {
        return {
            errors: null,
            loading: false,
            form: {
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            }
        }
    },
    methods: {
        clearErrors() {
            this.errors = null
        },
        getError(field) {
            return this.errors && this.errors[field] ? this.errors[field][0] : null;
        },
        goToLogin() {
            this.$router.replace({name: 'Login'})
        },
        async submitForm() {
            this.loading = true
            client.post('/register', this.form)
                .then(() => {
                   this.$store.dispatch('auth/fetchUser').then(() => {
                       this.$router.replace({name: 'Dashboard'})
                   })
                    .catch(() => {
                        this.$router.replace({name: 'Login'})
                    })
            })
            .catch(e => {
                if (e.response && e.response.data && e.response.data.errors) {
                    this.errors = e.response.data.errors
                } else {
                    this.errors = ['Error']
                }
            })
            .finally(() => {
                this.loading = false;
            })


        },
    },
}
</script>

<style scoped>

</style>
