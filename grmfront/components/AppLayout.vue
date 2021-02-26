<template>
<div>
<rux-global-status-bar>
    <h1 style="color: white;"><rux-icon color="#fff" icon="satellite-transmit"></rux-icon> GRM Dashboard</h1><rux-clock></rux-clock><div @click="switchlight"><h1 style="color: white;"><b-icon-square-half></b-icon-square-half></h1></div><div v-if="logoutshow" @click="logout"><h1 style="color: white;"><b-icon-door-open></b-icon-door-open></h1></div>
</rux-global-status-bar>
<slot></slot>
</div>
</template>

<script>
import { RuxGlobalStatusBar } from '@astrouxds/rux-global-status-bar/rux-global-status-bar.js'
import { RuxIcon } from '@astrouxds/rux-icon/rux-icon.js';
import { RuxClock } from '@astrouxds/rux-clock/rux-clock.js';

export default {
  name: 'AppLayout',
  data() {
      return {
          logoutshow: true
      }
  },
  head() {
      return {
          bodyAttrs: {
              class: "dark-theme"
          }
      }
  },
  methods: {
      switchlight(){
           var body = document.body
           if(body.classList == "dark-theme"){
               body.classList.remove("dark-theme")
               body.classList.toggle("light-theme")
               body.style.backgroundColor = "white"
           }
           else{
               body.classList.remove("light-theme")
               body.classList.toggle("dark-theme")
               body.style.backgroundColor = "#101923"
           }
          },
      logout(){
          window.localStorage.clear(),
          window.location.href="./"
      }
  },
  mounted() {
      if(!window.localStorage.getItem("authtoken")){
          this.logoutshow = false
      }
  }
}
</script>

<style>

</style>


