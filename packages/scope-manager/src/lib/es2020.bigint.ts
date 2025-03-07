// THIS CODE WAS AUTOMATICALLY GENERATED
// DO NOT EDIT THIS CODE BY HAND
// RUN THE FOLLOWING COMMAND FROM THE WORKSPACE ROOT TO REGENERATE:
// npx nx generate-lib repo

import type { ImplicitLibVariableOptions } from '../variable';

import { TYPE, TYPE_VALUE } from './base-config';
import { es2020_intl } from './es2020.intl';

export const es2020_bigint = {
  ...es2020_intl,
  BigInt: TYPE_VALUE,
  BigInt64Array: TYPE_VALUE,
  BigInt64ArrayConstructor: TYPE,
  BigIntConstructor: TYPE,
  BigIntToLocaleStringOptions: TYPE,
  BigUint64Array: TYPE_VALUE,
  BigUint64ArrayConstructor: TYPE,
  DataView: TYPE,
  Intl: TYPE_VALUE,
} as Record<string, ImplicitLibVariableOptions>;
