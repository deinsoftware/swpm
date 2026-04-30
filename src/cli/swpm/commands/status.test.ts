import { it, expect, describe } from 'vitest'
import { execSync } from 'node:child_process'
import { testCommandResult } from '../../../../.vitest/helpers'

const swpm = 'node bin/src/cli/swpm.js'

describe('status', () => {
  it('should return json by default', () => {
    const result = testCommandResult(`${swpm} status`)
    const json = JSON.parse(result)
    expect(json).toHaveProperty('using')
    expect(json).toHaveProperty('versions')
  })

  it('should return json when specified', () => {
    const result = testCommandResult(`${swpm} status json`)
    const json = JSON.parse(result)
    expect(json).toHaveProperty('using')
  })

  it('should return a specific property with json:path', () => {
    const result = testCommandResult(`${swpm} status json:using`)
    expect(result).toBe('"npm"')
  })

  it('should return a nested property with json:path', () => {
    const result = testCommandResult(`${swpm} status json:versions.swpm`)
    expect(result).toBe('"3.0.0"')
  })

  it('should return a specific property with plain:path', () => {
    const result = testCommandResult(`${swpm} status plain:using`)
    expect(result).toBe('npm')
  })

  it('should return a nested property with plain:path', () => {
    const result = testCommandResult(`${swpm} status plain:versions.swpm`)
    expect(result).toBe('3.0.0')
  })

  it('should return error if property not found', () => {
    try {
      execSync(`${swpm} status json:invalid 2>&1`)
    } catch (error: unknown) {
      const result = (error as { stdout: Buffer }).stdout.toString().trim()
      expect(result).toContain('Error: property not found: invalid')
    }
  })
})
