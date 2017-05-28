/**
 * @fileoverview checking css in js
 * @author andrww smith
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/valid-css"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("valid-css", rule, {

    valid: [
        "var css = { display: 'block' }",
        "var css = { fontSize: '10px' }",
        "var css = { height: '100px' }",
        "var css = { width: '100%' }"
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
                message: "\"nope\" is not a valid value for \"fontSize\".",
                type: "Property"
            }]
        }, 
        {
            code: "var css = { fontSize: 10 }",
            errors: [{
                message: "\"10\" is not a valid value for \"fontSize\".",
                type: "Property"
            }]
        },

        {
            code: "var css = { width: 10 }",
            errors: [{
                message: "\"10\" is not a valid value for \"width\".",
                type: "Property"
            }]
        }
    ]
});
