import { JsonType } from '../types';

export const resolveJsonType = (o: any): JsonType | undefined => {
  switch (typeof o) {
    case 'string':
      return JsonType.String;
    case 'number':
      return JsonType.Number;
    case 'boolean':
      return JsonType.Boolean;
    case 'undefined':
      return JsonType.Undefined;
    case 'object':
      if (o === null) {
        return JsonType.Null;
      }

      if (Array.isArray(o)) {
        return JsonType.Array;
      }

      return JsonType.Object;
    case 'symbol':
    case 'bigint':
    case 'function':
    default:
      break;
  }
};
