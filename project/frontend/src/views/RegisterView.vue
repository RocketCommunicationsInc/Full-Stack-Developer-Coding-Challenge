
<template>
  <form id="new_user_form" @submit.prevent="registerUser">
            <div class="group">
                <div class="field">
                    <rux-input
                        id="first_name"
                        placeholder="Ender"
                        label="First name"
                        type="text"
                        ruxblur="{handleValidation()}"
                        required
                        :modelValue="new_user.firstname"
                        @ruxinput="new_user.firstname = $event.target.value"
                    ></rux-input>
                </div>
            </div>
            <div class="group">
                <div class="field">
                    <rux-input
                        id="lastname"
                        placeholder="Wiggin"
                        label="Last name"
                        type="text"
                        required
                        ruxblur="{handleValidation()}"
                        :modelValue="new_user.lastname"
                        @ruxinput="new_user.lastname = $event.target.value"
                    ></rux-input>
                </div>
            </div>
            <div class="group">
                <div class="field">
                    <rux-input
                        id="email"
                        placeholder="enderwiggin@ifcomm.com"
                        label="Email"
                        type="email"
                        required
                        ruxblur="{handleValidation()}"
                        :modelValue="new_user.email"
                        @ruxinput="new_user.email = $event.target.value"
                    ></rux-input>
                </div>
            </div>
            <div class="group">
                <div class="field">
                    <rux-input
                        id="password"
                        label="Password"
                        required
                        type="password"
                        :modelValue="new_user.password"
                        @ruxinput="new_user.password = $event.target.value"
                    ></rux-input>
                </div>
            </div>
            <div v-if="error">
                <p>
                <strong class="text-danger">
                    {{ error }}
                </strong>
                </p>
            </div>
            <div class="field">
                <rux-button id="sign-in-btn" class="sign-in-btn" type="submit">
                    Register
                </rux-button>
            </div>
        </form>
</template>

<script>
import { ref } from 'vue'
import { RuxButton } from '@astrouxds/astro-web-components/dist/components/rux-button'
import { RuxInput } from '@astrouxds/astro-web-components/dist/components/rux-input'
import userRegister from "../composable/userRegister.js"
    

export default {
    name: "LoginView",
    setup() {
        const { error, register} = userRegister()
        const new_user = ref({
            firstname: '',
            lastname: '',
            email: '',
            password: ''

        })
        
        const registerUser = (e) => {
            console.log(new_user.value.firstname)
            console.log(new_user.value.lastname)
            console.log(new_user.value.email)
            console.log(new_user.value.password)
            let result = register(new_user.value.firstname, 
                    new_user.value.lastname,
                    new_user.value.email,
                    new_user.value.password)
            
            if(!error){
                localStorage.setItem('token', result.token)
                
                window.location.href = '/'
            }
        }
        
        return { new_user, registerUser, error }
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