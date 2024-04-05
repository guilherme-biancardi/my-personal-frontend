<template>
  <section class="login-content">
    <article>
      <header class="login-header">
        <LogoComponent></LogoComponent>

        <button title="Alterar tema" @click="toggleDark()">
          <IconComponent
            :path="isDark ? mdiWeatherSunny : mdiWeatherNight"
            :size="28"
          ></IconComponent>
        </button>
      </header>
      <div class="login-view">
        <RouterView name="login" v-slot="{ Component }">
          <Transition name="slide-x" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </article>

    <article class="login-image" v-if="isLargeScreen">
      <span>
        <h1>Inicie sua jornada fitness!</h1>
        <p>Acesse para treinar com seu personal</p>
      </span>

      <PersonalTrainerSvg
        :styles="{ maxWidth: 700, width: '100%', height: '100%' }"
      ></PersonalTrainerSvg>
    </article>
  </section>
</template>

<script setup lang="ts">
import PersonalTrainerSvg from '@/components/svg/PersonalTrainerSvg.vue';
import IconComponent from '@/components/util/IconComponent.vue';
import LogoComponent from '@/components/util/LogoComponent.vue';
import { useColors } from '@/ts/colors';
import { useTheme } from '@/ts/theme';
import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';
import { useMediaQuery } from '@vueuse/core';

const colors = useColors();
const { toggleDark, isDark } = useTheme();
const isLargeScreen = useMediaQuery('(min-width: 1024px)');
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
  flex-grow: 1;
  width: 100%;
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

@media screen and (max-width: 1023px) {
  .login-content {
    grid-template-columns: 1fr;
  }
}
</style>
