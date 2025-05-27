<script setup>
import CrazyWord from "./components/CrazyWord.vue";
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
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");

.logo {
  will-change: filter;
  transition: filter 300ms;
  font-family: "Pacifico", cursive !important;
  font-size: 4em;
  margin: 0px;
  text-transform: none !important;
  letter-spacing: normal !important;
}
.logo:hover {
  filter: drop-shadow(0 0 2em currentColor);
}
</style>
