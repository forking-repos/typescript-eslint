import type { TSESTree } from '@typescript-eslint/utils';

import { createRule } from '../util';

/*
We have `allowSyntheticDefaultImports` turned on in this project, so there are two problems that arise:
- TypeScript's auto import will suggest `import ts = require('typescript');` if you type `ts`
- VSCode's suggestion feature will suggest changing `import * as ts from 'typescript'` to `import ts from 'typescript'`

In order to keep compatibility with a wide range of consumers, some of whom don't use `allowSyntheticDefaultImports`, we should
always use either:
- `import * as ts from 'typescript';`
- `import { SyntaxKind } from 'typescript';`
*/

export default createRule({
  name: 'no-typescript-default-import',
  meta: {
    type: 'problem',
    docs: {
      description:
        "Enforce that packages rules don't do `import ts from 'typescript';`",
    },
    fixable: 'code',
    messages: {
      noTSDefaultImport: [
        "Do not use the default import for typescript. Doing so will cause the package's type definitions to do the same.",
        "This causes errors for consumers if they don't use the allowSyntheticDefaultImports compiler option.",
      ].join('\n'),
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    if (context.filename.endsWith('mts')) {
      // mts files will import "properly" and so default import is correct
      return {};
    }

    return {
      'ImportDeclaration > ImportDefaultSpecifier'(
        node: TSESTree.ImportDefaultSpecifier,
      ): void {
        const importStatement = node.parent;
        if (importStatement.source.value === 'typescript') {
          context.report({
            node,
            messageId: 'noTSDefaultImport',
            fix(fixer) {
              if (importStatement.specifiers.length === 1) {
                return fixer.replaceText(node, '* as ts');
              }

              return null;
            },
          });
        }
      },
      'TSImportEqualsDeclaration > TSExternalModuleReference'(
        node: TSESTree.TSExternalModuleReference,
      ): void {
        const parent = node.parent as TSESTree.TSImportEqualsDeclaration;
        if (node.expression.value === 'typescript') {
          context.report({
            node,
            messageId: 'noTSDefaultImport',
            fix(fixer) {
              return fixer.replaceText(
                parent,
                "import * as ts from 'typescript';",
              );
            },
          });
        }
      },
    };
  },
});
