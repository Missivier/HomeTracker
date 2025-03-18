<script setup>
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <div class="flex flex-col h-screen bg-background dark:bg-background-dark">
    <Navbar />
    <main class="p-6 flex-1 overflow-auto">
      <slot />
    </main>
  </div>
</template>
