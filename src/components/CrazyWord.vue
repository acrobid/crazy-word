<template>
  <div class="page-container">
    <form @submit.prevent="saveWord" class="form-container">
      <input type="input" v-model="word" placeholder="Enter word..." />
      <div v-if="word.length > 0">
        <button class="new-word-label" type="submit">New word</button>
        <button @click="reset()">Reset</button>
      </div>
    </form>

    <div style="margin-top: 20px" v-if="wordIsVisible">
      <h1 class="colorful">{{ outputRef }}</h1>
    </div>
    <div v-if="wordList.length > 0">
      <h4><WordList :list="wordList" /></h4>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed } from "vue";
import { useCrazyWord } from "../composables/crazyWord.ts";
import WordList from "./WordList.vue";
import { CrazyWord } from "../main.ts";

const word = ref("");
const wordIsVisible = computed(() => word.value.length > 0);
const wordList = ref<CrazyWord[]>([
  {
    normal: "amazing",
    crazy: "zaminga",
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
  word.value = "";
};

const reset = () => {
  word.value = "";
  wordList.value = [];
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 20px;
  width: 100%;
  color: #00ffff;
}
.form-container {
  display: flex;
  gap: 10px;
}

.form-container input {
  padding: 12px 16px;
  border-radius: 8px;
  border: 2px solid #00ffff;
  font-size: 16px;
  font-family: "Inter", sans-serif;
  background: rgba(0, 0, 0, 0.5);
  color: #00ffff;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.3), inset 0 0 10px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
}

.form-container input:focus {
  outline: none;
  border-color: #ff00ff;
  color: #ff00ff;
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.5), inset 0 0 10px rgba(0, 0, 0, 0.5);
}

.form-container input::placeholder {
  color: rgba(0, 255, 255, 0.5);
  text-transform: uppercase;
}

.form-container button {
  padding: 12px 20px;
  border-radius: 8px;
  border: 2px solid #00ffff;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Poppins", sans-serif;
  background: linear-gradient(
    45deg,
    rgba(0, 255, 255, 0.1),
    rgba(255, 0, 255, 0.1)
  );
  color: #00ffff;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
}

.form-container button:hover {
  border-color: #ff00ff;
  color: #ff00ff;
  box-shadow: 0 0 25px rgba(255, 0, 255, 0.5);
  transform: translateY(-2px);
}
.colorful {
  color: #00ffff;
  font-size: 40px;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.4);
  transition: all 0.3s ease;
}

.colorful:hover {
  color: #ff00ff;
  text-shadow: 0 0 15px rgba(255, 0, 255, 0.8), 0 0 25px rgba(255, 0, 255, 0.4);
}
@keyframes slide {
  0% {
    background-position: 0 0;
  }
  to {
    background-position: -100% 0;
  }
}
.new-word-label {
  color: rgba(255, 255, 255, 0.8);
  font-family: "Orbitron", monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 8px 16px;
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.new-word-label::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 255, 255, 0.4),
    transparent
  );
  animation: glow-sweep 2s infinite;
}

@keyframes glow-sweep {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* Mobile responsive styles for form */
@media (max-width: 768px) {
  .form-container {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .form-container input {
    font-size: 18px; /* Prevent zoom on iOS */
    padding: 1em;
    width: 100%;
    box-sizing: border-box;
  }

  .form-container > div {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;
  }

  .form-container button {
    padding: 1em;
    font-size: 16px;
    width: 100%;
    min-height: 48px;
  }

  .colorful {
    font-size: 28px;
    word-break: break-word;
  }
}

@media (max-width: 480px) {
  .form-container input {
    font-size: 16px;
    padding: 1.2em 1em;
  }

  .form-container button {
    font-size: 14px;
    letter-spacing: 0.5px;
  }

  .colorful {
    font-size: 24px;
  }
}

/* Landscape orientation for mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .form-container {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .form-container input {
    flex: 1;
    min-width: 200px;
  }

  .form-container > div {
    flex-direction: row;
    gap: 0.5rem;
  }

  .colorful {
    font-size: 20px;
  }
}
</style>
