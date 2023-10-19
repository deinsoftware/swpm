import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../.vitest/helpers'

describe('sag', () => {
  const voltaCases = [
    ['npm', 'volta install vite'],
    ['yarn', 'volta install vite'],
    ['yarn@berry', 'volta install vite'],
    ['pnpm', 'volta install vite'],
    ['bun', 'volta install vite']
  ]

  const packageCases = [
    ['npm', 'npm add vite --location=global'],
    ['yarn', 'yarn global add vite'],
    ['yarn@berry', 'yarn global add vite'],
    ['pnpm', 'pnpm add vite --global'],
    ['bun', 'bun add vite --global']
  ]

  const voltaVersion = testCommandResult('volta --version')

  it.each(voltaVersion ? voltaCases : packageCases)('%s', (pkg, expected) => {
    const result = testCommandResult(`sag vite --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
