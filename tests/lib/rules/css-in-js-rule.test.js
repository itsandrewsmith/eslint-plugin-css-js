/**
 * @fileoverview checking css in js
 * @author andrww smith
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/css-in-js-rule"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("css-in-js-rule", rule, {

    valid: [
        "var css = { display: 'block' }",
        "var css = { fontSize: '10px' }",
    ],

    invalid: [
        {
            code: "var css = { display: 'nope' }",
            errors: [{
                message: "\"nope\" is not a valid value for \"display\".",
                type: "Property"
            }]
        }, 

        {
            code: "var css = { fontSize: 'nope' }",
            errors: [{
                message: "\"nope\" is not a valid value for \"font-size\".",
                type: "Property"
            }]
        }
    ]
});
