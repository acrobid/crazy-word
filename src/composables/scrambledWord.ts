import { ref, MaybeRef, toValue } from 'vue';
import type { CrazyWord } from './../main.ts';

export function useScrambledWord(input: MaybeRef<CrazyWord>) {
  const crazyWord = toValue(input);
  const output = ref<string>(crazyWord.crazy);
  const done = ref(false);

  function partialRevealAndRandomize(original: string, x: number): string {
    if (x < 0 || x > original.length) {
      throw new Error('Invalid number of characters to reveal');
    }

    // Convert the string to an array of characters
    const chars: string[] = original.split('');

    // Keep the first x characters as they are
    const revealedPart = chars.slice(0, x);

    // Get the remaining characters to randomize
    const remainingChars = chars.slice(x);

    // Shuffle the remaining characters
    for (let i = remainingChars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [remainingChars[i], remainingChars[j]] = [
        remainingChars[j],
        remainingChars[i],
      ];
    }

    // Combine the revealed part and the randomized part
    return [...revealedPart, ...remainingChars].join('');
  }

  async function gradualReveal(
    original: string,
    randomizeInterval: number,
    revealInterval: number
  ): Promise<void> {
    return new Promise((resolve) => {
      let revealedCount = 0;
      output.value = partialRevealAndRandomize(original, revealedCount);

      console.log(`Original: ${original}`);
      console.log(`Initial: ${output.value}`);

      const randomizeTimer = setInterval(() => {
        if (revealedCount < original.length) {
          output.value = partialRevealAndRandomize(original, revealedCount);
          console.log(`Randomized: ${output.value}`);
          if (output.value === crazyWord.normal) finish();
        } else {
          clearInterval(randomizeTimer);
        }
      }, randomizeInterval);

      const finish = () => {
        clearInterval(revealTimer);
        clearInterval(randomizeTimer);
        console.log('Reveal complete!');

        resolve();
      };

      const revealTimer = setInterval(() => {
        revealedCount++;
        if (revealedCount <= original.length) {
          output.value = partialRevealAndRandomize(original, revealedCount);
          if (output.value === crazyWord.normal) finish();
          console.log(`Revealed (${revealedCount}): ${output.value}`);
        } else {
          finish();
        }
      }, revealInterval);
    });
  }

  async function reveal() {
    done.value = false;
    await gradualReveal(crazyWord.normal, 500, 1000);
    done.value = true;
  }

  return { output, reveal, done };
}
