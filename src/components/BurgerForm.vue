
<script setup lang="ts">
import { onMounted, reactive } from 'vue'

import type { BurgerDados } from '../shared/interfaces/burger'

import Message from './Message.vue'

const burgerData: BurgerDados = reactive({
  paes: [],
  carnes: [],
  nome: '',
  pao: '',
  carne: '',
  opcionais: [],
  opcionaisdata: [],
  status: 'Solicitado',
  msg: ''
})

const getIngredientes = async () => {
  const req = await fetch('http://localhost:3000/ingredientes')
  const data = await req.json()

  burgerData.paes = data.paes
  burgerData.carnes = data.carnes
  burgerData.opcionaisdata = data.opcionais
}

const createBurger = async (e: any) => {
  e.preventDefault()

  if (!burgerData.nome.trim() || !burgerData.carne || !burgerData.pao) {
    burgerData.msg = 'Informe o nome do cliente, o pão e a carne desejada!'
    return
  }

  const data = {
    nome: burgerData.nome,
    carne: burgerData.carne,
    pao: burgerData.pao,
    opcionais: Array.from(burgerData.opcionais),
    status: 'Solicitado'
  }

  const dataJson = JSON.stringify(data)

  const req = await fetch('http://localhost:3000/burgers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: dataJson
  })

  const res = await req.json()

  burgerData.msg = `Pedido Nº ${res.id} realizado com sucesso!`

  setTimeout(() => (burgerData.msg = ''), 3000)

  burgerData.nome = ''
  burgerData.carne = ''
  burgerData.pao = ''
  burgerData.opcionais = []
}

onMounted(async () => {
  await getIngredientes()
})
</script>
  
  <template>
  <Message :msg="burgerData.msg" v-show="burgerData.msg" />
  <div>
    <form id="burger-form" method="POST" @submit="createBurger">
      <div class="input-container">
        <label for="nome">Nome do cliente:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          v-model="burgerData.nome"
          placeholder="Digite o seu nome"
        />
      </div>
      <div class="input-container">
        <label for="pao">Escolha o pão:</label>
        <select name="pao" id="pao" v-model="burgerData.pao">
          <option value="">Selecione o seu pão</option>
          <option v-for="pao in burgerData.paes" :key="pao.id" :value="pao.tipo">
            {{ pao.tipo }}
          </option>
        </select>
      </div>
      <div class="input-container">
        <label for="carne">Escolha a carne do seu Burger:</label>
        <select name="carne" id="carne" v-model="burgerData.carne">
          <option value="">Selecione o tipo de carne</option>
          <option v-for="carne in burgerData.carnes" :key="carne.id" :value="carne.tipo">
            {{ carne.tipo }}
          </option>
        </select>
      </div>
      <div class="input-container">
        <label id="opcionais-title" for="opcionais">Selecione os opcionais:</label>
        <div id="opcionais-container">
          <div
            class="checkbox-container"
            v-for="opcional in burgerData.opcionaisdata"
            :key="opcional.id"
          >
            <input
              type="checkbox"
              name="opcionais"
              v-model="burgerData.opcionais"
              :value="opcional.tipo"
            />
            <span>{{ opcional.tipo }}</span>
          </div>
        </div>
      </div>
      <div class="input-container">
        <input class="submit-btn" type="submit" value="Criar meu Burger!" />
      </div>
    </form>
  </div>
</template>
  
  <style scoped>
#burger-form {
  max-width: 400px;
  margin: 0 auto;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;
  padding: 5px 10px;
  border-left: 4px solid #fcba03;
}

input,
select {
  padding: 5px 10px;
  width: 100%;
  max-width: 300px;
}

#opcionais-container {
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 380px) {
    grid-template-columns: 1fr;
  }
}

#opcionais-title {
  width: 100%;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 20px;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.submit-btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>