<template>
  <ul class="menu-dropdown">
    <template v-for="(item, index) in dropdownItens" :key="index">
      <li v-if="item.type === 'link'">
        <RouterLink :to="item.route" class="dropdown-item">
          <p>{{ item.text }}</p>
          <IconComponent :="item.icon"></IconComponent>
        </RouterLink>
      </li>
      <li v-if="item.type === 'button'">
        <button @click="item.click" class="dropdown-item">
          <p>{{ item.text }}</p>
          <IconComponent :="item.icon"></IconComponent>
        </button>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { useRouter, type RouterLinkProps } from 'vue-router';
import type { Icon } from '../util/IconComponent.vue';
import { mdiFormTextboxPassword, mdiLoginVariant } from '@mdi/js';
import colors from '@/assets/colors.module.css';
import IconComponent from '../util/IconComponent.vue';
import { useRequest } from '@/ts/request';
import { logout } from '@/requests/auth/request';
import { useAppStore } from '@/stores/appStore';

const appStore = useAppStore();
const router = useRouter();

interface DropdownButton {
  type: 'button';
  click: () => void;
}

interface DropdownLink {
  type: 'link';
  route: RouterLinkProps['to'];
}

type MenuDropdownItem = {
  text: string;
  icon: Icon;
} & (DropdownButton | DropdownLink);

const doLogout = async () => {
  const { isFetch, error } = await useRequest(logout(null));

  if (isFetch.value) {
    appStore.$reset();
    router.replace({ name: 'login' });
  }

  if (error.value) {
    console.log(error.value.data.message);
  }
};

const dropdownItens: MenuDropdownItem[] = [
  {
    type: 'link',
    route: { name: 'changePassword' },
    text: 'Alterar Senha',
    icon: {
      path: mdiFormTextboxPassword
    }
  },
  {
    type: 'button',
    click: doLogout,
    text: 'Sair do sistema',
    icon: {
      path: mdiLoginVariant
    }
  }
] as const;
</script>

<style scoped>
.menu-dropdown {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  width: clamp(0px, 100vw, 320px);
  position: absolute;
  background-color: v-bind('colors.light');
  padding: 8px;
  border-radius: 8px;
  border: 1px solid v-bind('colors.lightDarkness');
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.07);
  top: 8px;
  left: calc(100% + 8px);
}

.dropdown-item {
  width: 100%;
  color: v-bind('colors.text');
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-size: 1em;
}

.dropdown-item:hover {
  background-color: v-bind('colors.primary');
  color: #fff;
}
</style>
