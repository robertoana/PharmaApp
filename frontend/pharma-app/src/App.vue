<template>
  <div id="app">
    <Navbar v-if="isAuthenticated" />
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Navbar from './components/Navbar.vue';

export default {
  components: { Navbar },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
};
</script>

<style>
html,
body {
  margin: 0;
  width: 100%;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  overflow-y: auto;
}
</style>
