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
        "css-js/valid-css": [2, { declaratorNames: [ 'style', 'styles' ] }]
    }
}
```

## Supported Rules

* Fill in provided rules here





