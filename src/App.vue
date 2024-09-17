<script setup>
import CrazyWord from './components/CrazyWord.vue';
</script>

<template>
  <div>
    <h2 class="neon pink logo">Crazy</h2>
    <h2 class="neon turquoise logo">word</h2>
  </div>
  <div style="margin-top: 30px">
    Can your friends figure out the words before they unscramble?
  </div>

  <CrazyWord style="margin-top: 30px" />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

.logo {
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 1em #646cffff);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 1em #42b883ff);
}
</style>
