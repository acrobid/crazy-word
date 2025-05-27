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
  align-items: center; /* Center items horizontally */
  gap: clamp(10px, 3vw, 20px); /* Fluid gap */
  padding: clamp(10px, 5vw, 20px); /* Fluid padding */
  width: 100%;
  box-sizing: border-box; /* Include padding in width calculation */
}

.form-container {
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap on smaller screens */
  justify-content: center; /* Center items when they wrap */
  gap: clamp(10px, 2vw, 15px); /* Fluid gap */
  width: 100%;
  max-width: 600px; /* Optional: constrain max width of form */
}

.form-container input[type="input"] {
  flex-grow: 1; /* Allow input to grow and take available space */
  min-width: 200px; /* Prevent input from becoming too small */
  width: 100%; /* Added to help with width issues on mobile */
  box-sizing: border-box; /* Crucial for width calculation */
  padding: clamp(10px, 2.5vw, 12px) clamp(12px, 3vw, 16px);
  font-size: clamp(14px, 3vw, 16px); /* Fluid font size */
  border-radius: 8px;
  border: 2px solid #00ffff;
  background: rgba(0, 0, 0, 0.5);
  color: #00ffff;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.3), inset 0 0 10px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
}

.form-container input[type="input"]:focus {
  outline: none;
  border-color: #ff00ff;
  color: #ff00ff;
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.5), inset 0 0 10px rgba(0, 0, 0, 0.5);
}

.form-container input[type="input"]::placeholder {
  color: rgba(0, 255, 255, 0.5);
  text-transform: uppercase;
}

.form-container > div {
  /* This div wraps the buttons */
  display: flex;
  flex-wrap: wrap; /* Allow buttons to wrap */
  gap: clamp(8px, 2vw, 10px); /* Fluid gap for buttons */
  flex-grow: 1; /* Allow button container to grow if needed */
  justify-content: center; /* Center buttons */
}

.form-container button {
  flex-grow: 1; /* Allow buttons to grow */
  min-width: 120px; /* Minimum width for buttons */
  padding: clamp(10px, 2.5vw, 12px) clamp(15px, 3vw, 20px);
  font-size: clamp(14px, 3vw, 16px); /* Fluid font size */
  border-radius: 8px;
  border: 2px solid #00ffff;
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
  transition: all 0.3s ease;
}

.form-container button:hover {
  border-color: #ff00ff;
  color: #ff00ff;
  box-shadow: 0 0 25px rgba(255, 0, 255, 0.5);
  transform: translateY(-2px);
}
.colorful {
  color: #00ffff;
  font-size: clamp(24px, 7vw, 40px); /* Fluid font size */
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
  word-break: break-word; /* Prevent overflow */
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

/* Fluid and Flexbox based responsive styles for form */

/* Specific adjustments for very small screens if flex-wrap isn't enough */
@media (max-width: 400px) {
  .form-container {
    flex-direction: column; /* Stack input and button container */
    align-items: stretch; /* Make children full width */
  }

  .form-container input[type="input"],
  .form-container > div {
    width: 100%; /* Ensure they take full width */
  }

  .form-container button {
    width: 100%; /* Make buttons full width if they are in their own container or directly in form */
    margin-bottom: 8px; /* Add some space if they stack */
  }
  .form-container > div button:last-child {
    margin-bottom: 0;
  }
}

button {
  @starting-style {
    transform: translateX(-80px);
    opacity: 0;
  }

  transition: opacity 1s, transform 2s;
}
</style>
