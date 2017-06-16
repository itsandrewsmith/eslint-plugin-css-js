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
        schema: [

            {
                "type": "object",
                "properties": {
                    "declaratorNames": {
                        "type": "array"
                    }
                },
                "additionalProperties": false
            },
        ],
    },

    create: function(context) {

        const { validate } = require('../validator')
        const validator = validate({ context })

        return {
            ObjectExpression(node) {
                if (node.parent.type === 'CallExpression') {
                    if (node.parent.callee.object.name === 'glamorous') {
                        const object = node
                        validator(object)
                    }
                }
            },

            VariableDeclarator(node) {
                if (node.init.type == 'ObjectExpression') {

                    const variableName = node.id.name
                    const property = 'declaratorNames'

                    let variablesToLint = context.options.filter(_option => typeof _option === 'object').reduce((names, _option) => {
                        return _option.hasOwnProperty(property) ? names.concat(_option[property]) : names
                    }, [])


                    // default to style and styles 
                    if (variablesToLint === []) {
                        variablesToLint = ['style', 'styles']
                    }

                    console.log('VARIABLES TO LINT ', variablesToLint)


                    const shouldApplyValidation = variablesToLint.includes(variableName)

                    const object = node.init
                    if (shouldApplyValidation) { validator(object) }
                }
            }
        }
    },
}