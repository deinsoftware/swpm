import { describe, test, expect } from 'bun:test'
import { availablePackages, packageExists, getPackageConfiguration } from './list.js'

describe('availablePackages()', () => {
  test('should return a list of available packages', () => {
    const expectedResult = ['npm', 'yarn', 'yarn@berry', 'pnpm', 'bun']
    const result = availablePackages()
    expect(result).toMatchObject(expectedResult)
  })
})

describe('packageExists()', () => {
  test('should return false if cmd was not sent', () => {
    const result = packageExists()
    expect(result).toBeFalsy()
  })

  test('should return false if cmd not exists', () => {
    const cmd = 'not'
    const result = packageExists(cmd)
    expect(result).toBeFalsy()
  })

  test('should return true if cmd exists', () => {
    const cmd = 'npm'
    const result = packageExists(cmd)
    expect(result).toBeTruthy()
  })
})

describe('getPackageConfiguration()', () => {
  test('should return an empty object if cmd was not send', async () => {
    const expectedResult = {}
    const result = await getPackageConfiguration()
    expect(result).toEqual(expectedResult)
  })

  test('should return an empty object if cmd not exists', async () => {
    const expectedResult = {}
    const pkg = {
      cmd: 'not'
    }
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
    }
    const result = await getPackageConfiguration(pkg)
    const { cmd, lockFiles } = result
    expect({ cmd, lockFiles }).toMatchObject(expectedResult)
  })
})
