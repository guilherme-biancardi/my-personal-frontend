import { shallowRef } from 'vue';

export const useModal = () => {
  const active = shallowRef<boolean>(false);

  const showModal = () => (active.value = true);
  const closeModal = () => (active.value = false);

  return {
    showModal,
    closeModal,
    active
  };
};
