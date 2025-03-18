<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="modelValue"
        class="modal-backdrop"
        @click="closeOnBackdrop && $emit('update:modelValue', false)"
      >
        <Transition name="modal-content">
          <div
            v-if="modelValue"
            class="modal-content dark:bg-gray-800 dark:text-white"
            :class="[size, className]"
            @click.stop
          >
            <div class="modal-header dark:border-gray-700">
              <slot name="header">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  {{ title }}
                </h3>
                <button
                  v-if="showClose"
                  class="modal-close dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                  @click="$emit('update:modelValue', false)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </slot>
            </div>

            <div class="modal-body">
              <slot></slot>
            </div>

            <div v-if="$slots.footer" class="modal-footer dark:border-gray-700">
              <slot name="footer">
                <Button
                  variant="secondary"
                  @click="$emit('update:modelValue', false)"
                >
                  Fermer
                </Button>
                <Button variant="primary" @click="$emit('confirm')">
                  Confirmer
                </Button>
              </slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import Button from "./Button.vue";

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "Modal",
  },
  size: {
    type: String,
    default: "md",
    validator: (value: string) =>
      ["sm", "md", "lg", "xl", "full"].includes(value),
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  className: {
    type: String,
    default: "",
  },
});

defineEmits(["update:modelValue", "confirm"]);
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  backdrop-filter: blur(4px);
}

.modal-content {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-height: 90vh;
  overflow-y: auto;
  width: 100%;
}

.modal-content.sm {
  max-width: 24rem;
}
.modal-content.md {
  max-width: 32rem;
}
.modal-content.lg {
  max-width: 48rem;
}
.modal-content.xl {
  max-width: 64rem;
}
.modal-content.full {
  max-width: 90vw;
  height: 90vh;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-close {
  color: #6b7280;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.2s;
}

.modal-close:hover {
  color: #111827;
  background-color: #f3f4f6;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
}

/* Animations */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-content-enter-active,
.modal-content-leave-active {
  transition: all 0.3s ease;
}

.modal-content-enter-from,
.modal-content-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
