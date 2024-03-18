<template>
  <div class="sign-in-content">
    <SignInForm></SignInForm>
    <hr />
    <span
      >Não recebeu o código de ativação?
      <RouterLink class="base-link" :to="{ name: 'resendActivationLink' }"
        >Clique Aqui</RouterLink
      ></span
    >
  </div>
</template>

<script setup lang="ts">
import colors from '@/assets/colors.module.css';
import SignInForm from '@/components/forms/SignInForm.vue';
</script>

<style scoped>
.sign-in-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  row-gap: 40px;
}

hr {
  border: 0;
  width: 50%;
  height: 1px;
  background-color: v-bind('colors.grayLight');
}

span{
  font-weight: 600;
}
</style>
