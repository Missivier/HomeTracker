<script setup>
import { ref } from "vue";

const isDark = ref(false);

function toggleDarkMode() {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle("dark", isDark.value);
}
</script>

<template>
  <nav
    class="sticky top-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-md p-4 flex justify-between items-center"
  >
    <h1 class="text-xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
    <div class="flex gap-4 items-center">
      <button
        @click="toggleDarkMode"
        class="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
      >
        {{ isDark ? "🌙" : "☀️" }}
      </button>
    </div>
  </nav>
</template>
