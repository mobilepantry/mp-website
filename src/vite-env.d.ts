/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SHOPIFY_STOREFRONT_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*&as=picture" {
  const picture: import("vite-imagetools").Picture;
  export default picture;
}
