<template>
  <div class="min-h-screen flex items-center justify-center bg-background">
    <div class="relative w-full max-w-md">
      <div class="absolute inset-0 -z-10">
        <img
          src="../assets/auth-background.svg"
          alt="Decorative background"
          class="w-full h-full object-cover"
        />
      </div>

      <div class="bg-white p-8 rounded-lg shadow-lg relative z-10">
        <div class="mb-6 text-center">
          <h1 class="text-3xl font-bold text-secondary">HomeTracker</h1>
          <p class="text-foreground">Gestion de maison intelligente</p>
        </div>

        <router-view />
      </div>
    </div>
  </div>
</template>
