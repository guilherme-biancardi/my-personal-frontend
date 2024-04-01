/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}

declare module '@jamescoyle/vue-icon';
