import { describe, test, expect } from 'bun:test'
import { availablePackages, packageExists, getPackageConfiguration } from './list'

describe('availablePackages()', () => {
  test('should return a list of available packages', () => {
    const expectedResult = ['npm', 'yarn', 'yarn@berry', 'pnpm', 'bun']
    const result = availablePackages()
    expect(result).toMatchObject(expectedResult)
  })
})

describe('packageExists()', () => {
  test('should return true if cmd exists', () => {
    const cmd = 'npm'
    const result = packageExists(cmd)
    expect(result).toBeTruthy()
  })
})

describe('getPackageConfiguration()', () => {
  test('should return an empty object if cmd not exists', async () => {
    const expectedResult = {}
    const pkg = {
      cmd: 'not'
    }
    // @ts-expect-error expected command is intentionally wrong
    const result = await getPackageConfiguration(pkg)
    expect(result).toEqual(expectedResult)
  })

  test('should return the package configuration', async () => {
    const expectedResult = {
      cmd: 'npm',
      lockFiles: ['package-lock.json']
    }
    const pkg = {
      cmd: 'npm'
    } as const
    const result = await getPackageConfiguration(pkg)
    const { cmd, lockFiles } = result
    expect({ cmd, lockFiles }).toMatchObject(expectedResult)
  })
})
