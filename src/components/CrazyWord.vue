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
  /* justify-content: flex-start; */ /* Centering content is usually better for fluid layouts */
  align-items: center;
  gap: clamp(10px, 2vw, 20px); /* Fluid gap */
  padding: clamp(10px, 3vw, 20px); /* Fluid padding */
  width: 100%;
  color: #00ffff;
  box-sizing: border-box;
}

.form-container {
  display: flex;
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
  gap: clamp(10px, 2vw, 15px); /* Fluid gap */
  width: 100%;
  max-width: 600px; /* Max width for form */
  justify-content: center;
}

.form-container input {
  padding: clamp(10px, 2vw, 12px) clamp(12px, 2.5vw, 16px);
  border-radius: 8px;
  border: 2px solid #00ffff;
  font-size: clamp(14px, 2.5vw, 16px); /* Fluid font size */
  font-family: "Inter", sans-serif;
  background: rgba(0, 0, 0, 0.5);
  color: #00ffff;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.3), inset 0 0 10px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  flex-grow: 1; /* Allow input to grow */
  min-width: 200px; /* Minimum width before wrapping */
  box-sizing: border-box;
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

/* Styling for the div containing buttons, to help with wrapping */
.form-container > div {
  display: flex;
  flex-wrap: wrap; /* Allow buttons to wrap */
  gap: clamp(8px, 1.5vw, 10px);
  justify-content: center;
  flex-grow: 1; /* Allow button container to grow */
}

.form-container button {
  padding: clamp(10px, 2vw, 12px) clamp(15px, 2.5vw, 20px);
  border-radius: 8px;
  border: 2px solid #00ffff;
  font-size: clamp(14px, 2.5vw, 16px); /* Fluid font size */
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
  flex-grow: 1; /* Allow buttons to grow */
  min-width: 120px; /* Minimum width for buttons */
  box-sizing: border-box;
}

.form-container button:hover {
  border-color: #ff00ff;
  color: #ff00ff;
  box-shadow: 0 0 25px rgba(255, 0, 255, 0.5);
  transform: translateY(-2px);
}

.colorful {
  color: #00ffff;
  font-size: clamp(24px, 6vw, 40px); /* Fluid font size */
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: clamp(1px, 0.5vw, 2px); /* Fluid letter spacing */
  margin: 0;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.4);
  transition: all 0.3s ease;
  word-break: break-word; /* Prevent overflow */
}

.colorful:hover {
  color: #ff00ff;
  text-shadow: 0 0 15px rgba(255, 0, 255, 0.8), 0 0 25px rgba(255, 0, 255, 0.4);
}

/* Keyframes slide and glow-sweep are fine */
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
  /* font-family: "Orbitron", monospace; */ /* Replaced by Poppins globally, consider if this specific one is needed */
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: clamp(6px, 1.5vw, 8px) clamp(12px, 2.5vw, 16px);
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
</style>
