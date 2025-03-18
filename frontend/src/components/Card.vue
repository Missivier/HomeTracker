<template>
  <div
    :class="[
      'rounded-xl overflow-hidden transition-all duration-300',
      variant === 'elevated'
        ? 'shadow-lg hover:shadow-xl dark:shadow-gray-900/30'
        : '',
      variant === 'outlined'
        ? 'border border-gray-200 dark:border-gray-700'
        : '',
      variant === 'filled'
        ? 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm'
        : '',
      variant === 'gradient'
        ? 'bg-gradient-to-br from-primary-light/10 to-primary/20 dark:from-primary-light/5 dark:to-primary/10'
        : '',
      padding ? `p-${padding}` : 'p-6',
      className,
    ]"
  >
    <div v-if="title || $slots.header" class="mb-4">
      <slot name="header">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">
          {{ title }}
        </h3>
        <p
          v-if="subtitle"
          class="mt-1 text-sm text-gray-500 dark:text-gray-400"
        >
          {{ subtitle }}
        </p>
      </slot>
    </div>

    <div :class="{ 'space-y-4': spacing }">
      <slot></slot>
    </div>

    <div
      v-if="$slots.footer"
      class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
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
  variant: {
    type: String,
    default: "elevated",
    validator: (value: string) =>
      ["elevated", "outlined", "filled", "gradient"].includes(value),
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
</style>
