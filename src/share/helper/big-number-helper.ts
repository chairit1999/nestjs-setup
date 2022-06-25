import { BigNumber } from 'bignumber.js';

const defaultDecimalLen = 4;

export const plus = (
  num1: number,
  num2: number,
  decimalLen: number = defaultDecimalLen,
): number => {
  const num1BigNumber = new BigNumber(num1);
  const num2BigNumber = new BigNumber(num2);
  return Number(num1BigNumber.plus(num2BigNumber).toFixed(decimalLen));
};

export const minus = (
  num1: number,
  num2: number,
  decimalLen: number = defaultDecimalLen,
): number => {
  const num1BigNumber = new BigNumber(num1);
  const num2BigNumber = new BigNumber(num2);
  return Number(num1BigNumber.minus(num2BigNumber).toFixed(decimalLen));
};

export const multiplied = (
  num1: number,
  num2: number,
  decimalLen: number = defaultDecimalLen,
): number => {
  const num1BigNumber = new BigNumber(num1);
  const num2BigNumber = new BigNumber(num2);
  return Number(num1BigNumber.multipliedBy(num2BigNumber).toFixed(decimalLen));
};

export const divided = (
  num1: number,
  num2: number,
  decimalLen: number = defaultDecimalLen,
): number => {
  const num1BigNumber = new BigNumber(num1);
  const num2BigNumber = new BigNumber(num2);
  return Number(num1BigNumber.dividedBy(num2BigNumber).toFixed(decimalLen));
};
