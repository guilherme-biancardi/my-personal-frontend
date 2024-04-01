<template>
  <FormContent
    @submit="submit"
    :schema="schema"
    @disable-form="(disable) => (disableButton = disable)"
  >
    <InputComponent :="input"></InputComponent>

    <ButtonFilledComponent
      text="Enviar e-mail"
      type="submit"
      :attributes="{
        disabled: disableButton
      }"
    ></ButtonFilledComponent>
  </FormContent>
</template>

<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue';
import FormContent, { type FormSubmit } from '../contents/FormContent.vue';
import { useInput, type Input } from '@/ts/input';
import InputComponent from '../util/InputComponent.vue';
import ButtonFilledComponent from '../util/ButtonFilledComponent.vue';
import { useRequest } from '@/ts/request';
import { forgotPassword } from '@/requests/user/request';
import { forgotPasswordSchema } from './schemas/forgotPassword';
import type { SendView } from '@/views';

const schema = forgotPasswordSchema();

const emit = defineEmits<{
  (event: 'send', send: SendView): void;
}>();

const inputComputed = computed(() => {
  const email = useInput('email', 'email');
  email.setLabel('E-mail:');
  email.setAttributes({
    placeholder: 'Insira seu endereço de e-mail',
    autocomplete: 'email',
    autofocus: 'true'
  });

  return email.get();
});

const input = ref<Input>(inputComputed.value);
const disableButton = shallowRef<boolean>(false);

const submit: FormSubmit<'email'> = async (values) => {
  disableButton.value = true;

  const { response } = await useRequest<{ message: string }>(
    forgotPassword({ email: values.email })
  );

  if (response.value) {
    emit('send', response.value);
  }

  disableButton.value = false;
};
</script>

<style scoped></style>
