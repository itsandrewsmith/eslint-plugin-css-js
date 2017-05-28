const cssValues = require('css-values').default
const dashify = require('dashify')

function applyValidation(key, value){

    if (value.type === 'Literal' && value.value){

        var cssKey = dashify(key)
        var cssValue = `${value.value}`

        applyRulesToKey(cssKey)

        let result = cssValues(cssKey, cssValue)        
        formatResultMessage(result, key, cssKey)
        
        return result
    }


    function applyRulesToKey(key) {

        const customRules = {
            height: 'max-height',
            width: 'max-width',
        }

        if (customRules.hasOwnProperty(key)){
            cssKey = customRules[key]
        }
    }

    function formatResultMessage(result, original, altered){
        if (result.message){
            result.message = result.message.replace(altered, original)
        }
    }
}

module.exports = applyValidation