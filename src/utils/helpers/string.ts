export function getQueryParam(name: string, str?: string) {
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(str ?? window.location.href);
  if (!results) return undefined;
  if (!results[2]) return undefined;
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function setQueryParam(name: string, value: string | number) {
  const url = new URL(window.document.URL);
  url.searchParams.set(name, value.toString());
  window.history.pushState({}, '', url.toString());
}

export function deleteQueryParam(param: string) {
  const url = new URL(window.document.URL);
  url.searchParams.delete(param.toString());

  window.history.replaceState({}, '', url.toString());
}

export function has(param: string) {
  const url = new URLSearchParams(window.location.search);

  return url.has(param);
}

export function historyGo(to: string, blank?: boolean) {
  const el = document.createElement('a');
  el.href = to;
  el.target = blank ? '_blank' : '';

  el.click();
}
