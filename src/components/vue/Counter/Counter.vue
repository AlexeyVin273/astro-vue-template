<template>
  <div class="counter">
    <p>Count: {{ count }}</p>
    <button class="button" @click="increment">Increment</button>
  </div>
</template>

<script>
import useCounter from '@scripts/components/Counter/Counter'

export default {
  name: 'Counter',
  setup() {
    return useCounter()
  }
}
</script>
