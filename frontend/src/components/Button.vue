<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300',
      variant === 'primary'
        ? 'bg-primary text-black hover:bg-primary-dark focus:ring-primary dark:ring-offset-gray-900'
        : '',
      variant === 'secondary'
        ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-primary dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-primary dark:ring-offset-gray-900'
        : '',
      variant === 'danger'
        ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 dark:ring-offset-gray-900'
        : '',
      variant === 'gradient' ? 'btn-gradient text-black dark:text-black' : '',
      variant === 'outline'
        ? 'bg-transparent border border-primary text-primary hover:bg-primary/10 focus:ring-primary dark:ring-offset-gray-900'
        : '',
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      fullWidth ? 'w-full' : '',
      className,
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="mr-2">
      <svg
        class="animate-spin h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </span>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: "button",
  },
  variant: {
    type: String,
    default: "primary",
    validator: (value: string) =>
      ["primary", "secondary", "danger", "gradient", "outline"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  className: {
    type: String,
    default: "",
  },
});

defineEmits(["click"]);
</script>

<style scoped>
/* Styles spécifiques au bouton */
button {
  position: relative;
  overflow: hidden;
}

/* Effet de ripple au clic */
button::after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition:
    transform 0.5s,
    opacity 1s;
}

button:active::after {
  transform: scale(0, 0);
  opacity: 0.3;
  transition: 0s;
}

/* Effet d'élévation au survol */
button:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Mode sombre */
:root.dark button:not(:disabled):hover {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.3),
    0 2px 4px -1px rgba(0, 0, 0, 0.2);
}
</style>
