import { render, screen } from '@testing-library/react'
import Login, { validateInput } from '../pages/login.js'

describe('Login', () => {
  test('Pass on correct input', () => {
    const text = 'text@test.com'
    expect(validateInput(text)).toBe(true)
  })
})
