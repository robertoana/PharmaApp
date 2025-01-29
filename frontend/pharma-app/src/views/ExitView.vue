<template>
  <div class="exit-page">
    <div class="form-exit">
      <h1>Ieșiri</h1>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-box"></i>
        </InputGroupAddon>
        <Dropdown
          v-model="selectedMedicine"
          :options="medicines"
          optionLabel="name"
          placeholder="Selectează un medicament"
          class="w-full"
        />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-receipt"></i>
        </InputGroupAddon>
        <InputNumber
          v-model="quantity"
          placeholder="Cantitate"
          class="w-full"
        />
      </InputGroup>

      <Button
        label="Adaugă"
        class="p-button-rounded p-button-success mt-3"
        @click="verifyStockAndAddMedicineToTransaction"
      />
    </div>

    <div class="form-total">
      <h1>Bon fiscal</h1>
      <table class="receipt-table">
        <thead>
          <tr>
            <th>Medicament</th>
            <th>Preț/unitate</th>
            <th>Cantitate</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in transactions" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.subtotal }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="total-label">Total</td>
            <td class="total-value">{{ finalPrice }}</td>
          </tr>
        </tfoot>
      </table>

      <Button
        label="Finalizează tranzacția"
        class="p-button-rounded p-button-success mt-3"
      />
    </div>
  </div>
</template>

<script>
import Dropdown from 'primevue/dropdown';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import axios from 'axios';
// import DateTime from 'luxon';

export default {
  name: 'ExitView',
  components: {
    Dropdown,
    InputGroup,
    InputGroupAddon,
    InputNumber,
    Button,
  },
  data() {
    return {
      medicines: [],
      transactions: [],
      selectedMedicine: null,
      quantity: null,
      userId: 'urmeaza',
    };
  },
  methods: {
    async getAllMedicines() {
      try {
        const response = await axios.get(
          'http://localhost:8090/api/medicines/getAllMedicines'
        );
        this.medicines = response.data;
        console.log(this.medicines);
      } catch (err) {
        alert(`Error + ${err}`);
      }
    },
    verifyStockAndAddMedicineToTransaction() {
      if (this.selectedMedicine.quantity <= this.quantity) {
        alert('Boss e prea mult');
      } else {
        const medicineToAdd = {
          id: this.selectedMedicine.id,
          name: this.selectedMedicine.name,
          price: this.selectedMedicine.price,
          quantity: this.quantity,
          subtotal: this.quantity * this.selectedMedicine.price,
        };
        this.transactions.push(medicineToAdd);
        console.log(this.transactions);
        this.emptyForm();
      }
    },
    emptyForm() {
      this.quantity = null;
      this.selectedMedicine = null;
    },
  },
  mounted() {
    this.getAllMedicines();
    this.emptyForm();
  },
  computed: {
    finalPrice() {
      let sum = 0;
      if (this.transactions) {
        for (const transaction of this.transactions) {
          sum += transaction.subtotal;
        }
      }
      return sum;
    },
  },
};
</script>

<style scoped>
.exit-page {
  display: flex;
  flex-direction: row;
  align-items: flex;
  gap: 2rem;
  padding: 2rem;
}

.form-exit {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 400px;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.form-total {
  flex: 2;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.receipt-table {
  width: 100%;
  border-collapse: collapse;
}

.receipt-table th,
.receipt-table td {
  border: 1px solid #ddd;
  padding: 1rem;
  text-align: left;
}

.receipt-table th {
  background-color: #f4f4f4;
}

.total-label {
  text-align: right;
  font-weight: bold;
}

.total-value {
  font-weight: bold;
  text-align: left;
}
</style>

<!-- const medicineToAdd = {
  id: this.selectedMedicine.id,
  transactionPrice: this.pricePerTransaction(
    this.selectedMedicine.quantity,
    this.selectedMedicine.price
  ),
  transactionsDate: DateTime.now()
    .startof('day')
    .toFormat("yyyy-MM-dd'T'HH:mm:ssZZ"),
  userId: 'urmeaza',
  medicines: [{}],
}; -->
