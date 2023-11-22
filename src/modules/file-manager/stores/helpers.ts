export function compareUp(this: any): any {
  return (a: any, b: any) => Number(a[this]) - Number(b[this]);
}

export function compareDown(this: any): any {
  return (a: any, b: any) => Number(b[this]) - Number(a[this]);
}

export function compareUpDate(this: any): any {
  return (a: any, b: any) => Date.parse(a[this]) - Date.parse(b[this]);
}

export function compareDownDate(this: any): any {
  return (a: any, b: any) => Date.parse(a[this]) + Date.parse(b[this]);
}

export function compareNone() {
  return () => {
    return;
  };
}
