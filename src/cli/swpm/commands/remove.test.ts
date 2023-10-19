import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../../../.vitest/helpers'

export const removeCases = [
  ['npm', 'npm uninstall vite'],
  ['yarn', 'yarn remove vite'],
  ['yarn@berry', 'yarn remove vite'],
  ['pnpm', 'pnpm uninstall vite'],
  ['bun', 'bun remove vite']
]

describe('remove', () => {
  it.each(removeCases)('%s', (pkg, expected) => {
    const result = testCommandResult(`swpm remove vite --test ${pkg}`)
    expect(result).toBe(expected)
  })
})

describe('remove --save-dev', () => {
  it.each([
    ['npm', 'npm uninstall vite --save-dev'],
    ['yarn', 'yarn remove vite --dev'],
    ['yarn@berry', 'yarn remove vite --dev'],
    ['pnpm', 'pnpm uninstall vite --save-dev'],
    ['bun', 'bun remove vite --dev']
  ])('%s', (pkg, expected) => {
    const result = testCommandResult(`swpm remove vite --save-dev --test ${pkg}`)
    expect(result).toBe(expected)
  })
})

describe('remove --save-optional', () => {
  it.each([
    ['npm', 'npm uninstall vite --save-optional'],
    ['yarn', 'yarn remove vite --optional'],
    ['yarn@berry', 'yarn remove vite --optional'],
    ['pnpm', 'pnpm uninstall vite --save-optional'],
    ['bun', 'bun remove vite --optional']
  ])('%s', (pkg, expected) => {
    const result = testCommandResult(`swpm remove vite --save-optional --test ${pkg}`)
    expect(result).toBe(expected)
  })
})

describe('remove --save-peer', () => {
  it.each([
    ['npm', 'npm uninstall vite --save-peer'],
    ['yarn', 'yarn remove vite --peer'],
    ['yarn@berry', 'yarn remove vite --peer'],
    ['pnpm', 'pnpm uninstall vite --save-peer'],
    ['bun', ''] // not available
  ])('%s', (pkg, expected) => {
    const result = testCommandResult(`swpm remove vite --save-peer --test ${pkg}`)
    expect(result).toBe(expected)
  })
})

export const removeGlobalCases = [
  ['npm', 'npm uninstall vite --location=global'],
  ['yarn', 'yarn global remove vite'],
  ['yarn@berry', 'yarn global remove vite'],
  ['pnpm', 'pnpm uninstall vite --global'],
  ['bun', 'bun remove vite --global']
]

describe('remove --global', () => {
  it.each(removeGlobalCases)('%s', (pkg, expected) => {
    const result = testCommandResult(`swpm remove vite --global --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
