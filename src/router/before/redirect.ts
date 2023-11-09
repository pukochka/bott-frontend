import { RouteLocationNormalized } from 'vue-router';

export function useRequiredParam(this: string[], to: RouteLocationNormalized) {
  if (this && Array.isArray(this))
    for (const param of this)
      if (!Object.keys(to.query).includes(param)) return '/';
}
