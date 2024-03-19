export const globalPerforms: Array<string> = [];

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

export function addToGlobalPerforms(name: string) {
  globalPerforms.push(name);
}

export function removeFromGlobalPerforms() {
  globalPerforms.shift();
}
