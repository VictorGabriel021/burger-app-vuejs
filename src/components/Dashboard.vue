<script setup lang="ts">
import Message from './Message.vue'

import BurgerService from '../services/burger'

import { status } from '../shared/constants/burger'

import { ref } from 'vue'

const { getBugers, updateBurger, deleteBurger } = BurgerService()

let burgers = ref(getBugers())
const burgerStatus = ref(status)
const msg = ref('')

const onDeleteBurger = async (id) => {
  deleteBurger(id)
  msg.value = `Pedido removido com sucesso!`
  setTimeout(() => (msg.value = ''), 3000)
  burgers = ref(getBugers())
}

const onUpdateBurger = async (event, burger) => {
  const status = event.target.value
  updateBurger(burger, status)

  msg.value = `O pedido foi atualizado`
  setTimeout(() => (msg.value = ''), 3000)
}
</script>

<template>
  <Message :msg="msg" v-show="msg" />
  <div id="burger-table" v-if="burgers?.length">
    <div>
      <div id="burger-table-heading">
        <div class="order-id">#:</div>
        <div>Cliente:</div>
        <div>Pão:</div>
        <div>Carne:</div>
        <div>Opcionais:</div>
        <div>Ações:</div>
      </div>
    </div>
    <div id="burger-table-rows">
      <div class="burger-table-row" v-for="burger in burgers" :key="burger.id">
        <div class="order-number">{{ burger.id }}</div>
        <div>{{ burger.nome }}</div>
        <div>{{ burger.pao }}</div>
        <div>{{ burger.carne }}</div>
        <div>
          <ul v-for="(opcional, index) in burger.opcionais" :key="index">
            <li>{{ opcional }}</li>
          </ul>
          <div v-if="!burger.opcionais.length">Não informado</div>
        </div>
        <div class="button-container">
          <select
            name="burgerStatus"
            class="burgerStatus"
            @change="(event) => onUpdateBurger(event, burger)"
          >
            <option
              :value="s.tipo"
              v-for="s in burgerStatus"
              :key="s.id"
              :selected="burger.status == s.tipo"
            >
              {{ s.tipo }}
            </option>
          </select>
          <button class="delete-btn" @click="onDeleteBurger(burger.id)">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h2>Não há pedidos no momento!</h2>
  </div>
</template>

<style scoped>
#burger-table {
  max-width: 1200px;
  overflow-y: auto;
  margin: 0 auto;
}

#burger-table-heading,
#burger-table-rows,
.burger-table-row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  gap: 0 25px;
}

#burger-table-heading {
  font-weight: bold;
  padding: 12px;
  border-bottom: 3px solid #333;
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(6, 150px);
}

.burger-table-row {
  width: auto;
  padding: 12px;
  border-bottom: 1px solid #ccc;
  display: grid;
  grid-template-columns: repeat(6, 150px);
}

select {
  padding: 12px 6px;
  width: 100%;
}

.delete-btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  width: 100%;
  cursor: pointer;
  transition: 0.5s;
}

.delete-btn:hover {
  background-color: transparent;
  color: #222;
}

.button-container {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 10px;
}
</style>
