export const handlerUpdate = (callback: () => void, handle?: string) => {
  return {
    set(target: any, key: any) {
      if (key === handle) callback();
      // eslint-disable-next-line prefer-rest-params,@typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line prefer-rest-params
      return Reflect.set(...arguments);
    },
  };
};
