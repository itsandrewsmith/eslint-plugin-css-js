/**
 * @fileoverview checking css in js
 * @author andrww smith
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/valid-css'),
    RuleTester = require('eslint').RuleTester

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester()
ruleTester.run('valid-css', rule, {
    valid: [{
            options: [{ declaratorNames: ['style', 'styles'] }],
            code: "var div = glamorous.div({ display: 'block' })",
        },
        "var div = glamorous.div({ fontSize: '10px' })",
        "var div = glamorous.div({ color: 'aquamarine' })",
        {
            options: [{ declaratorNames: ['styles'] }],
            code: "var styles = { fontSize: '10px' }"
        },
        {
            options: [{ declaratorNames: ['yessir'] }],
            code: "var yessir = { color: 'purple' }"
        },

        {
            code: "var notInList = { color: 'purple' }",
            options: [{ declaratorNames: ['style', 'styles'] }, ],
        },

    ],

    invalid: [{
            code: "var css = glamorous.div({ display: 'nope' })",
            errors: [{
                message: '"nope" is not a valid value for "display".',
                type: 'Property',
            }, ],
        },

        {
            code: "var css = glamorous.div({ fontSize: 'nope' })",
            errors: [{
                message: '"nope" is not a valid value for "font-size".',
                type: 'Property',
            }, ],
        },
        {
            code: 'var css = glamorous.div({ fontSize: 10 })',
            errors: [{
                message: '"10" is not a valid value for "font-size".',
                type: 'Property',
            }, ],
        },

        {
            code: 'var css = glamorous.div({ width: 10 })',
            errors: [{
                message: '"10" is not a valid value for "max-width".',
                type: 'Property',
            }, ],
        },

        {

            code: "var styles = { fontSize: 'onemillion' }",
            errors: [{
                message: '"onemillion" is not a valid value for "font-size".',
                type: 'Property',
            }, ],
            options: [{ declaratorNames: ['styles'] }],
        },

    ],
})