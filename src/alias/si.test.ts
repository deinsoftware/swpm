import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../.vitest/helpers'

describe('si', () => {
  it.each([
    ['npm', 'npm install'],
    ['yarn', 'yarn install'],
    ['yarn@berry', 'yarn install'],
    ['pnpm', 'pnpm install'],
    ['bun', 'bun install']
  ])('%s', (pkg, expected) => {
    const result = testCommandResult(`si --test ${pkg}`)
    expect(result).toBe(expected)
  })
})

describe('si --frozen', () => {
  it.each([
    ['npm', 'npm ci'],
    ['yarn', 'yarn install --frozen-lockfile'],
    ['yarn@berry', 'yarn install --immutable'],
    ['pnpm', 'pnpm install --frozen-lockfile'],
    ['bun', 'bun install --frozen-lockfile']
  ])('%s', (pkg, expected) => {
    const result = testCommandResult(`si --frozen --test ${pkg}`)
    expect(result).toBe(expected)
  })
})

describe('si --package-lock', () => {
  it.each([
    ['npm', 'npm install --no-package-lock'],
    ['yarn', 'yarn install --no-lockfile'],
    ['yarn@berry', 'yarn install --no-lockfile'],
    ['pnpm', ''], // not available
    ['bun', 'bun install --no-save']
  ])('%s', (pkg, expected) => {
    const result = testCommandResult(`si --package-lock --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
