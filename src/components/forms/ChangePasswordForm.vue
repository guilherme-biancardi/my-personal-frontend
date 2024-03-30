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
import { resetPassword } from '@/requests/auth/request';
import { useRoute } from 'vue-router';

const route = useRoute();
const schema = changePasswordSchema();

interface RouteParams {
  token?: string;
}

const params = computed<RouteParams>(() => route.params as RouteParams);

const emit = defineEmits<{
  (event: 'setSend', isSend: boolean): void;
}>();

const inputsComputed = computed(() => {
  const email = useInput('email', 'email');
  email.setLabel('E-mail:');
  email.setAttributes({
    placeholder: 'Insira seu e-mail',
    autocomplete: 'email',
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

  return [email.get(), password.get(), passwordConfirmation.get()];
});

const inputs = ref<Input[]>(inputsComputed.value);
const disableButton = shallowRef<boolean>(false);

const submit: FormSubmit<'email' | 'password' | 'passwordConfirmation'> = async (values) => {
  if (params.value.token) {
    const { isFetch, error } = await useRequest(
      resetPassword({
        email: values.email,
        password: values.password,
        password_confirmation: values.passwordConfirmation,
        token: params.value.token
      })
    );

    emit('setSend', isFetch.value);

    if (error.value) {
      console.log(error.value?.data);
    }
  }
};
</script>

<style scoped></style>
