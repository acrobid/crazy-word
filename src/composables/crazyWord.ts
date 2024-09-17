import { Ref, ref, watchEffect, toValue, computed } from 'vue';

export function useCrazyWord(startingWord: Ref<string> | string) {
  const outputRef = ref<string>('');

  function randomizeString(inputString: string): string {
    // Convert the string to an array of characters
    const charArray: string[] = inputString.split('');

    // Fisher-Yates shuffle algorithm
    for (let i = charArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [charArray[i], charArray[j]] = [charArray[j], charArray[i]];
    }

    const result = charArray.join('');

    console.log(`inputString -> ${result}`);

    // Join the shuffled characters back into a string
    return result.toLowerCase();
  }

  watchEffect(() => (outputRef.value = randomizeString(toValue(startingWord))));

  const outputComputed = computed(() => randomizeString(toValue(startingWord)));

  return { outputRef, outputComputed };
}
