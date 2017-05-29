const cssValues = require('css-values').default
const valueParser = require('postcss-value-parser')
const dashify = require('dashify')

function applyValidation(key, value) {
  if (value.type === 'Literal' && value.value) {
    var cssKey = dashify(key)
    var cssValue = `${value.value}`

    cssKey = applyRulesToKey(cssKey)
    let result = cssValues(cssKey, valueParser(cssValue))

    if (result.message) {
      result.message = result.message.replace(cssKey, key)
    }

    return result
  }

  function applyRulesToKey(key) {
    const customRules = {
      height: 'max-height',
      width: 'max-width',
    }

    return customRules.hasOwnProperty(key) ? customRules[key] : key
  }
}

module.exports = applyValidation
