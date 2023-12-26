import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../../../.vitest/helpers'

export const updateCases = [
  ['npm', 'npm update vite'],
  ['yarn', 'yarn upgrade vite'],
  ['yarn@berry', 'yarn semver up vite'],
  ['pnpm', 'pnpm update vite'],
  ['bun', 'bun update vite']
]

describe('update', () => {
  it.each(updateCases)('%s', (pkg, expected) => {
    const result = testCommandResult(`swpm update vite --test ${pkg}`)
    expect(result).toBe(expected)
  })
})

describe('update --global', () => {
  it.each([
    ['npm', 'npm update vite --global'],
    ['yarn', 'yarn global upgrade vite'],
    ['yarn@berry', 'yarn global semver up vite'],
    ['pnpm', 'pnpm update vite --global'],
    ['bun', 'bun update vite --global']
  ])('%s', (pkg, expected) => {
    const result = testCommandResult(`swpm update vite --global --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
