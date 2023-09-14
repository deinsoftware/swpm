import { PackageManager } from "packages/packages.types"
import type {PackageJson as BasePackageJson} from 'type-fest';
import { ArgumentsCamelCase } from "yargs"

export type PackageCommand = {
    cmd: PackageManager | ''
    args: string[]
    origin: 'pinned' | 'packageManager' | 'environment' | 'lock'
}

export type Yargs = ArgumentsCamelCase & {
    pkg?: PackageCommand
    use?: PackageManager
    pin?: PackageManager
    test?: PackageManager
    mute?: boolean
}

export type PackageJson = BasePackageJson & {
    volta: {
        [key: string]: string
    }
}

