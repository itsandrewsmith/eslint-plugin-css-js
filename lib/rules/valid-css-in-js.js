
/**
 * @fileoverview checking css in js
 * @author andrww smith
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const cssValues = require('css-values').default
const dashify = require('dashify')

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

        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section
        function applyValidation(key, value){
            if (value.type === 'Literal' && value.value){
                const cssKey = dashify(key)
                const cssValue = `${value.value}`
                return cssValues(cssKey, cssValue)
            }
            
            return false
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------


        return {
            ObjectExpression(node) {
                node.properties.forEach(property => {

                    const { key: {name}, value } = property 
                    const validated = applyValidation(name, value)

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
