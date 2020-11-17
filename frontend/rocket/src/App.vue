<template>
  <div id="app">
    <header class="header" v-if="this.$store.getters['auth/isAuthenticated']">
      <div class="app-logo"><h1>Rocket Code Challenge</h1></div>
      <div class="clock"><rux-clock :small="true"></rux-clock></div>
      <div class="user-info">
        Logged in as: {{ titleText(this.$store.getters['auth/username']) }} <router-link to="/logout" class="rux-button rux-button--small rux-button--outline">Logout</router-link>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

header {
  display: flex;
  padding: 15px 0;
  align-items: center;
  justify-content: space-between;
  & > div {
    padding: 0 14px;
  }
  .app-logo {
    flex-shrink: 1;
    flex-grow: 0;
    h1 {
      font-size: 24px;
    }
  }
  .clock {
    flex-shrink: 1;
    flex-grow: 0;
  }
  .user-info {
    flex-shrink: 1;
    flex-grow: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    a.rux-button {
      margin-left: 8px;
    }
  }
}

@import './styles/app'
</style>

<script>
  import RuxClock from '@astrouxds/rux-clock'
  export default {
    components: {
      RuxClock
    },
    methods: {
      titleText(str) {
        return (str + '')
            .replace(/^(.)|\s+(.)/g, function ($1) {
              return $1.toUpperCase()
            })
      }
    }
  }
</script>
