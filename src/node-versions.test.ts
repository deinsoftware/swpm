import { describe, it, expect, beforeAll, vi } from 'vitest'
import { execSync } from 'node:child_process'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { cwd } from 'node:process'

const runCmd = (cmd: string): string => {
  return execSync(cmd, { cwd: cwd(), encoding: 'utf-8' }).trim()
}

/**
 * read the min node version from package.json
 */
const getMinNodeMajor = (): number => {
  const pkgPath = resolve(cwd(), 'package.json')
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8')) as { engines?: { node?: string } }
  const engineStr = pkg.engines?.node ?? ''
  const version = engineStr.replace(/^>=\s*/, '')
  return parseInt(version, 10) || 18
}

/**
 * read the list of currently supported node versions from nodejs.org
 */
const getActiveNodeVersions = (): string[] => {
  const minMajor = getMinNodeMajor()
  const fallbackNodeVersions: string[] = []
  for (let m = minMajor; m <= 24; m += 2) {
    fallbackNodeVersions.push(String(m))
  }

  try {
    const response = runCmd('curl -s https://nodejs.org/dist/index.json')
    const releases = JSON.parse(response) as { version: string; lts: string | false }[]
    const ltsVersions = releases
      .filter((r) => typeof r.lts === 'string')
      .map((r) => r.version.replace('v', ''))
    const uniqueMajors = new Map<string, string>()
    for (const v of ltsVersions) {
      const major = parseInt(v.split('.')[0], 10)
      if (major >= minMajor && !uniqueMajors.has(v.split('.')[0])) {
        uniqueMajors.set(v.split('.')[0], v)
      }
    }
    const versions = Array.from(uniqueMajors.values())
    if (versions.length === 0) {
      return fallbackNodeVersions
    }
    return versions
  } catch {
    return fallbackNodeVersions
  }
}

const swpmPath = resolve(cwd(), 'bin/src/cli/swpm.js')

const swpmRun = (nodeVersion: string, args: string): string => {
  return runCmd(`mise x node@${nodeVersion} -- node ${swpmPath} ${args}`)
}

describe('node version compatibility', () => {
  const nodeVersions = getActiveNodeVersions()

  beforeAll(() => {
    /** execution might take a bit on first install */
    vi.setConfig({ testTimeout: 120_000 })

    /** we are testing the compiled JS version */
    if (!existsSync(swpmPath)) {
      runCmd('npm run build')
    }
  })

  it('should detect active node versions', () => {
    expect(nodeVersions.length).toBeGreaterThan(0)
  })

  it.each(nodeVersions)('swpm --version works on node %s', (nodeVersion) => {
    const out = swpmRun(nodeVersion, '--version')
    expect(out).toBeTruthy()
  })

  it.each(nodeVersions)('swpm install --use npm --dry-run works on node %s', (nodeVersion) => {
    const out = swpmRun(nodeVersion, 'install --use npm --dry-run')
    expect(out).toMatch(/up to date|added|changed|removed/)
  })
})
