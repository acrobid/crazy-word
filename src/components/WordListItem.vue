<template>
  <div class="list">
    <h1 class="neon" :class="colorClass">{{ output }}</h1>
    <button @click="reveal()">Go!</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CrazyWord } from './../main.ts';
import { useScrambledWord } from './../composables/scrambledWord.ts';

const props = defineProps<{
  word: CrazyWord;
}>();

const { output, reveal, done } = useScrambledWord(props.word);

const colorClass = computed(() => (done.value ? 'turquoise' : 'pink'));
</script>

<style scoped>
button:active,
button:focus {
  transition: opacity 0.3s;
  opacity: 0;
}

.list {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
  align-items: center;
}
</style>
