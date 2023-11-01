import { Idable, IndexOf, RGBAModifier, RGBAPropertyModifier } from './types';

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

const rgbaMatcher = /^rgba\(([0-9.]+), ([0-9.]+), ([0-9.]+), ([0-9.]+)\)$/;
export const modifyRGBA = (
  original: string,
  { r, g, b, a }: RGBAModifier,
): string => {
  if (!rgbaMatcher.test(original)) {
    return original;
  }

  const applyModifier = (
    original: string,
    modifier: RGBAPropertyModifier | undefined,
  ) => {
    if (modifier == null) {
      return original;
    }

    if (typeof modifier === 'number') {
      return modifier;
    }

    const num = parseFloat(original);
    return modifier(num);
  };

  return original.replace(rgbaMatcher, (_, _r, _g, _b, _a) => {
    return [
      'rgba(',
      applyModifier(_r, r),
      ', ',
      applyModifier(_g, g),
      ', ',
      applyModifier(_b, b),
      ', ',
      applyModifier(_a, a),
      ')',
    ].join('');
  });
};
