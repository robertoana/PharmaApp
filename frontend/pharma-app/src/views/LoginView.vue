<template>
  <div class="login-page">
    <div class="login-container">
      <div class="form-wrapper">
        <h1>Login</h1>

        <FloatLabel>
          <InputText id="username" v-model="data.username" />
          <label for="username">Username</label>
        </FloatLabel>

        <FloatLabel>
          <InputText id="password" type="password" v-model="data.password" />
          <label for="password">Password</label>
        </FloatLabel>

        <Button label="Login" class="p-button-rounded p-button-success" />
      </div>
    </div>

    <div class="login-image">
      <img src="../assets/login.png" alt="Login" />
    </div>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Button from 'primevue/button';

export default {
  name: 'LoginForm',
  data() {
    return {
      data: {
        username: '',
        password: '',
      },
    };
  },
  components: {
    InputText,
    FloatLabel,
    Button,
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  height: 100%;
}

.login-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  padding: 3rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.form-wrapper {
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
</style>
