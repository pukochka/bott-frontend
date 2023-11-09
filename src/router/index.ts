import { route } from 'quasar/wrappers';

import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router';

import components from '../pages/listing';
import { useBreadcrumbs } from '../utils/use/useBreadcrumbs';

const mapped = Object.keys(components).map(async (key) => {
  const parts = key.substring(1, key.length - 4).split('/');

  const len = parts.length;
  const path = parts.slice(0, len - 1);

  const acc = path.join('/');
  const propsPath = `../pages${acc}/${parts[len - 2]}.ts`;

  let props;
  /* @vite-ignore */
  await import(`${propsPath}`).then((r) => (props = r.default));

  return {
    path: '',
    props: props,
    component: () => import('layouts/BottPage.vue'),
    children: [{ component: components[key], path: acc }],
  };
});

export const routes: RouteRecordRaw[] = [
  {
    path: '/:catchAll(.*)*',
    component: () => import('layouts/ErrorNotFound.vue'),
  },
  /**
   * Невкоем случае не убирать
   * */
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [],
  },
];

export default route(async function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  await Promise.all(mapped).then((result) => (routes[1].children = result));

  const router = createRouter({
    scrollBehavior: (to, _, savedPosition) =>
      to.hash.length > 1 ? false : savedPosition || { left: 0, top: 0 },
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  router.beforeEach(useBreadcrumbs);

  return router;
});
