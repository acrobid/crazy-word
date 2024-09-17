<template>
  <div v-for="(word, index) in list" :key="word.crazy">
    <WordListItem :word v-if="word.normal?.length > 0" />
  </div>
</template>

<script setup lang="ts">
import WordListItem from './WordListItem.vue';
import type { CrazyWord } from './../main.ts';

defineProps<{
  list: CrazyWord[];
}>();
</script>
