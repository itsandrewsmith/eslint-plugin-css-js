
/**
 * @fileoverview checking css in js
 * @author andrww smith
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "checking css in js",
            category: "css-in-js",
            recommended: false
        },
        fixable: "code", 
        schema: []
    },

    create: function(context) {

        const validator = require('../validator')

        return {
            ObjectExpression(node) {
                node.properties.forEach(property => {
                    const { key: {name}, value } = property 
                    const validated = validator(name, value)

                    if (typeof validated === 'object'){
                        context.report({
                            node: property,
                            message: validated.message
                        })
                    }
                })
            }
        };
    }
};
