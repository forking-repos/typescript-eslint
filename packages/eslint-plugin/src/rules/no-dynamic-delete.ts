import type { TSESLint, TSESTree } from '@typescript-eslint/utils';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';

import { createRule, nullThrows, NullThrowsReasons } from '../util';

export default createRule({
  name: 'no-dynamic-delete',
  meta: {
    docs: {
      description:
        'Disallow using the `delete` operator on computed key expressions',
      recommended: 'strict',
    },
    fixable: 'code',
    messages: {
      dynamicDelete: 'Do not delete dynamically computed property keys.',
    },
    schema: [],
    type: 'suggestion',
  },
  defaultOptions: [],
  create(context) {
    function createFixer(
      member: TSESTree.MemberExpression,
    ): TSESLint.ReportFixFunction | undefined {
      if (
        member.property.type === AST_NODE_TYPES.Literal &&
        typeof member.property.value === 'string'
      ) {
        return createPropertyReplacement(
          member.property,
          `.${member.property.value}`,
        );
      }

      return undefined;
    }

    return {
      'UnaryExpression[operator=delete]'(node: TSESTree.UnaryExpression): void {
        if (
          node.argument.type !== AST_NODE_TYPES.MemberExpression ||
          !node.argument.computed ||
          isAcceptableIndexExpression(node.argument.property)
        ) {
          return;
        }

        context.report({
          fix: createFixer(node.argument),
          messageId: 'dynamicDelete',
          node: node.argument.property,
        });
      },
    };

    function createPropertyReplacement(
      property: TSESTree.Expression,
      replacement: string,
    ) {
      return (fixer: TSESLint.RuleFixer): TSESLint.RuleFix =>
        fixer.replaceTextRange(getTokenRange(property), replacement);
    }

    function getTokenRange(property: TSESTree.Expression): [number, number] {
      return [
        nullThrows(
          context.sourceCode.getTokenBefore(property),
          NullThrowsReasons.MissingToken('token before', 'property'),
        ).range[0],
        nullThrows(
          context.sourceCode.getTokenAfter(property),
          NullThrowsReasons.MissingToken('token after', 'property'),
        ).range[1],
      ];
    }
  },
});

function isAcceptableIndexExpression(property: TSESTree.Expression): boolean {
  return (
    (property.type === AST_NODE_TYPES.Literal &&
      ['string', 'number'].includes(typeof property.value)) ||
    (property.type === AST_NODE_TYPES.UnaryExpression &&
      property.operator === '-' &&
      property.argument.type === AST_NODE_TYPES.Literal &&
      typeof property.argument.value === 'number')
  );
}
