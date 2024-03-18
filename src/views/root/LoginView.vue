<template>
  <section class="login-content">
    <article>
      <header class="login-header">
        <RouterLink to="/">
          <h1>MyPersonal</h1>
        </RouterLink>

        <button title="Alterar tema" @click="theme.toggleDark()">
          <IconComponent
            :path="theme.isDark ? mdiWeatherSunny : mdiWeatherNight"
            :size="28"
          ></IconComponent>
        </button>
      </header>
      <RouterView name="login" class="login-view"></RouterView>
    </article>

    <article class="login-image">
      <span>
        <h1>Inicie sua jornada fitness!</h1>
        <p>Acesse para treinar com seu personal</p>
      </span>

      <PersonalTrainerSvg :styles="{ maxWidth: 700, width: '100%' }"></PersonalTrainerSvg>
    </article>
  </section>
</template>

<script setup lang="ts">
import colors from '@/assets/colors.module.css';
import PersonalTrainerSvg from '@/components/svg/PersonalTrainerSvg.vue';
import IconComponent from '@/components/util/IconComponent.vue';
import { useTheme } from '@/ts/theme';
import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';

const theme = useTheme();
</script>

<style scoped>
.login-content {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  place-items: center;
  background-color: v-bind('colors.light');
}

article {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 24px 28px;
}

.login-view {
  display: grid;
  place-items: center;
  flex-grow: 1;
  height: 100%;
}

.login-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.login-header button {
  transition: all 0.2s ease;
  color: v-bind('colors.text');
}

.login-header button:hover {
  color: v-bind('colors.primary');
}

.login-header h1 {
  font-style: italic;
  font-weight: 900;
  font-size: 1.8em;
  color: v-bind('colors.primary');
}

.login-image {
  border-left: 1px solid v-bind('colors.grayLight');
}

.login-image span {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-image span h1 {
  font-size: 2.1em;
  font-weight: 800;
  color: v-bind('colors.primary');
}

.login-image span p {
  font-size: 1.2em;
  font-weight: 600;
}
</style>
