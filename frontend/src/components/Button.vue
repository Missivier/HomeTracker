<template>
  <button
    :class="[
      'font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300',
      sizeClasses,
      variantClasses,
      fullWidth ? 'w-full' : '',
      className,
      disabled ? 'opacity-70 cursor-not-allowed' : '',
    ]"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <span class="flex items-center justify-center">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value: string) =>
      ["primary", "secondary", "outline", "ghost", "gradient"].includes(value),
  },
  size: {
    type: String,
    default: "md",
    validator: (value: string) => ["sm", "md", "lg"].includes(value),
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  className: {
    type: String,
    default: "",
  },
});

// Classes en fonction de la taille
const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "text-xs px-3 py-1.5";
    case "lg":
      return "text-base px-6 py-3";
    default:
      return "text-sm px-4 py-2";
  }
});

// Classes en fonction de la variante
const variantClasses = computed(() => {
  switch (props.variant) {
    case "primary":
      return "bg-primary text-white hover:bg-primary-dark focus:ring-primary";
    case "secondary":
      return "bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary";
    case "outline":
      return "bg-transparent border border-primary text-primary hover:bg-primary/10 focus:ring-primary";
    case "ghost":
      return "bg-transparent text-primary hover:bg-primary/10 focus:ring-primary";
    case "gradient":
      // Utilisé pour les cas où une classe de gradient est passée via className
      return "text-white";
    default:
      return "bg-primary text-white hover:bg-primary-dark focus:ring-primary";
  }
});
</script>

<style scoped>
/* Animation au survol */
button:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--color-primary-rgb), 0.3);
}

button:not(:disabled):active {
  transform: translateY(0);
}

.gradient-primary {
  background: linear-gradient(
    to right,
    var(--color-primary),
    var(--color-primary-dark)
  );
}
</style>
