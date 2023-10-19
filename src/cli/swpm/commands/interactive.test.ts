import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../../../.vitest/helpers'

export const interactiveCases = [
  ['npm', ''],
  ['yarn', 'yarn upgrade-interactive'],
  ['yarn@berry', 'yarn upgrade-interactive'],
  ['pnpm', 'pnpm upgrade --interactive'],
  ['bun', '']
]

describe('interactive', () => {
  it.each(interactiveCases)('%s', (pkg, expected) => {
    const result = testCommandResult(`swpm interactive --test ${pkg}`)
    expect(result).toBe(expected)
  })
})

describe('interactive --latest', () => {
  it.each([
    ['npm', ''],
    ['yarn', 'yarn upgrade-interactive --latest'],
    ['yarn@berry', 'yarn upgrade-interactive --latest'],
    ['pnpm', 'pnpm upgrade --latest --interactive'],
    ['bun', '']
  ])('%s', (pkg, expected) => {
    const result = testCommandResult(`swpm interactive --latest --test ${pkg}`)
    expect(result).toBe(expected)
  })
})

describe('interactive --global', () => {
  it.each([
    ['npm', ''],
    ['yarn', 'yarn global upgrade-interactive'],
    ['yarn@berry', 'yarn global upgrade-interactive'],
    ['pnpm', 'pnpm upgrade --global --interactive'],
    ['bun', '']
  ])('%s', (pkg, expected) => {
    const result = testCommandResult(`swpm interactive --global --test ${pkg}`)
    expect(result).toBe(expected)
  })
})

describe('interactive --latest --global', () => {
  it.each([
    ['npm', ''],
    ['yarn', 'yarn global upgrade-interactive --latest'],
    ['yarn@berry', 'yarn global upgrade-interactive --latest'],
    ['pnpm', 'pnpm upgrade --latest --global --interactive'],
    ['bun', '']
  ])('%s', (pkg, expected) => {
    const result = testCommandResult(`swpm interactive --latest --global --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
