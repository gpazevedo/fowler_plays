const { factorial } = require('./Calculations')

it('calculates the factorial of 4', () => {
  const n = 4

  expect(factorial(n)).toEqual(24)
})
