<template>
  <div class="entry-page">
    <h1>Intrări</h1>
    <div class="form-container">
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-box"></i>
        </InputGroupAddon>
        <InputText
          v-model="denumireMedicament"
          placeholder="Denumire medicament"
        />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>$</InputGroupAddon>
        <InputNumber v-model="pret" placeholder="Preț" />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-receipt"></i>
        </InputGroupAddon>
        <InputNumber v-model="dozaj" placeholder="Dozaj" />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-info"></i>
        </InputGroupAddon>
        <InputText v-model="descriere" placeholder="Descriere" />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-receipt"></i>
        </InputGroupAddon>
        <InputNumber v-model="cantitate" placeholder="Cantitate" />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-calendar"></i>
        </InputGroupAddon>
        <Calendar
          v-model="dataExpirarii"
          dateFormat="dd/mm/yy"
          placeholder="Data expirării"
        />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon><i class="pi pi-warehouse"></i></InputGroupAddon>
        <InputText v-model="lot" placeholder="Lot" />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon><i class="pi pi-user"></i></InputGroupAddon>
        <InputText v-model="producator" placeholder="Producător" />
      </InputGroup>

      <Button
        label="Adaugă medicament"
        class="p-button-rounded p-button-success"
        @click="addMedicine"
      />
    </div>
  </div>
</template>

<script>
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import axios from 'axios';

export default {
  name: 'EntryView',
  components: {
    InputGroup,
    InputGroupAddon,
    InputText,
    InputNumber,
    Calendar,
    Button,
  },
  data() {
    return {
      denumireMedicament: null,
      pret: null,
      number: null,
      descriere: null,
      dozaj: null,
      date: null,
      cantitate: null,
      dataExpirarii: null,
      lot: null,
      producator: null,
    };
  },
  methods: {
    async addMedicine() {
      try {
        if (!this.validateMedicineInput()) {
          return;
        }
        const token = this.$store.getters.getToken;
        if (!token) {
          alert('User not authenticated');
          return;
        }
        const payload = {
          name: this.denumireMedicament,
          price: this.pret,
          description: this.descriere,
          quantity: this.cantitate,
          dosage: this.dozaj,
          expiryDate: this.dataExpirarii,
          stockLot: this.lot,
          manufacturer: this.producator,
        };
        const respone = await axios.post(
          'http://localhost:8090/api/medicines/addMedicine',
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        alert(respone.data.message);
      } catch (err) {
        alert(`Error: ${err.response.data.message}`);
      }
    },
    validateMedicineInput() {
      if (!this.denumireMedicament) {
        alert('Denumirea medicamentului lipsește!');
        return false;
      }
      if (!this.pret || this.pret <= 0) {
        alert('Prețul trebuie să fie un număr mai mare ca 0!');
        return false;
      }
      if (!this.dozaj || this.dozaj <= 0) {
        alert('Dozajul trebuie să fie mai mare ca 0!');
        return false;
      }
      if (!this.cantitate || this.cantitate <= 0) {
        alert('Cantitatea trebuie să fie un număr mai mare ca 0!');
        return false;
      }
      if (!this.dataExpirarii) {
        alert('Selectați data expirării!');
        return false;
      }
      if (!this.lot) {
        alert('Introduceți lotul medicamentului!');
        return false;
      }
      if (!this.producator) {
        alert('Introduceți producătorul!');
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
.entry-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 40rem;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
}

@media (max-width: 768px) {
  .form-container {
    width: 90%;
    padding: 1rem;
  }
}
</style>
