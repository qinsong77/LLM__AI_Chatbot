import { describe, expect, test } from 'vitest'

import { pick } from '../pick'

describe('test pick func', () => {
  test('pick all properties', () => {
    const object = {
      a: 1,
      b: 2,
      c: 3,
    }

    expect(pick(object, ['a', 'b', 'c'])).toEqual({ a: 1, b: 2, c: 3 })
  })

  test('pick partly property', () => {
    const object = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    }

    expect(pick(object, ['a', 'c'])).toEqual({ a: 1, c: 3 })
  })

  test('pick not existed property', () => {
    const object = {
      a: 1,
      b: 2,
    }

    // @ts-ignore
    expect(pick(object, ['a', 'c', 'd'])).toEqual({ a: 1 })
  })

  // 测试空对象
  test('pick empty object', () => {
    const object = {}

    // @ts-ignore
    expect(pick(object, ['a', 'b'])).toEqual({})
  })

  test('pick empty keys', () => {
    const object = {
      a: 1,
      b: 2,
    }

    expect(pick(object, [])).toEqual({})
  })

  test('pick from all empty', () => {
    expect(pick([], [])).toEqual({})
  })
})
