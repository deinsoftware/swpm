import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../../../.vitest/helpers'

describe('update', () => {
  it.each([
    ['npm', 'npm update vite'],
    ['yarn', 'yarn upgrade vite'],
    ['yarn@berry', 'yarn semver up vite'],
    ['pnpm', 'pnpm update vite'],
    ['bun', 'bun update vite']
  ])('%s', (pkg, expected) => {
    const result = testCommandResult(`swpm update vite --test ${pkg}`)
    expect(result).toBe(expected)
  })
})

describe('update --global', () => {
  it.each([
    ['npm', 'npm update vite --location=global'],
    ['yarn', 'yarn global upgrade vite'],
    ['yarn@berry', 'yarn global semver up vite'],
    ['pnpm', 'pnpm update vite --global'],
    ['bun', 'bun update vite --global']
  ])('%s', (pkg, expected) => {
    const result = testCommandResult(`swpm update vite --global --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
