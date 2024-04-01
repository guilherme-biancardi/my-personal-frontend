import type { Icon } from '@/components/util/IconComponent.vue';
import type { ButtonHTMLAttributes, StyleValue } from 'vue';

export interface Button {
  text?: string;
  type?: ButtonHTMLAttributes['type'];
  attributes?: ButtonHTMLAttributes;
  hover?: {
    backgroundColor: string;
    color: string;
  };
  style?: StyleValue;
  icon?: Icon;
  invertIcon?: boolean;
  visible?: boolean;
}

type ButtonKeys = keyof Button;

export const useButton = (type: Button['type'] = 'button', text = '') => {
  const button: Map<ButtonKeys, Button[ButtonKeys]> = new Map();

  button.set('text', text);
  button.set('type', type);
  button.set('visible', true);

  const setAttributes = (attrs: Button['attributes']) => button.set('attributes', attrs);
  const setIcon = (icon: Button['icon']) => button.set('icon', icon);
  const setHover = (hover: Button['hover']) => button.set('hover', hover);
  const setStyle = (style: Button['style']) => button.set('style', style);
  const setVisible = (visible: boolean) => button.set('visible', visible);

  const invertIcon = () => button.set('invertIcon', true);

  return {
    setHover,
    setAttributes,
    setStyle,
    setIcon,
    invertIcon,
    setVisible,
    get: () => Object.fromEntries(button) as unknown as Button
  };
};
