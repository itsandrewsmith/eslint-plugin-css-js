# eslint-plugin-css-js

linting for css in js

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-css-js`:

```
$ npm install eslint-plugin-css-js --save-dev
```

## Contributing 

The plugin is now more pluggable!

```
// validator.js

let plugins = [
    mapRulesToKey({ rules }),
    applyCSSValues
]

```


Add middleware functions with the following API:

```
function myMiddleware({ key, value }){

    const validated = myValidationLogic({ key, value }) // => { isValid: ??? }

    // this will exit early and override any middleware after it
    if (validated.isValid === true ){
        return { isValid: true }
    }

    // this will display any custom message by the linter 
    if (validated.isValid === false){
        return {
            message: 'your custom error message to override'
        }               
    }   

    // this is a fallthrough for when your rule didn't apply
    return { key, value }
}

plugins.push(myMiddleware)

```


**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-css--js` globally.

## Usage

Add `css-js` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "css-js"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "css-js/valid-css": [ 2, { declaratorNames: [ 'style', 'styles' ] }]
    }
}
```

## Supported Rules

*  { declaratorNames:  [ 'variableName' ] }

    - each name given will be targeted to lint css in js.
    - defaults to 'style' and 'styles'





