<template>
  <h1>Storage</h1>
  <div class="grid">
    <div>
      <h3>Table</h3>
      <table>
        <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Purchase Price</th>
          <th>Unit</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in items" :key="item.name">
          <td>{{ index+1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.num }}</td>
          <td>{{ (item.price).toFixed(2) }}€</td>
          <td>{{ item.unit }}</td>
          <td><button @click="deleteItem(index)">Delete</button></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div>
      <h3>Add Item</h3>
        <input v-model="item.name" type="text" placeholder="Name">
        <input v-model="item.num" type="number" placeholder="Quantity">
        <input v-model="item.price" type="number" placeholder="Price">
        <input v-model="item.unit" type="text" placeholder="Unit">
        <button @click="addItem">Add</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'HelloWorld',
  data() {
    return {
      item: {
        name: "",
        num: "",
        price: "",
        unit: "",
      },
      items: {}
    }
  },
  methods: {
    async addItem() {
      await axios.post("http://localhost:5000/api/add-item", this.item);
      this.items = (await axios.get("http://localhost:5000/api/get-items")).data;
      this.item = {
        name: "",
        num: "",
        price: "",
        unit: "",
      };
    },
    async deleteItem(index) {
      if (confirm("Confirm.")) {
        await axios.delete(`http://localhost:5000/api/delete/${index}`);
        this.items = (await axios.get("http://localhost:5000/api/get-items")).data;
      }
    }
  },
  async mounted() {
    this.items = (await axios.get("http://localhost:5000/api/get-items")).data;
  },
  async beforeCreate() {
    await axios.post("http://localhost:5000/api/init");
  }
}
</script>

<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  table {
    border-collapse: collapse;
  }
  td:not(:last-child) {
    border: 1px solid black;
  }
  th {
    border: 2px solid black;
  }
</style>
