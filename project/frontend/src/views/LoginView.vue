<template>
  <form id="rux-form" @submit.prevent="validateUser">
            <div class="group">
                <div class="field">
                    <rux-input
                        id="email"
                        placeholder="enderwiggin@ifcomm.com"
                        label="Email"
                        type="email"
                        ruxblur="{handleValidation()}"
                        :modelValue="user.email"
                        @ruxinput="user.email = $event.target.value"
                    ></rux-input>
                </div>
            </div>
            <div class="group">
                <div class="field">
                    <rux-input
                        id="pw"
                        label="Password"
                        type="password"
                        :modelValue="user.password"
                        @ruxinput="user.password = $event.target.value"
                    ></rux-input>
                </div>
            </div>
            <div class="field">
                <rux-button id="sign-in-btn" class="sign-in-btn" type="submit">Sign in</rux-button>
                <rux-button id="sign-in-btn" class="sign-in-btn" @click="this.$router.push('register')">Register</rux-button>
            </div>
        </form>
</template>

<script>
import { RuxButton } from '@astrouxds/astro-web-components/dist/components/rux-button'
import { RuxInput } from '@astrouxds/astro-web-components/dist/components/rux-input'
import userLogin from "../composable/userLogin.js"
import { ref } from 'vue'

export default {
    name: "LoginView",
    props: {
        user: {
            firstname: "",
            lastname: "",
            email: ""
        }
    },
    setup() {
        const { error, login} = userLogin()
        const user = ref({
            email: '',
            password: ''
        })
        
        const validateUser = (e) => {
            console.log(user.value.email)
            console.log(user.value.password)
            let result = login(user.value.email, user.value.password)
            localStorage.setItem('user', {
                firstname: result.firstname,
                lastname: result.lastname,
                email: result.email
            })
            window.location.href = '/'
        }
        
        return { user, validateUser, error }
    }

}
</script>

<style>
form {
    margin: 0 auto;
    margin-top: 20px;
    max-width: 330px;
    display: block;
}
.group {
    margin-bottom: 2.25rem;
}
.field {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
}
.checkbox {
    margin: 0.5rem 0 1rem 0 !important;
    line-height: 1.2;
}
rux-input {
    width: 100%;
}
.sign-in-btn {
    margin-left: auto;
}
</style>