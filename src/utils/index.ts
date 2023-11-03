import { Idable, IndexOf } from '../types';
export { resolveJsonType } from './jsonType';
export { modifyRGBA } from './rgba';
export { same, different, compare } from './compare';
export { delayedDispatch } from './delayedDispatch';

export const toIndexOf = <T extends Idable>(items: T[]): IndexOf<T> => {
  const result: IndexOf<T> = {};
  items.forEach(item => {
    result[item.id] = item;
  });
  return result;
};

export const notEmpty = <TValue>(
  value: TValue | null | undefined,
): value is TValue => value !== null && value !== undefined;
