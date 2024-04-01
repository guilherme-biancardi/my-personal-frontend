<template>
  <FormContent
    @submit="submit"
    :schema="schema"
    @disable-form="(disable) => (disableButton = disable)"
  >
    <InputComponent v-for="(input, index) in inputs" :key="index" :="input"></InputComponent>

    <ButtonFilledComponent
      text="Alterar Senha"
      type="submit"
      :attributes="{ disabled: disableButton }"
      :style="{
        marginTop: '4px'
      }"
    ></ButtonFilledComponent>
  </FormContent>
</template>

<script setup lang="ts">
import { useInput, type Input } from '@/ts/input';
import FormContent, { type FormSubmit } from '../contents/FormContent.vue';
import InputComponent from '../util/InputComponent.vue';
import { computed, ref, shallowRef } from 'vue';
import ButtonFilledComponent from '../util/ButtonFilledComponent.vue';
import { useRequest } from '@/ts/request';
import { useRouter } from 'vue-router';
import { changePasswordSchema } from './schemas/changePassword';
import { changePassword } from '@/requests/user/request';
import { useAppStore } from '@/stores/appStore';

const appStore = useAppStore();
const router = useRouter();
const schema = changePasswordSchema();

const inputsComputed = computed(() => {
  const currentPassword = useInput('currentPassword', 'password');
  currentPassword.setLabel('Senha atual:');
  currentPassword.setAttributes({
    placeholder: 'Insira sua senha atual',
    autocomplete: 'current-password',
    autofocus: 'true'
  });

  const password = useInput('password', 'password');
  password.setLabel('Senha:');
  password.setAttributes({
    placeholder: 'Insira sua nova senha',
    autocomplete: 'new-password'
  });

  const passwordConfirmation = useInput('passwordConfirmation', 'password');
  passwordConfirmation.setLabel('Confirmação de Senha:');
  passwordConfirmation.setAttributes({
    placeholder: 'Confirme sua nova senha',
    autocomplete: 'new-password'
  });

  return [currentPassword.get(), password.get(), passwordConfirmation.get()];
});

const inputs = ref<Input[]>(inputsComputed.value);
const disableButton = shallowRef<boolean>(false);

const submit: FormSubmit<'currentPassword' | 'password' | 'passwordConfirmation'> = async (
  values
) => {
  const { isFetch, error } = await useRequest(
    changePassword({
      current_password: values.currentPassword,
      password: values.password,
      password_confirmation: values.passwordConfirmation
    })
  );

  if (isFetch.value) {
    router.push({ name: 'app' });
    appStore.setChangePasswordRequired(false);
  }

  if (error.value) {
    console.log(error.value?.data);
  }
};
</script>

<style scoped></style>
