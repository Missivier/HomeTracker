<template>
  <div class="form-card-container">
    <div :class="['form-card', className]">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  className: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.form-card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 28rem; /* 448px */
  margin: 0 auto;
  padding: 0 1rem;
}

.form-card {
  width: 100%;
  background-color: var(--color-background);
  border: 1px solid rgba(var(--color-foreground-rgb), 0.1);
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 2rem;
  margin: 2rem 0;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

:global(.dark) .form-card {
  background-color: var(--color-background-dark);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2),
    0 2px 4px -1px rgba(0, 0, 0, 0.1);
}

.form-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

@media (max-width: 640px) {
  .form-card {
    padding: 1.5rem;
    margin: 1rem 0;
  }
}
</style>
