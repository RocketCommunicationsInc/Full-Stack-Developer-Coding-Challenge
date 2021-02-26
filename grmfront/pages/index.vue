<template>
<div>
<AppLayout>
    <rux-notification ref="loginalert" message="Login error. Please try again or register for this service."></rux-notification>
    <rux-notification ref="registeralert" message="Registration error. Please verify that you have filled out all necessary information."></rux-notification>
<b-container fluid>
<b-row><div style="height: 15vh;"></div></b-row>
<b-row>
    <b-col></b-col>
    <b-col>
        <div v-if="loginshow">
        <b-form>
            <h1>Login</h1>
            <div class="rux-form-field">
                <label for="input__text1">Email Address</label>
                <input id="input__text1" v-model="loginemail" class="rux-input" type="text" placeholder="Enter email address">
            </div><br><br>
            <div class="rux-form-field">
                <label for="input__text2">Password</label>
                <input id="input__text2" v-model="loginpass" class="rux-input" type="password" placeholder="Enter password">
            </div><br><br>
            <div style="border-radius: 3px; background-color: rgba(40,63,88); padding: 10px; text-align: right;">
                <rux-button id="abutton" size="large" @click="switchRegister" outline>Register</rux-button><div style="display: inline-block; width: 20px;"></div><rux-button @click="onLogin" size="large">Login</rux-button>
            </div><br><br>
        </b-form>
        </div>
        <div v-if="registershow">
        <b-form>
            <h1>Register</h1>
            <div class="rux-form-field">
                <label for="input__text3">First Name</label>
                <input id="input__text3" v-model="registeruserf" class="rux-input" type="text" placeholder="Enter First Name">
            </div><br><br>
            <div class="rux-form-field">
                <label for="input__text4">Last Name</label>
                <input id="input__text4" v-model="registeruserl" class="rux-input" type="text" placeholder="Enter Last Name">
            </div><br><br>
            <div class="rux-form-field">
                <label for="input__text5">Email Address</label>
                <input id="input__text5" v-model="registeremail" class="rux-input" type="text" placeholder="Enter email address">
            </div><br><br>
            <div class="rux-form-field">
                <label for="input__text5">Create a Password</label>
                <input id="input__text5" v-model="registerpass" class="rux-input" type="password" placeholder="Enter password">
            </div><br><br>
            <div style="border-radius: 3px; background-color: rgba(40,63,88); padding: 10px; text-align: right;">
                <rux-button id="abutton" size="large" @click="switchLogin" outline>Back to Login</rux-button><div style="display: inline-block; width: 20px;"></div><rux-button @click="onRegister" size="large">Register</rux-button>
            </div><br><br>
        </b-form>
        </div>
    </b-col>
    <b-col></b-col>
</b-row>
<b-row></b-row>
</b-container>

</AppLayout>
</div>
</template>

<script>
import AppLayout from '~/components/AppLayout'
import { RuxButton } from '@astrouxds/rux-button/rux-button.js';
import { RuxNotification } from '@astrouxds/rux-notification/rux-notification.js';

export default {
    name: 'index',
    components: {
        AppLayout
    },
    data() {
        return {
            loginshow: true,
            registershow: false,
            loginerrorshow: false,
            loginemail: "",
            loginpass: "",
            registeruserf: "",
            registeruserl: "",
            registeremail: "",
            registerpass: "",
            logoutshow: false
        }
    },
    methods: {
        onLogin(){
            event.preventDefault()
            try{
                const fetchbody = {
                    method: "POST",
                    headers: {'Content-Type': 'Application/json'},
                    body:  JSON.stringify({useremail: this.loginemail, userpass: this.loginpass})
                    }
                fetch('/login', fetchbody).then((response) => response.json()).then(
                    data => (
                        this.process(data)
                    )
                ).catch(error => 
                    this.process(error)
                );
                }
                catch(e) {
                    this.triggerloginerror()
                }
            
        },
        onRegister(){
            event.preventDefault()
            try{
                const fetchbody = {
                    method: "POST",
                    headers: {'Content-Type': 'Application/json'},
                    body:  JSON.stringify({userfirst: this.registeruserf, userlast: this.registeruserl, useremail: this.registeremail, userpass: this.registerpass})
                    }
                fetch('/adduser', fetchbody).then((response) => response.json()).then(
                    data => (
                        this.processReg(data)
                    )
                ).catch(error => 
                    this.processReg(error)
                );
                }
                catch(e) {
                    this.triggerregistererror()
                }
            
        },
        triggerloginerror(){
            this.$refs['loginalert'].setAttribute("open", "true")
        },
        triggerregistererror(){
            this.$refs['registeralert'].setAttribute("open", "true")
        },
        process(data){
            console.log(data)
                if(data){
                    if(data['status'] == "success"){
                        //logged in
                        window.localStorage.setItem("authtoken", data['message'])
                        window.location.href="/dashboard"
                    }
                    else{
                        this.triggerloginerror()
                    }
                    return data;
                }
                else {
                        this.triggerloginerror()
                }
        },
        processReg(data){
            console.log(data)
                if(data){
                    if(data['status'] == "success"){
                        //logged in
                        window.localStorage.setItem("authtoken", data['message'])
                        window.location.href="/dashboard"
                    }
                    else{
                        this.triggerregistererror()
                    }
                    return data;
                }
                else {
                        this.triggerregistererror()
                }
        },
        switchRegister(){
            this.loginshow = false
            this.registershow = true
        },
        switchLogin(){
            this.registershow = false
            this.loginshow = true
        }
    }
}
</script>

<style>
body {
    text-align: center;
}

.rux-button {
    display: inline-block;
}
</style>
