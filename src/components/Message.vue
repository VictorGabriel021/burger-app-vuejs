<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{ msg: string }>()
</script>

<template>
  <div class="message-container">
    <p>{{ props.msg }}</p>
  </div>
</template>
  
  <style scoped>
.message-container {
  color: #004085;
  background-color: #cce5ff;
  border: 2px solid #b8daff;
  border-radius: 5px;
  padding: 10px;
  max-width: 400px;
  margin: 30px auto;
}
</style>