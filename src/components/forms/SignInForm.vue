<template>
  <FormContent @submit.prevent="submit">
    <InputComponent
      v-for="(input, index) in inputs"
      :key="index"
      :="input"
      v-model="input.value"
    ></InputComponent>

    <RouterLink class="base-link" :to="{ name: 'forgotPassword' }">Esqueceu sua senha?</RouterLink>

    <ButtonFilledComponent
      text="Entrar"
      type="submit"
      :attributes="{
        title: 'Acessar o sitema'
      }"
      :style="{
        marginTop: '4px'
      }"
    ></ButtonFilledComponent>
  </FormContent>
</template>

<script setup lang="ts">
import { useInput, type Input } from '@/ts/input';
import { computed, ref } from 'vue';
import InputComponent from '../util/InputComponent.vue';
import FormContent from '../contents/FormContent.vue';
import ButtonFilledComponent from '../util/ButtonFilledComponent.vue';

const inputsComputed = computed<Input[]>(() => {
  const email = useInput('email', 'email');
  email.setLabel('E-mail:');
  email.setAttributes({
    placeholder: 'Insira seu endereço de e-mail'
  });

  const password = useInput('password', 'password');
  password.setLabel('Senha:');
  password.setAttributes({
    placeholder: 'Insira sua senha'
  });

  return [email.get(), password.get()];
});

const inputs = ref<Input[]>(inputsComputed.value);

const submit = () => {
  alert('form');
};
</script>

<style scoped></style>
