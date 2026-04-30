import { describe, it, expect } from 'vitest'
import { execSync } from 'node:child_process'
import { cwd } from 'node:process'

const runCmd = (cmd: string): string => {
  return execSync(cmd, { cwd: cwd(), encoding: 'utf-8' }).trim()
}

const getActiveLtsVersions = (): string[] => {
  try {
    const response = runCmd('curl -s https://nodejs.org/dist/index.json')
    const releases = JSON.parse(response) as { version: string; lts: string | false }[]
    const ltsVersions = releases
      .filter((r) => typeof r.lts === 'string')
      .map((r) => r.version.replace('v', ''))
    const uniqueMajors = new Map<string, string>()
    for (const v of ltsVersions) {
      const major = parseInt(v.split('.')[0], 10)
      if (major >= 18 && !uniqueMajors.has(v.split('.')[0])) {
        uniqueMajors.set(v.split('.')[0], v)
      }
    }
    const versions = Array.from(uniqueMajors.values())
    if (versions.length === 0) {
      return ['24', '22', '20', '18']
    }
    return versions
  } catch {
    return ['24', '22', '20', '18']
  }
}

describe('node version compatibility', () => {
  const nodeVersions = getActiveLtsVersions()

  it.each(nodeVersions)('swpm install works on node %s', (nodeVersion) => {
    runCmd(`mise x node@${nodeVersion} -- npm install`)
    const nodeOut = runCmd(`mise x node@${nodeVersion} -- node --version`)
    expect(nodeOut).toMatch(new RegExp(`^v${nodeVersion.split('.')[0]}`))
  })
})
