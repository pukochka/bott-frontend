export function compareUp(this: any): any {
  return (a: any, b: any) => Number(a[this]) - Number(b[this]);
}

export function compareDown(this: any): any {
  return (a: any, b: any) => Number(b[this]) - Number(a[this]);
}

export function compareNone() {
  return () => {
    return;
  };
}
