<template>
  <div class="card" @click="navigate">
    <div class="card-icon">
      <img :src="icon" alt="Card Icon" />
    </div>
    <h3 class="card-title">{{ title }}</h3>
  </div>
</template>

<script>
export default {
  name: 'AppCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  methods: {
    navigate() {
      this.$router.push(this.link);
    },
  },
};
</script>

<style scoped>
.card {
  padding: 1.5rem;
  border-radius: 1rem;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.card-icon img {
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
