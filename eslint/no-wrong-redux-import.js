// @ts-check
/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  create(context) {
    return {
      ImportDeclaration(node) {
        if (
          (node.source && node.source.value === '@reduxjs/toolkit/query/') ||
          node.source.value === '@reduxjs/toolkit/query'
        ) {
          context.report({
            fix(fixer) {
              return fixer.replaceText(node.source, "'@reduxjs/toolkit/query/react'")
            },
            message:
              "Import from '@reduxjs/toolkit/query/' is disallowed. Please import from '@reduxjs/toolkit/query/react'.",
            node,
          })
        }
      },
    }
  },
  meta: {
    fixable: 'code',
  },
}
