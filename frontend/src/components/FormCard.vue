<template>
  <div
    :class="[
      'rounded-xl overflow-hidden transition-all duration-300',
      'backdrop-blur-md border border-gray-200 dark:border-gray-700',
      'bg-white/30 dark:bg-gray-900/30 dark:text-white text-gray-800',
      'shadow-lg hover:shadow-xl',
      padding ? `p-${padding}` : 'p-6',
      className,
    ]"
  >
    <div v-if="title || $slots.header" class="mb-6 text-center">
      <slot name="header">
        <h3 class="text-2xl font-bold text-primary dark:text-primary-light">
          {{ title }}
        </h3>
        <p
          v-if="subtitle"
          class="mt-2 text-sm text-gray-600 dark:text-gray-400"
        >
          {{ subtitle }}
        </p>
      </slot>
    </div>

    <div :class="{ 'space-y-5': spacing }">
      <slot></slot>
    </div>

    <div
      v-if="$slots.footer"
      class="mt-6 pt-4 text-center text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-700"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  padding: {
    type: [String, Number],
    default: "6",
  },
  spacing: {
    type: Boolean,
    default: true,
  },
  className: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
/* Animation d'entrée */
div {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Effet de brillance sur les bordures */
div {
  position: relative;
  overflow: hidden;
}

div::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: inherit;
  background: linear-gradient(
    135deg,
    transparent 20%,
    var(--color-primary-light) 40%,
    var(--color-primary) 60%,
    transparent 80%
  );
  z-index: -1;
  opacity: 0.3;
  background-size: 300% 300%;
  animation: borderGlow 6s ease-in-out infinite alternate;
}

@keyframes borderGlow {
  0% {
    background-position: 0% 0%;
    opacity: 0.2;
  }
  50% {
    background-position: 100% 100%;
    opacity: 0.4;
  }
  100% {
    background-position: 0% 0%;
    opacity: 0.2;
  }
}

/* Effet de hover */
div:hover::before {
  opacity: 0.5;
  animation-duration: 3s;
}
</style>
