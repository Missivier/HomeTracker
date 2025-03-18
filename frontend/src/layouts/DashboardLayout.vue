<script setup>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
</script>

<template>
  <div class="flex h-screen bg-background dark:bg-background-dark">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Contenu principal -->
    <div class="flex flex-col flex-1">
      <Navbar />
      <main class="p-4">
        <slot />
      </main>
    </div>
  </div>
</template>
