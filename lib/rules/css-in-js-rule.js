
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

function applyValidation(key, value){

    if (value.type === 'Literal' && value.value){
        const cssKey = dashify(key)
        return cssValues(cssKey, value.value)
    }
    
    return false
}

module.exports = {
    meta: {
        docs: {
            description: "checking css in js",
            category: "css-in-js",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {

        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

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
