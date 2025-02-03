<template>
  <div class="card">
    <h1>Tranzacții</h1>
    <p v-if="loading">Se incarca tranzacțiile</p>
    <DataTable
      v-else
      :value="transactions"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20]"
      tableStyle="min-width: 80rem"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords} transactions"
    >
      <Column field="id" header="Id" style="width: 15%"></Column>
      <Column
        field="transactionPrice"
        header="Preț (RON)"
        style="width: 10%"
      ></Column>
      <Column
        field="transactionsDate"
        header="Data"
        style="width: 15%"
      ></Column>
      <Column field="userId" header="Operator" style="width: 15%"></Column>
    </DataTable>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import axios from 'axios';

export default {
  name: 'TransactionView',
  data() {
    return {
      transactions: [],
      loading: true,
    };
  },
  methods: {
    async getAllTransactions() {
      try {
        const response = await axios.get(
          'http://localhost:8090/api/transactions/getAllTransactions'
        );
        this.transactions = response.data.transactions;
        console.log('Transactions:', this.transactions);
      } catch (err) {
        alert('Error: ' + err);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.getAllTransactions();
    console.log(this.transactions);
  },
  components: {
    DataTable,
    Column,
  },
};
</script>

<style scoped>
.card {
  padding: 3rem;
}
</style>
