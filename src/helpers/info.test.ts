import { describe, test, expect } from 'bun:test'
import { getSwpmInfo } from './info'

describe('getSwpmInfo()', () => {
  test('should return an object literal with project information', async () => {
    const projectInfo = {
      name: 'swpm',
      description: 'Switch Package Manager'
    }
    const versionProperty = 'version'

    const result = await getSwpmInfo()
    const { name, description } = result

    expect({ name, description }).toMatchObject(projectInfo)
    expect(result).toHaveProperty(versionProperty)
  })
})
