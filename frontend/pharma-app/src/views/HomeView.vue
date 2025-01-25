<template>
  <div class="home-page">
    <div class="cards-container">
      <AppCard title="Intrari" :icon="syringeIcon" link="/intrari" />
      <AppCard title="Iesiri" :icon="medicalReport" link="/iesiri" />
      <AppCard title="Stoc" :icon="healthCheck" link="/stoc" />
      <AppCard title="Tranzactii" :icon="cash" link="/tranzactii" />
    </div>
  </div>
</template>

<script>
import AppCard from '@/components/AppCard.vue';
import syringeIcon from '@/assets/syringe.png';
import medicalReport from '@/assets/medicalReport.png';
import healthCheck from '@/assets/healthCheck.png';
import cash from '@/assets/cash.png';

export default {
  name: 'HomePage',
  components: {
    AppCard,
  },
  data() {
    return {
      syringeIcon,
      medicalReport,
      healthCheck,
      cash,
    };
  },
};
</script>

<style scoped>
.home-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #f9f9f9;
  height: 100%;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
}
</style>
