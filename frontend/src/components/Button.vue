<!-- src/components/Button.vue -->
<template>
  <button
    :class="[
      'px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-75',
      variant === 'primary'
        ? 'bg-primary text-secondary focus:ring-primary'
        : '',
      variant === 'secondary'
        ? 'bg-secondary text-white focus:ring-secondary'
        : '',
      variant === 'outline'
        ? 'border border-primary text-primary hover:bg-primary hover:text-secondary'
        : '',
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90',
      block ? 'w-full' : '',
      className,
    ]"
    :disabled="disabled"
    :type="type as 'button' | 'submit' | 'reset'"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value: string) =>
      ["primary", "secondary", "outline"].includes(value),
  },
  type: {
    type: String,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  block: {
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
