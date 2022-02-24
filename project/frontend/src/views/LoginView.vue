<template>
  <form id="rux-form">
            <div class="group">
                <div class="field">
                    <rux-input
                        id="email"
                        placeholder="Email@astro.com"
                        label="Email"
                        type="email"
                        ruxblur="{handleValidation()}"
                    ></rux-input>
                </div>
            </div>
            <div class="group">
                <div class="field">
                    <rux-input
                        id="pw"
                        label="Password"
                        type="password"
                    ></rux-input>
                </div>
            </div>
            <div class="field">
                <rux-button id="sign-in-btn" class="sign-in-btn" type="submit"
                    >Sign in</rux-button
                >
            </div>
        </form>
</template>

<script>
import { RuxButton } from '@astrouxds/astro-web-components/dist/components/rux-button'
import { RuxInput } from '@astrouxds/astro-web-components/dist/components/rux-input'

export default {
    name: "LoginView"

}
</script>

<style>
form {
    margin: 0 auto;
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