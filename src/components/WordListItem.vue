<template>
  <div class="list" :class="{ completed: done }">
    <h1 class="neon" :class="colorClass">{{ output }}</h1>
    <button @click="reveal()" v-if="!done">Go!</button>
    <div v-else class="completion-badge">
      <span class="completion-text">DECODED</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { CrazyWord } from "./../main.ts";
import { useScrambledWord } from "./../composables/scrambledWord.ts";

const props = defineProps<{
  word: CrazyWord;
}>();

const { output, reveal, done } = useScrambledWord(props.word);

const colorClass = computed(() => (done.value ? "turquoise" : "pink"));
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
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 15px;
  background: linear-gradient(
    135deg,
    rgba(0, 255, 255, 0.05),
    rgba(255, 0, 255, 0.05)
  );
  border: 1px solid rgba(0, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 255, 255, 0.1),
    inset 0 0 20px rgba(255, 0, 255, 0.05);
  transition: all 0.5s ease;
  position: relative;
  overflow: hidden;
}

/* Completion animation */
.list.completed {
  background: linear-gradient(
    135deg,
    rgba(0, 255, 255, 0.15),
    rgba(255, 0, 255, 0.15)
  );
  border: 2px solid rgba(0, 255, 255, 0.8);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.3),
    inset 0 0 30px rgba(0, 255, 255, 0.1);
  animation: completion-pulse 2s ease-in-out;
}

.list.completed::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 255, 255, 0.3),
    rgba(255, 0, 255, 0.3),
    transparent
  );
  animation: completion-sweep 1.5s ease-out;
}

.list.completed::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px solid transparent;
  border-radius: 12px;
  background: linear-gradient(45deg, #00ffff, #ff00ff, #00ffff) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: subtract;
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask-composite: subtract;
  animation: border-glow 3s linear infinite;
}

@keyframes completion-pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.3),
      inset 0 0 30px rgba(0, 255, 255, 0.1);
  }
  50% {
    transform: scale(1.02);
    box-shadow: 0 0 50px rgba(0, 255, 255, 0.8),
      0 0 100px rgba(0, 255, 255, 0.5), inset 0 0 50px rgba(0, 255, 255, 0.2);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.3),
      inset 0 0 30px rgba(0, 255, 255, 0.1);
  }
}

@keyframes completion-sweep {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

@keyframes border-glow {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

.completion-badge {
  background: linear-gradient(
    45deg,
    rgba(0, 255, 255, 0.3),
    rgba(255, 0, 255, 0.3)
  );
  border: 2px solid #00ffff;
  border-radius: 8px;
  padding: 8px 16px;
  position: relative;
  overflow: hidden;
}

.completion-badge::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: badge-shine 2s ease-in-out infinite;
}

.completion-text {
  color: #00ffff;
  font-family: "Orbitron", monospace;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 12px;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
  position: relative;
  z-index: 1;
}

@keyframes badge-shine {
  0% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}

.list:hover {
  border-color: rgba(255, 0, 255, 0.5);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 0, 255, 0.2),
    inset 0 0 30px rgba(0, 255, 255, 0.05);
  transform: translateY(-2px);
}

.list button {
  background: linear-gradient(
    45deg,
    rgba(0, 255, 255, 0.2),
    rgba(255, 0, 255, 0.2)
  );
  color: #00ffff;
  border: 2px solid #00ffff;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-family: "Orbitron", monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
}

.list button:hover {
  border-color: #ff00ff;
  color: #ff00ff;
  box-shadow: 0 0 25px rgba(255, 0, 255, 0.5);
  transform: translateY(-2px);
}
</style>
