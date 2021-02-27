<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <base-panel title="Login">
                <div class="py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form
                        class="space-y-6"
                        action="#"
                        method="POST"
                        @submit.prevent="submitForm"
                    >
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


                        <div class="flex items-center">
                            <rux-button
                                size="large"
                                class="ml-auto mr-4 "
                                :outline="true"
                                type="default"
                                @click.native="goToRegister"
                            >
                                Register
                            </rux-button>
                            <rux-button
                                size="large"
                                type="submit"
                            >
                                Login
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
export default {
    name: "ViewLogin",
    components: {RuxButton, RuxInput, BasePanel},
    data() {
        return {
            form: {
                email: '',
                password: ''
            }
        }
    },

    methods: {
        goToRegister() {
            this.$router.push('/register')
        },
        submitForm() {
            console.log('heard submit')

        }
    },
}
</script>

<style scoped>

</style>
