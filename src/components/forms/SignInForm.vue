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
import { useRequest } from '@/ts/request';
import type { LoginResponse } from '@/requests/auth/types';
import { authenticate } from '@/requests/auth/request';
import { useAppStore } from '@/stores/appStore';
import { useRouter } from 'vue-router';

const appStore = useAppStore();
const router = useRouter();

const inputsComputed = computed<Input[]>(() => {
  const email = useInput('email', 'email');
  email.setLabel('E-mail:');
  email.setAttributes({
    placeholder: 'Insira seu endereço de e-mail',
    required: true,
    autocomplete: 'email'
  });

  const password = useInput('password', 'password');
  password.setLabel('Senha:');
  password.setAttributes({
    placeholder: 'Insira sua senha',
    required: true,
    autocomplete: 'current-password'
  });

  return [email.get(), password.get()];
});

const inputs = ref<Input[]>(inputsComputed.value);

const submit = async () => {
  const [email, password] = inputs.value;

  const { response, error } = await useRequest<LoginResponse>(
    authenticate({
      email: email.value as string,
      password: password.value as string
    })
  );

  if (response.value) {
    const { data, message } = response.value;
    appStore.setToken(data.token);

    console.log(message);
    router.replace({ name: 'app' });
  }

  if (error.value) {
    console.log('E-mail e/ou senha inválidos');
  }
};
</script>

<style scoped></style>
