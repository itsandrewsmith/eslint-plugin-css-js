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
  valid: [
    "var div = glamorous.div({ display: 'block' })",
    "var div = glamorous.div({ fontSize: '10px' })",
    "var div = glamorous.div({ color: 'aquamarine' })",
  ],

  invalid: [
    {
      code: "var css = glamorous.div({ display: 'nope' })",
      errors: [
        {
          message: '"nope" is not a valid value for "display".',
          type: 'Property',
        },
      ],
    },

    {
      code: "var css = glamorous.div({ fontSize: 'nope' })",
      errors: [
        {
          message: '"nope" is not a valid value for "fontSize".',
          type: 'Property',
        },
      ],
    },
    {
      code: 'var css = glamorous.div({ fontSize: 10 })',
      errors: [
        {
          message: '"10" is not a valid value for "fontSize".',
          type: 'Property',
        },
      ],
    },

    {
      code: 'var css = glamorous.div({ width: 10 })',
      errors: [
        {
          message: '"10" is not a valid value for "width".',
          type: 'Property',
        },
      ],
    },
  ],
})
