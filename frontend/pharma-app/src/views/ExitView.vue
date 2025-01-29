<template>
  <div class="exit-page">
    <div class="form-exit">
      <h1>Ieșiri</h1>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-box"></i>
        </InputGroupAddon>
        <Dropdown placeholder="Selectează un medicament" class="w-full" />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-receipt"></i>
        </InputGroupAddon>
        <InputNumber placeholder="Cantitate" class="w-full" />
      </InputGroup>

      <Button label="Adaugă" class="p-button-rounded p-button-success mt-3" />
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
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="total-label">Total</td>
            <td class="total-value"></td>
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

export default {
  name: 'ExitView',
  components: {
    Dropdown,
    InputGroup,
    InputGroupAddon,
    InputNumber,
    Button,
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
