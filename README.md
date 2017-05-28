# eslint-plugin-css-in-js

linting for css in js

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-css-in-js`:

```
$ npm install eslint-plugin-css-in-js --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-css-in-js` globally.

## Usage

Add `css-in-js` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "css-in-js"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "css-in-js/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





