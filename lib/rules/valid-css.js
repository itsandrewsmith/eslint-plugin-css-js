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
        const { validator, validate, mapRulesToKey, transformNodeProperty } = require('../validator')
        const rules = {
            width: 'max-width',
            height: 'max-height',
        }

        const mapRules = mapRulesToKey({ rules })
        const plugins = [mapRules, validate]
        const validatorFunction = validator({ plugins })

        return {
            ObjectExpression(node) {
                if (node.parent.type === 'CallExpression') {
                    if (node.parent.callee.object.name === 'glamorous') {
                        node.properties.forEach(property => {
                            const { key, value } = transformNodeProperty(property)
                            const validated = validatorFunction({ key, value })

                            if (validated.isValid === true) {
                                return true
                            }

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

            VariableDeclarator(node) {
                if (node.init.type == 'ObjectExpression') {
                    const variableName = node.id.name
                    if (variableName === 'style' || variableName === 'styles') {
                        node.init.properties.map(property => {
                            const { key, value } = transformNodeProperty(property)

                            const validated = validate({ key, value })

                            if (typeof validated === 'object') {
                                context.report({
                                    node: property,
                                    message: validated.message
                                })
                            }
                        })
                    }
                }
            }


        }
    },
}