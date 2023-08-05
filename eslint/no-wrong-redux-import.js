// @ts-check
/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    fixable: 'code',
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        if (
          (node.source && node.source.value === '@reduxjs/toolkit/query/') ||
          node.source.value === '@reduxjs/toolkit/query'
        ) {
          context.report({
            node,
            message:
              "Import from '@reduxjs/toolkit/query/' is disallowed. Please import from '@reduxjs/toolkit/query/react'.",
            fix(fixer) {
              return fixer.replaceText(node.source, "'@reduxjs/toolkit/query/react'")
            },
          })
        }
      },
    }
  },
}
