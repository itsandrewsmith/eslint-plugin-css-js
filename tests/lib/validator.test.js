const { transformNodeProperty, validate, validator } = require('../../lib/validator')

const exampleNode = {
  value: {
    type: 'Literal',
    value: 'block',
  },
  key: {
    name: 'display',
  },
}

test('transformNodeProperty() returns a key value css object', () => {
  const expected = { key: 'display', value: 'block' }
  expect(transformNodeProperty(exampleNode)).toEqual(expected)
})

test('transformNodeProperty() throws when given an invalid node property', () => {
  expect(transformNodeProperty).toThrow()
})

test('validate() valid css properties return isValid = true', () => {
  const valid = { key: 'display', value: 'block' }
  expect(validate(valid)).toHaveProperty('isValid', true)
})

test('validate() invalid css properties return isValid = false ', () => {
  const invalid = { key: 'display', value: 'nada' }
  expect(validate(invalid)).toHaveProperty('isValid', false)
})

test('validate() invalid css properties return a message string', () => {
  const invalid = { key: 'display', value: 'nada' }
  expect(validate(invalid)).toHaveProperty('message')
})

test('validator() can take additional rules to apply', () => {
  const valid = { key: 'display', value: 'block' }

  const plugin = ({ key, value }) => {
    return { key, value }
  }

  expect(validator(plugin)(valid)).toEqual(valid)
})

test('validator() can take multiple additional rules to apply', () => {
  const valid = { key: 'display', value: 'block' }

  const plugin = ({ key, value }) => ({ key, value })
  const plugin2 = ({ key, value }) => validate({ key, value })

  const plugins = [ plugin, plugin2 ]
  expect(validator({ plugins: plugins })(valid)).toBe(true)
})

test('validator() truthys override falsies', () => {
  const valid = { key: 'display', value: 'block' }

  const pluginCantValidate = ({ key, value }) =>({ key, value, isValid: false })
  const pluginThatValidates = ({ key, value }) => validate({ key, value })
  const pluginThatCantvalidateToo = ({ key, value }) => ({ key, value, isValid: false })

  let plugins = [ pluginCantValidate, pluginThatValidates, pluginThatCantvalidateToo ]
  expect(validator({ plugins: plugins })(valid)).toBe(true)

  plugins = plugins.reverse()
  expect(validator({ plugins: plugins })(valid)).toBe(true)
})