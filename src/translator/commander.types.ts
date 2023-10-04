import { PackageConfiguration, PackageManagerList } from '../packages/packages.types.js'
import type { PackageJson as BasePackageJson } from 'type-fest'

export type CommanderPackage = {
    cmd?: PackageManagerList
    args: string[]
    origin?: 'pinned' | 'packageManager' | 'environment' | 'lock'
    config?: PackageConfiguration
}

export type PackageJson = BasePackageJson
