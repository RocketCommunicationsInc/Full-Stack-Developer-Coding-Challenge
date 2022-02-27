<template>
  <form id="rux-form" @submit.prevent="validateUser">
            <div class="group">
                <div class="field">
                    <rux-input
                        id="email"
                        placeholder="enderwiggin@ifcomm.com"
                        label="Email"
                        type="email"
                        required
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
                        required
                        :modelValue="user.password"
                        @ruxinput="user.password = $event.target.value"
                    ></rux-input>
                </div>
            </div>
            <div v-if="error">
                <p>
                <strong class="text-danger">
                    {{ error}}
                </strong>
                </p>
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
            const error = ref(null)
        const user = ref({
            email: '',
            password: ''
        })
        
        const validateUser = (e) => {
           fetch("http://localhost:8000/users/login", {
                method: "POST",
                body: JSON.stringify({
                    email: user.value.email,
                    password: user.value.password
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }}).then(response =>{
                    if(response.ok){
                        let json = response.json()
                        localStorage.setItem('token', json.token)
                        window.location.href = '/'
                    }
                    else{
                        error.value = "Invalid username or password."
                    }
                })
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