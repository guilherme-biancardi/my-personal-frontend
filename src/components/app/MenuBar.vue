<template>
  <nav>
    <button
      class="button-dropdown"
      @click="toggleDropdown()"
      @focusout="dropdownVisibility = false"
    >
      <IconComponent :path="mdiDotsGrid" :size="30"></IconComponent>
    </button>
    <Transition name="slide-x-left">
      <MenuDropdown v-if="dropdownVisibility"></MenuDropdown>
    </Transition>
    <hr />
    <ul class="menu-list">
      <li v-for="(item, index) in menuItems" :key="index" :title="item.text">
        <RouterLink :to="item.route" active-class="link-active" class="link">
          <IconComponent :path="item.icon.path" :size="item.icon.size"></IconComponent>
        </RouterLink>
      </li>
    </ul>
    <hr />
    <button title="Alterar tema" @click="toggleDark()" class="button-theme">
      <IconComponent :path="isDark ? mdiWeatherSunny : mdiWeatherNight" :size="28"></IconComponent>
    </button>
  </nav>
</template>

<script setup lang="ts">
import type { RouterLinkProps } from 'vue-router';
import type { Icon } from '../util/IconComponent.vue';
import { mdiAccount, mdiDotsGrid, mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';
import IconComponent from '../util/IconComponent.vue';
import { shallowRef } from 'vue';
import { useToggle } from '@vueuse/core';
import MenuDropdown from './MenuDropdown.vue';
import { useTheme } from '@/ts/theme';
import { useColors } from '@/ts/colors';

const { isDark, toggleDark } = useTheme();
const colors = useColors();

interface MenuItem {
  text: string;
  route: RouterLinkProps['to'];
  icon: Icon;
}

const menuItems: MenuItem[] = [
  {
    text: 'Clientes',
    route: {
      name: 'clients'
    },
    icon: {
      path: mdiAccount,
      size: 32
    }
  }
] as const;

const dropdownVisibility = shallowRef<boolean>(false);
const toggleDropdown = useToggle(dropdownVisibility);
</script>

<style scoped>
nav {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 16px;
  width: 100%;
  height: 100%;
  background-color: v-bind('colors.light');
  border-right: 1px solid v-bind('colors.lightDarkness');
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.07);
  padding: 12px 8px;
  z-index: 1;
}

.button-dropdown {
  padding: 8px 0;
  display: grid;
  place-items: center;
  margin-bottom: -8px;
  transition: all 0.2s ease;
}

.button-dropdown:hover {
  color: v-bind('colors.primary');
}

hr {
  width: 100%;
  border: 0;
  height: 2px;
  background-color: v-bind('colors.lightDarkness');
}

.menu-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 8px;
}

.menu-list li {
  width: 100%;
}

.link {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  padding: 8px 0;
  border-radius: 8px;
  color: v-bind('colors.primary');
}

.link-active {
  background-color: v-bind('colors.primary');
  color: #fff;
}

.button-theme {
  width: 100%;
  transition: all 0.2s ease;
}

.button-theme:hover {
  color: v-bind('colors.primary');
}
</style>
