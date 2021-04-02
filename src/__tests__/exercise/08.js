// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

function setup({initProps} = {}) {
  const result = {}
  function TestComponent(props) {
    result.current = useCounter(props)
    return null
  }

  render(<TestComponent {...initProps} />)
  return result
}

test('exposes the count and increment/decrement functions', () => {
  const result = setup()

  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const result = setup({initProps: {initialCount: 5}})

  expect(result.current.count).toBe(5)
  act(() => result.current.increment())
  expect(result.current.count).toBe(6)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(5)
})

test('allows customization of the step', () => {
  const result = setup({initProps: {step: 5}})

  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(5)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization of the step and initial count', () => {
  const result = setup({initProps: {initialCount: 5, step: 5}})

  expect(result.current.count).toBe(5)
  act(() => result.current.increment())
  expect(result.current.count).toBe(10)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(5)
})
