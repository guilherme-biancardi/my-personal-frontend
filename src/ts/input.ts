import type { MaskInputOptions } from 'maska';
import type { InputHTMLAttributes } from 'vue';

type InputHTMLTypeAttribute =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

export interface Input {
  name: string;
  type: InputHTMLTypeAttribute;
  attributes?: InputHTMLAttributes;
  mask?: string;
  maskOptions?: MaskInputOptions;
  maskTokens?: string;
  label?: string;
  value?: string;
}

type InputKeys = keyof Input;

export type InputMap = Map<InputKeys, Input[InputKeys]>;

export const useInput = (name: string, type: Input['type'] = 'text', value = '') => {
  const input: InputMap = new Map();

  input.set('name', name);
  input.set('type', type);
  input.set('value', value);

  const setAttributes = (attrs: Input['attributes']) => input.set('attributes', attrs);
  const setMask = (mask: string) => input.set('mask', mask);
  const setMaskOptions = (options: Input['maskOptions']) => input.set('maskOptions', options);
  const setMaskTokens = (tokens: Input['maskTokens']) => input.set('maskTokens', tokens);
  const setLabel = (label: string) => input.set('label', label);

  return {
    setAttributes,
    setMask,
    setMaskOptions,
    setMaskTokens,
    setLabel,
    get: () => Object.fromEntries(input) as unknown as Input
  };
};
