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
            <td>{{ item.subtotal.toFixed(2) }}</td>
            <td>
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-danger p-button-text"
                @click="deleteMedicineFromTransaction(item)"
              />
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="total-label">Total</td>
            <td class="total-value">{{ finalPrice.toFixed(2) }}</td>
          </tr>
        </tfoot>
      </table>

      <Button
        label="Finalizează tranzacția"
        class="p-button-rounded p-button-success mt-3"
        @click="addTransaction"
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
import { mapGetters } from 'vuex';

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
        this.medicines = response.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        console.log(this.medicines);
      } catch (err) {
        alert(`Error + ${err}`);
      }
    },
    validateTransactionInput() {
      if (!this.selectedMedicine) {
        alert('Selectează un medicament!');
        return false;
      }
      if (!this.quantity || this.quantity <= 0) {
        alert('Cantitatea trebuie să fie un număr mai mare decât 0!');
        return false;
      }

      if (this.quantity > this.selectedMedicine.quantity) {
        alert('Cantitatea depășește stocul!');
        return false;
      }
      return true;
    },
    verifyStockAndAddMedicineToTransaction() {
      if (!this.validateTransactionInput()) {
        return;
      }
      const transaction = this.transactions.find(
        (item) => item.id === this.selectedMedicine.id
      );
      if (transaction) {
        const newQuantity = transaction.quantity + this.quantity;
        if (newQuantity > this.selectedMedicine.quantity) {
          alert('Cantitatea depășește stocul disponibil!');
          return;
        }
        transaction.quantity = newQuantity;
        transaction.subtotal =
          transaction.quantity * this.selectedMedicine.price;
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
    emptyTable() {
      this.transactions = [];
    },
    async addTransaction() {
      try {
        const payload = {
          type: 'exit',
          transactionPrice: this.finalPrice.toFixed(2),
          transactionsDate: new Date().toISOString(),
          userId: this.getUserName,
          medicines: this.medicineToAddInTransaction(),
        };
        await axios.post(
          `http://localhost:8090/api/transactions/addTransaction`,
          payload
        );
        await this.updateMedicineStock();
        alert('Adugat!');
        this.emptyTable();
      } catch (err) {
        alert(`Eroare: ${err}`);
      }
    },
    async updateMedicineStock() {
      try {
        this.transactions.map((medicine) => {
          return axios.put(
            `http://localhost:8090/api/medicines/${medicine.id}`,
            {
              quantity: this.getNewStock(medicine.id, medicine.quantity),
            }
          );
        });
        console.log('actualizat');
      } catch (err) {
        alert(`Eroare: ${err}`);
      }
    },
    getNewStock(medicineId, quantitySold) {
      const medicine = this.medicines.find((med) => med.id === medicineId);
      return medicine.quantity - quantitySold;
    },
    medicineToAddInTransaction() {
      return this.transactions.map((medicine) => ({
        id: medicine.id,
        name: medicine.name,
        quantity: medicine.quantity,
        price: medicine.price * medicine.quantity,
      }));
    },
    deleteMedicineFromTransaction(medicine) {
      this.transactions = this.transactions.filter(
        (item) => item.id !== medicine.id
      );
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
    ...mapGetters(['getUserName']),
  },
};
</script>

<style scoped>
.exit-page {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem;
}

.form-exit {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  height: auto;
}

.form-total {
  flex: 2;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
  width: 100%;
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

.form-total Button {
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .exit-page {
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }
  .form-exit,
  .form-total {
    width: 100%;
    max-width: 500px;
  }
}
</style>
