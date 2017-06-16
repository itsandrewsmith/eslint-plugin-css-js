const cssValues = require('css-values').default
const valueParser = require('postcss-value-parser')
const dashify = require('dashify')

function transformNodeProperty(property) {
    const { key: { name }, value } = property

    if (value.type === 'Literal' && value.value) {
        return {
            key: dashify(name),
            value: `${value.value}`,
        }
    }
}

function applyValidationToNodeProperties(validatorFunction, context) {
    return function(node) {

        node.properties.forEach(property => {
            const { key, value } = transformNodeProperty(property)
            const invalidated = validatorFunction({ key, value })

            if (typeof invalidated === 'object') {
                context.report({
                    node: property,
                    message: invalidated.message,
                })
            }
        })
    }
}

function composeValidators({ plugins = [] }) {
    return function({ key, value }) {
        let result = plugins.reduce((_result, plugin) => {
            if (_result.isValid === true) return _result
            return _result = plugin(_result)
        }, { key, value })

        if (result.isValid === true) return true
        return result
    }
}

function mapRulesToKey({ rules = [] }) {
    return function({ key, value }) {
        if (rules.hasOwnProperty(key)) {
            key = rules[key]
        }

        return { key, value }
    }
}

function applyCSSValues({ key, value }) {
    let result = cssValues(key, valueParser(value))
    if (result === true) return { isValid: true }

    result.isValid = false
    return result
}

const rules = {
    width: 'max-width',
    height: 'max-height',
}

const plugins = [
    mapRulesToKey({ rules }),
    applyCSSValues
]

function validate({ context }) {
    const validatorFunction = composeValidators({ plugins })
    return applyValidationToNodeProperties(validatorFunction, context)
}


module.exports = {
    validate
}