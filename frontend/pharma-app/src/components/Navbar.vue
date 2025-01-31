<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="navbar">
    <h1>PharmaApp</h1>
    <div class="user-info" v-if="isAuthenticated">
      <span>Bun venit, {{ userName }}!</span>
      <Button label="Logout" @click="handleLogout" class="p-button-danger" />
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Button from 'primevue/button';

export default {
  components: { Button },
  computed: {
    ...mapGetters(['isAuthenticated', 'getUserName']),
    userName() {
      return this.getUserName;
    },
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.logout().then(() => {
        this.$router.push('/');
      });
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #7e8891;
  color: white;
  height: 60px;
}

h1 {
  margin: 0;
  font-size: 1.5rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

span {
  font-size: 1rem;
  font-weight: bold;
}
</style>
