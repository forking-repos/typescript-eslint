import type { AST_NODE_TYPES } from '../../ast-node-types';
import type { BaseNode } from '../../base/BaseNode';
import type { ChainElement } from '../../unions/ChainElement';

export interface ChainExpression extends BaseNode {
  expression: ChainElement;
  type: AST_NODE_TYPES.ChainExpression;
}
