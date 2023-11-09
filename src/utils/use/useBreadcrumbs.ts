import { RouteLocationNormalized } from 'vue-router';
import { routes } from '../../router';
import { useGlobalStore } from 'stores/data/globalStore';

export function useBreadcrumbs(to: RouteLocationNormalized) {
  const data = useGlobalStore();

  data.breadcrumbs = {};

  const routeMap = to.path.split('/').slice(1, to.path.length);

  if (routeMap.length === 1) return;

  let link = '';

  routeMap.forEach((route: string) => {
    link += '/' + route;

    const index =
      routes[1].children
        ?.map((item) => item?.children?.[0].path)
        .indexOf(link) ?? 0;

    const breadcrumb = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      label: routes[1].children?.[index]?.props?.title ?? '',
      link: link,
    };

    data.breadcrumbs[breadcrumb.link] = breadcrumb.label;
  });
}
