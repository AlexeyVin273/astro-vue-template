<template>
  <div :style="counterStyle">
    <p>Count: {{ count }}</p>
    <button class="button" @click="increment">Increment</button>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const increment = () => {
      count.value++
    }

    const counterStyle = {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9',
      maxWidth: '200px',
      margin: '20px 0'
    }

    return {
      count,
      increment,
      counterStyle
    }
  }
}
</script>
