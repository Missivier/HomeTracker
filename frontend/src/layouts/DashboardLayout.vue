<template>
  <div class="min-h-screen bg-gray-50 flex">
    <div class="flex-1 flex flex-col overflow-hidden">
      <Navbar />

      <main class="flex-1 overflow-x-hidden overflow-y-auto p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "../components/Navbar.vue";
</script>
