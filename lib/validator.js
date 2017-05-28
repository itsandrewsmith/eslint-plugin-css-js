const cssValues = require('css-values').default
const dashify = require('dashify')

function applyValidation(key, value){
    if (value.type === 'Literal' && value.value){
        const cssKey = dashify(key)
        const cssValue = `${value.value}`
        return cssValues(cssKey, cssValue)
    }
}

module.exports = applyValidation