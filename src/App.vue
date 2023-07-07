<template>
  <div>
    <input type="text" placeholder="Именительный" id="im" v-model="im">
    <input type="text" placeholder="Родительный" id="rod" v-model="rod">
    <input type="text" placeholder="Дательный" id="dat" v-model="dat">
    <input type="text" placeholder="Винительный" id="vin" v-model="vin">
    <input type="text" placeholder="Творительный" id="tvor" v-model="tvor">
    <input type="text" placeholder="Предложный" id="predl" v-model="predl">
    <button @click="postData()">Создать</button>
  </div>
  <div>
    <input type="text" placeholder="Введите слово" id="word" v-model="word">
    <select type="text" placeholder="Склонение" id="declination" v-model="declination">
      <option value="" disabled selected hidden>Выберите склонение</option>
      <option value="im">im</option>
      <option value="rod">rod</option>
      <option value="dat">dat</option>
      <option value="vin">vin</option>
      <option value="tvor">tvor</option>
      <option value="predl">predl</option>
    </select>
    <button @click="getData(word, declination)">Получить</button>
  </div>
  <div>
    <button @click="getAll()">Получить всех</button>
    <table>
      <tr>
        <th>Именительный</th>
        <th>Родительный</th>
        <th>Дательный</th>
        <th>Винительный</th>
        <th>Творительный</th>
        <th>Предложный</th>
      </tr>
      <tr v-for="(item, index) in items" :key="index">
        <td>{{ item.im }}</td>
        <td>{{ item.rod }}</td>
        <td>{{ item.dat }}</td>
        <td>{{ item.vin }}</td>
        <td>{{ item.tvor }}</td>
        <td>{{ item.predl }}</td>
      </tr>
    </table>
  </div>
</template>
<script>

import { api } from './main';

export default {
  data() {
    return {
      im: '',
      rod: '',
      dat: '',
      vin: '',
      tvor: '',
      predl: '',
      word: ``,
      declination: ``,
      items: []
    };
  },
  methods: {
    async postData() {
      try {
        const declinations = {
          im: this.im,
          rod: this.rod,
          dat: this.dat,
          vin: this.vin,
          tvor: this.tvor,
          predl: this.predl
        }
        await api.post(`/morpher-service/create`, declinations);
      } catch (error) {
        console.error(error);
      }
    },
    async getData() {
      try {
        const word = this.word
        const declination = this.declination
        const declinationword = await api.get(`/morpher-service/${word}/${declination}`);
        this.word = ""
        this.declination = ""
        console.log(declinationword.data);
      } catch (error) {
        console.error(error);
      }
    }, async getAll() {
      try {
        const response = await api.get(`/morpher-service/get`);
        this.items = response.data;
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style></style>