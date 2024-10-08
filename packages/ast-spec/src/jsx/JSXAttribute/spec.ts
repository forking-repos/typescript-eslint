import type { AST_NODE_TYPES } from '../../ast-node-types';
import type { BaseNode } from '../../base/BaseNode';
import type { JSXElement } from '../../expression/JSXElement/spec';
import type { JSXExpression } from '../../unions/JSXExpression';
import type { Literal } from '../../unions/Literal';
import type { JSXIdentifier } from '../JSXIdentifier/spec';
import type { JSXNamespacedName } from '../JSXNamespacedName/spec';

export interface JSXAttribute extends BaseNode {
  name: JSXIdentifier | JSXNamespacedName;
  type: AST_NODE_TYPES.JSXAttribute;
  value: JSXElement | JSXExpression | Literal | null;
}
