import type BigNumber from "bignumber.js";

export type ANumber = number | string | BigNumber;

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
};
export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];
