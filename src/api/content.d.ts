/**
 *
 * */
declare interface BOTTViewButtons {
  label: string;
  icon?: string;
  link: string;
  color?: string;
}
/**
 *
 * */
declare interface BOTTDrawerButtons {
  label: string;
  link: string;
  icon?: string;
  sub?: (val?: any) => BOTTDrawerButtons[];
}
/**
 *
 * */
declare type BOTTLanguage = Record<number | string, { title: string }>;
/**
 *
 * */
declare type BOTTTimezone = Record<number | string, { label: string }>;
/**
 *
 * */
declare type BOTTCurrency = Record<
  number | string,
  { label: string; short: string }
>;
/**
 *
 * */
declare type BOTTBotType = Record<
  number | string,
  { label: string; color: string }
>;
/**
 *
 * */
declare type BOTTUserStatuses = Record<
  number | string,
  { title: string; color: string }
>;
