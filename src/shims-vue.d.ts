/* eslint-disable */

/// <reference types="vite/client" />

// Mocks all files ending in `.vue` showing them as plain Vue instances
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// declare module 'vue-router' {
//   interface Route {
//     meta: {
//       title: string;
//       component?: any;
//       child?: any;
//       drawer?: string;
//       toc?: { title: string; buttons: (val?: any) => BottViewButtons[] }[];
//     };
//   }
// }
