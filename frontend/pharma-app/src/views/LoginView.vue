<template>
  <div class="login-page">
    <div class="login-container">
      <div class="form-wrapper">
        <h1>Login</h1>

        <FloatLabel>
          <InputText id="email" v-model="email" />
          <label for="email">Email</label>
        </FloatLabel>

        <FloatLabel>
          <InputText id="password" type="password" v-model="password" />
          <label for="password">Password</label>
        </FloatLabel>

        <Button
          label="Login"
          class="p-button-rounded p-button-success"
          @click="loginInApp"
        />

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
    </div>

    <div class="login-image">
      <img src="../assets/login.png" alt="Login" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Button from 'primevue/button';

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  components: {
    InputText,
    FloatLabel,
    Button,
  },
  methods: {
    ...mapActions(['login']),
    async loginInApp() {
      try {
        await this.login({ email: this.email, password: this.password });
        this.$router.push('/home');
      } catch (error) {
        this.errorMessage = 'Date introduse greșit!';
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  height: 100%;
  background-color: #f9f9f9;
}

.login-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
}

.form-wrapper {
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

h1 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
}

.login-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.p-float-label {
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .login-page {
    flex-direction: column;
  }

  .login-image {
    display: none;
  }

  .login-container {
    padding: 1.5rem;
  }

  .form-wrapper {
    max-width: 100%;
  }
}
</style>
