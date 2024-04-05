<template>
  <FormContent
    @submit="submit"
    :schema="schema"
    @disable-form="(disable) => (disableButton = disable)"
  >
    <InputComponent v-for="(input, index) in inputs" :key="index" :="input"></InputComponent>

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
import { computed, ref, shallowRef } from 'vue';
import InputComponent from '../util/InputComponent.vue';
import FormContent, { type FormSubmit } from '../contents/FormContent.vue';
import ButtonFilledComponent from '../util/ButtonFilledComponent.vue';
import { useRequest } from '@/ts/request';
import type { LoginResponse } from '@/requests/auth/types';
import { authenticate } from '@/requests/auth/request';
import { useAppStore } from '@/stores/appStore';
import { useRouter } from 'vue-router';
import { signInSchema } from './schemas/signIn';

const appStore = useAppStore();
const router = useRouter();
const schema = signInSchema();

const inputsComputed = computed<Input[]>(() => {
  const email = useInput('email', 'email');
  email.setLabel('E-mail:');
  email.setAttributes({
    placeholder: 'Insira seu endereço de e-mail',
    autocomplete: 'email',
    autofocus: 'true'
  });

  const password = useInput('password', 'password');
  password.setLabel('Senha:');
  password.setAttributes({
    placeholder: 'Insira sua senha',
    autocomplete: 'current-password'
  });

  return [email.get(), password.get()];
});

const inputs = ref<Input[]>(inputsComputed.value);
const disableButton = shallowRef<boolean>(false);

const submit: FormSubmit<'email' | 'password'> = async (values) => {
  const { response, error } = await useRequest<LoginResponse>(
    authenticate({
      email: values.email,
      password: values.password
    })
  );

  if (response.value) {
    const { data, message } = response.value;
    appStore.setToken(data.token);

    appStore.notify(message ?? '');
    router.replace({ name: 'app' });
  }

  if (error.value) {
    appStore.notify(error.value.data.message, 'error')
  }
};
</script>

<style scoped></style>
