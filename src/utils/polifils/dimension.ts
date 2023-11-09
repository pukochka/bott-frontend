export {};

Number.prototype.dimension = function () {
  if (!+this) return '0 Байт';
  const k = 1024;
  const sizes = ['Байт', 'Кб', 'Мб', 'Гб'];

  const i = Math.floor(Math.log(Number(this)) / Math.log(k));

  return `${parseFloat((Number(this) / Math.pow(k, i)).toFixed(2))} ${
    sizes[i]
  }`;
};
