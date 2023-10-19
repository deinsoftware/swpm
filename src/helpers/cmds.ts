import { exit } from 'node:process'
import { spawn, spawnSync, execSync } from 'node:child_process'
import chalk from 'chalk'
import { stripIndents } from 'common-tags'
import { getOriginIcon } from './icons.js'

import type { PackageManagerList } from '../packages/packages.types.js'
import type { CommanderPackage } from '../translator/commander.types.js'
import type {
  AddArgs,
  AddPositionalProps,
  GetCommandResultProps,
  PositionalObject,
  ReplaceCommandProps,
  SpreadCommand,
  TranslateCommandProp
} from './cmds.types.js'

const addArgs = ({ yargs, cmdr, flags }: AddArgs) => {
  for (const flag of flags) {
    const key = flag?.toString().replace(/^-+/, '') as keyof CommanderPackage
    yargs[key] = true
  }

  const textFlags = flags.map(flag => flag.toString())
  cmdr.args = [...cmdr.args, ...textFlags]
}

const replaceCommand = ({ args, cmd, action }: ReplaceCommandProps) => {
  const index = args?.findIndex((arg) => arg === cmd)
  args[index] = action
}

const addPositional = ({ args, action }: Pick<AddPositionalProps, 'args'> & {action: PositionalObject}) => {
  const key = Object.keys(action).at(0) ?? ''
  const value = action[key] ?? ''

  const start = args?.findIndex((arg) => arg.startsWith(key))

  if (typeof value === 'string' && start > 0) {
    args.splice(start, 0, value)
  }
}

export const translateCommand = ({ yargs, cmdr }: TranslateCommandProp) => {
  if (yargs?._?.length > 0 && yargs?._?.[0]) {
    const key = yargs._[0]
    const action = cmdr?.config?.cmds?.[key]

    if (typeof action === 'string') {
      replaceCommand({ args: cmdr.args, cmd: key, action })
    }

    if (Array.isArray(action)) {
      const [cmd, ...rest] = action

      if (rest[0] === -1) {
        console.error(`${chalk.red.bold('Error')}: the ${chalk.bold(key)} command is not available on ${chalk.bold(cmdr?.cmd)} Package Manager.`)
        exit(1)
      }

      replaceCommand({ args: cmdr.args, cmd: key, action: cmd })
      addArgs({ yargs, cmdr, flags: rest })
    }

    if (typeof action === 'object') {
      const actionObject = action as PositionalObject
      addPositional({ args: cmdr.args, action: actionObject })
    }
  }
}

const cleanSpecificVersion = (cmd: PackageManagerList) => {
  return cmd?.split('@')?.[0]
}

export const showCommand = async ({ origin, cmd, args, config }: CommanderPackage) => {
  const run = cleanSpecificVersion(cmd!)
  console.log(`${(origin ? getOriginIcon(origin) + ' ' : '')}${chalk.hex(config?.color ?? '').bold(run)} ${args?.join(' ')}`)
}

export const runCommand = ({ cmd, args, volta = false }: CommanderPackage) => {
  let run = cleanSpecificVersion(cmd!)

  if (cmd && volta && run !== 'volta') {
    args = ['run', cmd, ...args]
    run = 'volta'
  }

  const child = spawn(
    run!,
    [...args],
    {
      stdio: 'inherit',
      shell: true
    }
  )

  child.on('error', (error) => {
    if (error) {
      console.error(stripIndents`
          ${chalk.red.bold('Error')}:
          ${error}
        `)
    }
    child.kill()
    exit(1)
  })

  child.on('exit', (code) => {
    return code
  })
}

export const spreadCommand = async ({ cmd, args }: SpreadCommand) => {
  const child = spawnSync(
    cmd,
    args,
    {
      stdio: 'inherit',
      shell: true
    }
  )

  if (child.status !== 0) {
    if (child?.stderr) {
      console.error(stripIndents`
          ${chalk.red.bold('Error')}:
          ${child?.stderr}
        `)
    }
    exit(1)
  }

  return child.status
}

export const getCommandResult = ({ command, volta = false }: GetCommandResultProps): string => {
  try {
    if (volta) {
      command = `volta run ${command}`
    }

    const child = execSync(command)
    return child.toString().trim()
  } catch (error) {
    return ''
  }
}
