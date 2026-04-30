import type { PackageManagerList } from '../../../packages/packages.types.js'
import type { CommanderPackage } from '../../../translator/commander.types.js'

export type StatusProps = {
  format?: string
}

export type StatusData = {
  _: PackageManagerList | 'unknown'
  using: PackageManagerList | 'unknown'
  error: string | null
  ready: boolean
  origin: CommanderPackage['origin'] | 'unknown'
  volta: boolean
  versions: {
    swpm: string
    node: string | undefined
    [key: string]: string | undefined
  }
}
