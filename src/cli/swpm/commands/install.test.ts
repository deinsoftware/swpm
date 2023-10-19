import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../../../.vitest/helpers'

export const installCases = [
  ['npm', 'npm install'],
  ['yarn', 'yarn install'],
  ['yarn@berry', 'yarn install'],
  ['pnpm', 'pnpm install'],
  ['bun', 'bun install']
]

describe('install', () => {
  it.each(installCases)('%s', (pkg, expected) => {
    const result = testCommandResult(`swpm install --test ${pkg}`)
    expect(result).toBe(expected)
  })
})

export const installFrozenCases = [
  ['npm', 'npm ci'],
  ['yarn', 'yarn install --frozen-lockfile'],
  ['yarn@berry', 'yarn install --immutable'],
  ['pnpm', 'pnpm install --frozen-lockfile'],
  ['bun', 'bun install --frozen-lockfile']
]

describe('install --frozen', () => {
  it.each(installFrozenCases)('%s', (pkg, expected) => {
    const result = testCommandResult(`swpm install --frozen --test ${pkg}`)
    expect(result).toBe(expected)
  })
})

export const installLockCases = [
  ['npm', 'npm install --no-package-lock'],
  ['yarn', 'yarn install --no-lockfile'],
  ['yarn@berry', 'yarn install --no-lockfile'],
  ['pnpm', ''], // not available
  ['bun', 'bun install --no-save']
]

describe('install --package-lock', () => {
  it.each(installLockCases)('%s', (pkg, expected) => {
    const result = testCommandResult(`swpm install --package-lock --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
