<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <base-panel title="Register">
                <div class="py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form
                        class="space-y-6"
                        action="#"
                        method="POST"
                        @submit.prevent="submitForm"
                    >
                        <rux-input
                            id="name"
                            v-model="form.name"
                            label="Name"
                        />
                        <rux-input
                            id="email"
                            v-model="form.email"
                            label="Email"
                            type="email"
                        />
                        <rux-input
                            id="password"
                            v-model="form.password"
                            label="Password"
                            type="password"
                        />
                        <rux-input
                            id="password_confirmation"
                            v-model="form.password_confirmation"
                            label="Confirm Password"
                            type="password"
                        />

                        <div class="flex items-center">
                            <rux-button
                                size="large"
                                class="ml-auto mr-4 "
                                :outline="true"
                                type="default"
                                @click.native="goToLogin"
                            >
                                Cancel
                            </rux-button>

                            <rux-button
                                size="large"
                                type="submit"
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
        goToLogin() {
            this.$router.push('/login')
        },
        submitForm() {
            this.loading = true
            client.post('/register', this.form)
            .then(r => {
                console.log(r)
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => {
                this.loading = false;
            })


            console.log('heard submit')
        },
    },
}
</script>

<style scoped>

</style>
