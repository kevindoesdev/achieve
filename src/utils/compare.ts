/* eslint-disable no-case-declarations */
import { CompareOptions, IndexOf, JsonType } from '../types';
import { resolveJsonType } from '../utils';

interface InternalCompareOptions extends CompareOptions {
  exitOnDifference?: boolean;
}

/*const validateUndefinedAllowed = (
  jsonTypeA: JsonType | undefined,
  jsonTypeB: JsonType | undefined,
  ignoreUndefined: boolean | JsonType[],
): boolean => {
  if (jsonTypeA === undefined || jsonTypeB === undefined) {
    return false;
  }

  if (jsonTypeA !== JsonType.Undefined && jsonTypeB !== JsonType.Undefined) {
    return true;
  }

  if (jsonTypeA === jsonTypeB) {
    return true;
  }

  if (typeof ignoreUndefined === 'boolean') {
    return ignoreUndefined;
  }

  const definedType = jsonTypeA === JsonType.Undefined ? jsonTypeB : jsonTypeA;

  return ignoreUndefined.includes(definedType);
};*/

/*const intersect = (aKeys: string[], bKeys: string[]) => {
  const same: string[] = [];

  aKeys.forEach(key => {
    if (bKeys.includes(key)) {
      same.push(key);
    }
  });

  return same;
};

const distinct = (from: string[], within: string[]) => {
  const distinct: string[] = [];

  from.forEach(key => {
    if (!within.includes(key)) {
      distinct.push(key);
    }
  });

  return distinct;
};*/
const collectAllKeys = (...keySets: string[][]) => {
  return Object.keys(
    keySets.flat().reduce((obj, key) => {
      obj[key] = true;
      return obj;
    }, {} as IndexOf<boolean>),
  ).sort();
};

const compareInternal = (
  A: any,
  B: any,
  {
    exitOnDifference = false,
    emptyStringEqualsUndefined = false,
  }: InternalCompareOptions,
) => {
  const differences: string[] = [];
  const OK = false;
  const DIFFERENCES = true;

  const walk = (A: any, B: any, parent: string): boolean => {
    const jsonTypeA = resolveJsonType(A);
    const jsonTypeB = resolveJsonType(B);
    let RESULT = OK;

    // check that we can resolve both object types
    if (jsonTypeA === undefined || jsonTypeB === undefined) {
      if (jsonTypeB === undefined) {
        differences.push(
          `Cannot parse ${parent} as ${typeof A} is unsupported`,
        );
      }

      if (jsonTypeB === undefined) {
        differences.push(
          `Cannot parse ${parent} as ${typeof A} is unsupported`,
        );
      }

      RESULT = DIFFERENCES;
      if (exitOnDifference) {
        return RESULT;
      }
    }

    // check that we can resolve both object types
    if (jsonTypeA !== jsonTypeB) {
      if (
        emptyStringEqualsUndefined &&
        [jsonTypeA, jsonTypeB].includes(JsonType.String) &&
        [jsonTypeA, jsonTypeB].includes(JsonType.Undefined) &&
        (A === '' || B === '')
      ) {
        return RESULT;
      }

      differences.push(
        `${parent} properties are different types (${jsonTypeA} vs ${jsonTypeB}})`,
      );

      RESULT = DIFFERENCES;
      if (exitOnDifference) {
        return RESULT;
      }
    }

    switch (jsonTypeA) {
      case JsonType.Boolean:
      case JsonType.Number:
      case JsonType.String:
      case JsonType.Null:
      case JsonType.Undefined:
        if (A !== B) {
          differences.push(
            `${parent} properties are different types (${jsonTypeA} vs ${jsonTypeB})`,
          );

          RESULT = DIFFERENCES;
          if (exitOnDifference) {
            return RESULT;
          }
        }
        break;

      case JsonType.Object:
        const allKeys = collectAllKeys(Object.keys(A), Object.keys(B));

        for (const key of allKeys) {
          const result = walk(
            A[key],
            B[key],
            `${parent}${parent ? '.' : ''}${key}`,
          );

          if (result === DIFFERENCES) {
            RESULT = DIFFERENCES;

            if (exitOnDifference) {
              return RESULT;
            }
          }
        }

        break;

      case JsonType.Array:
        const len = Math.max(A.length, B.length);

        for (let i = 0; i < len; i++) {
          const result = walk(A[i], B[i], `${parent}[${i}]`);

          if (result === DIFFERENCES) {
            RESULT = DIFFERENCES;

            if (exitOnDifference) {
              return RESULT;
            }
          }
        }

        break;

      default:
        throw new Error(`Unhandled JsonType ${jsonTypeA}`);
    }

    return RESULT;
  };

  walk(A, B, '');

  return differences;
};

export const compare = (A: any, B: any, options: CompareOptions = {}) => {
  return compareInternal(A, B, options);
};

export const same = (A: any, B: any, options: CompareOptions = {}): boolean => {
  return (
    compareInternal(A, B, { exitOnDifference: true, ...options }).length === 0
  );
};

export const different = (
  A: any,
  B: any,
  options: CompareOptions = {},
): boolean => {
  return (
    compareInternal(A, B, { exitOnDifference: true, ...options }).length > 0
  );
};
