<template>
  <div class="table">
    <h1>Stoc medicamente</h1>
    <div v-if="loading">Se încarcă medicamentele...</div>
    <DataTable
      v-else
      :value="medicines"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20]"
      tableStyle="min-width: 80rem"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords} medicamente"
    >
      <Column field="name" header="Nume" style="width: 15%"></Column>
      <Column field="price" header="Preț (RON)" style="width: 10%"></Column>
      <Column
        field="description"
        header="Descriere"
        style="width: 25%"
      ></Column>
      <Column field="quantity" header="Cantitate" style="width: 10%"></Column>
      <Column field="dosage" header="Dozaj (mg)" style="width: 10%"></Column>
      <Column
        field="expiryDate"
        header="Data Expirării"
        style="width: 15%"
      ></Column>
      <Column field="stockLot" header="Lot" style="width: 10%"></Column>
      <Column
        field="manufacturer"
        header="Producător"
        style="width: 15%"
      ></Column>
    </DataTable>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import axios from 'axios';

export default {
  name: 'StockView',
  data() {
    return {
      medicines: [],
      loading: true,
    };
  },
  components: {
    DataTable,
    Column,
  },
  methods: {
    async getAllMedicines() {
      try {
        const response = await axios.get(
          'http://localhost:8090/api/medicines/getAllMedicines'
        );
        this.medicines = response.data;
      } catch (err) {
        console.error(err);
        alert('eroare');
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.getAllMedicines();
  },
};
</script>

<style scoped>
.table {
  margin: 3rem;
}
</style>
