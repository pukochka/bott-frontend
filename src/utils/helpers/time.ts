const text = {
  s: ['секунду', 'секунды', 'секунд'],
  m: ['минуту', 'минуты', 'минут'],
  h: ['час', 'часа', 'часов'],
  d: ['день', 'дня', 'дней'],
  y: ['год', 'года', 'лет'],
};

const full = {
  s: ['секунду', 'секунды', 'секунд'],
  m: ['минуту', 'минуты', 'минут'],
  h: ['час', 'часа', 'часов'],
  d: ['день', 'дня', 'дней'],
  y: ['год', 'года', 'лет'],
};

const triple = { s: 'сек', m: 'мин', h: 'час', d: 'дн', y: 'год' };

const single = { s: 'с', m: 'м', h: 'ч', d: 'д', y: 'г' };

const timeSchema = { full, triple, single };

function destruction(value: number, numbers: Array<number>, pre: number) {
  const [start, center, end] = numbers.map(
    (item) => ((value - item) >>> 1) % pre === 0
  );

  return end || (start && center) || (center && end);
}

function getText(name: KeySchema, value: string | number) {
  value = Number(value);

  if (!Object.keys(text).includes(name) || isNaN(value)) return '';

  const [names, parents, other] = text[name];

  const condition =
    !destruction(value, [11, 12, 13], 50) &&
    value % 10 !== 0 &&
    (value > 20 || value < 10);

  if (condition) {
    if ((value >>> 1) % 5 === 0 && value !== 0) return names;

    if (destruction(value, [1, 2, 3], 5)) return parents;
  }

  return other;
}

export function getFormattedTime(
  time: string | number,
  formatted?: boolean,
  schema?: TimeSchema
) {
  time = Number(time);
  if (time === void 0 || isNaN(time)) return '';

  const full = [
    time % 60, // секунды
    Math.floor(time / 60) % 60, // минуты
    Math.floor(time / (60 * 60)) % 24, // часы
    Math.floor(time / (60 * 60 * 24)) % 365, // дни
    Math.floor(time / (60 * 60 * 24 * 365)), // года
  ];

  const condition = schema !== 'full' && schema !== void 0;

  const map = Object.keys(text).map((txt, index) =>
    full[index] !== 0
      ? full[index] +
        ' ' +
        (condition
          ? timeSchema[schema][<KeySchema>txt]
          : getText(<KeySchema>txt, full[index]))
      : false
  );

  return formatted ? map.reverse().filter(Boolean).join(' ') : map;
}

type KeySchema = keyof typeof full;
type TimeSchema = keyof typeof timeSchema;
