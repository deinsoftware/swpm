import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../.vitest/helpers'

describe('sif', () => {
  it.each([
    ['npm', 'npm run dev -- --port 3030'],
    ['yarn', 'yarn run dev --port 3030'],
    ['yarn@berry', 'yarn run dev --port 3030'],
    ['pnpm', 'pnpm run dev --port 3030'],
    ['bun', 'bun run dev --port 3030']
  ])('%s', (pkg, expected) => {
    const result = testCommandResult(`sr dev --port 3030 --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
