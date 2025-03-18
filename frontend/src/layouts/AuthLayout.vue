<template>
  <div class="auth-layout">
    <div class="auth-container">
      <header class="auth-header">
        <router-link to="/" class="logo">🏠 HomeTracker</router-link>
        <div class="actions">
          <ThemeToggle />
          <router-link
            :to="$route.path.includes('login') ? '/register' : '/login'"
            class="button_primary"
          >
            {{ $route.path.includes("login") ? "S'inscrire" : "Se connecter" }}
          </router-link>
        </div>
      </header>
      <main class="auth-content">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import ThemeToggle from "../components/ThemeToggle.vue";
</script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
}

:global(.dark) .auth-layout {
  background-color: #111827;
}

.auth-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.auth-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: var(--color-primary);
}

:global(.dark) .logo {
  color: var(--color-primary-dark);
}

.actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.auth-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
