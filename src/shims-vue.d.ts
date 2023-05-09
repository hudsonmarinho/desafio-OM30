/* eslint-disable */
declare module "vue-the-mask";
declare module "md5";

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
