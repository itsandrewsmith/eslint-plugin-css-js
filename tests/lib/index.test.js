const validator = require('../../lib/validator')

test('it should be pluggable', () => {
    expect(validator).not.toBeUndefined()
})