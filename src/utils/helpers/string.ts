export function getQueryParam(name: string, str?: string) {
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(str ?? window.location.href);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function has(param: string) {
  const url = new URLSearchParams(window.document.URL);

  return url.has(param);
}
