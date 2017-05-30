/**
 * @fileoverview checking css in js
 * @author andrww smith
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'checking css in js',
      category: 'css-in-js',
      recommended: false,
    },
    fixable: 'code',
    schema: [],
  },

  create: function(context) {
    const { validator, validate, transformNodeProperty } = require('../validator')

    return {
      ObjectExpression(node) {
        if (node.parent.type === 'CallExpression') {
          if (node.parent.callee.object.name === 'glamorous') {
            node.properties.forEach(property => {
              const { key, value } = transformNodeProperty(property)
              const validated = validate({ key, value })

              if (typeof validated === 'object') {
                context.report({
                  node: property,
                  message: validated.message,
                })
              }
            })
          }
        }
      },

      MemberExpression(node) {
        const { object: { name } } = node
        if (name === 'glamorous') {
        }
      },
    }
  },
}
