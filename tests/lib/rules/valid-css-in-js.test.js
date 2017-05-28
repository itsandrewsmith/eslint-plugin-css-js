/**
 * @fileoverview checking css in js
 * @author andrww smith
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/valid-css-in-js"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("valid-cs-in-js", rule, {

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
        }, 
        {
            code: "var css = { fontSize: 10 }",
            errors: [{
                message: "\"10\" is not a valid value for \"font-size\".",
                type: "Property"
            }]
        }
    ]
});
