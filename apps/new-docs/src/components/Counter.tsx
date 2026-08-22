import { createSignal, onMount } from "solid-js";

export function Counter() {
  const [count, setCount] = createSignal(0);

  onMount(() => {
    console.log("Counter hydrated!");
  });

  return (
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      onClick={() => setCount((c) => c + 1)}
    >
      Count: {count()}
    </button>
  );
}
