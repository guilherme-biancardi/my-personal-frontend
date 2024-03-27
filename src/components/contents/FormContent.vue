<template>
  <Form
    :style="{ gap: `${gap}px` }"
    :validation-schema="schema"
    @invalid-submit="invalid()"
    v-slot="{ meta, isSubmitting }"
  >
    <slot></slot>

    {{ emit('disableForm', !meta.valid || isSubmitting) }}
  </Form>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate';

export type FormSubmit<T extends string> = (values: Record<T, string>) => void;

const emit = defineEmits<{
  (event: 'disableForm', disable: boolean): void;
}>();

interface FormContent {
  gap?: number;
  schema?: object;
}

withDefaults(defineProps<FormContent>(), {
  gap: 20
});

const invalid = () => alert('preencha os campos corretamente');
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 550px;
}
</style>
