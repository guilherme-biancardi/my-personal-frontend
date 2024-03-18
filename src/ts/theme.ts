import { useDark, useToggle } from '@vueuse/core';

export const useTheme = () => {
  const isDark = useDark({
    
    selector: 'html',
    attribute: 'theme',
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: 'app-theme',
    initialValue: 'light',
  });

  const toggleDark = useToggle(isDark);

  return {
    isDark,
    toggleDark
  };
};
