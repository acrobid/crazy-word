<template>
  <div class="page-container">
    <form @submit.prevent="saveWord" class="form-container">
      <input type="input" v-model="word" />
      <button type="submit">add</button>
      <button @click="reset()">reset</button>
    </form>

    <div style="margin-top: 20px" v-if="wordIsVisible">
      This is the crazy word:
      <h1 class="colorful">{{ outputRef }}</h1>
    </div>
    <div v-if="wordList.length > 0">
      <h4><WordList :list="wordList" /></h4>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue';
import { useCrazyWord } from '../composables/crazyWord.ts';
import WordList from './WordList.vue';

const word = ref('');
const wordIsVisible = computed(()=>word.value.length > 0)
const wordList = ref<CrazyWord[]>([
  {
    normal: 'amazing',
    crazy: 'zaminga',
  },
]);

const { outputRef } = useCrazyWord(word);

watchEffect(() => console.log(outputRef));

const saveWord = () => {
  const newWord: CrazyWord = {
    crazy: outputRef.value,
    normal: word.value,
  };

  console.log(newWord);

  const newList = [newWord, ...wordList.value];
  console.log(newList);
  wordList.value = newList;
  word.value = '';
};

const reset = () => {
  word.value = '';
  wordList.value = [];
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 10px;
}
.form-container {
  display: flex;
  gap: 10px;
}
.colorful {
  background-image: -webkit-linear-gradient(
    left,
    #3498db,
    #f47920 10%,
    #d71345 20%,
    #f7acbc 30%,
    #ffd400 40%,
    #3498db 50%,
    #f47920 60%,
    #d71345 70%,
    #f7acbc 80%,
    #ffd400 90%,
    #3498db
  );
  color: transparent;
  -webkit-background-clip: text;
  background-size: 200% 100%;
  animation: slide 5s infinite linear;
  font-size: 40px;
}
@keyframes slide {
  0% {
    background-position: 0 0;
  }
  to {
    background-position: -100% 0;
  }
}
</style>
