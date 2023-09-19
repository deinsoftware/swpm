import { exit } from 'node:process'
import { spawn } from 'node:child_process'
import chalk from 'chalk'
import { stripIndents } from 'common-tags'
import { getOriginIcon } from 'helpers/icons'
import { PackageManagerList } from 'packages/packages.types'
import { CommanderPackage } from 'translator/commander.types'
import { AddArgs, AddPositionalProps, GetCommandResultProps, ReplaceCommandProps, SpreadCommand, TranslateCommandProp } from './cmds.types'

const addArgs = ({yargs, cmdr, flags}: AddArgs) => {
  for (const flag of flags) {
    const key = flag?.toString().replace(/^-+/, '') as keyof CommanderPackage
    yargs[key] = true
  }

  const textFlags = flags.map(flag => flag.toString())
  cmdr.args = [...cmdr.args, ...textFlags]
}

const replaceCommand = ({args, action}: ReplaceCommandProps) => {
  args[0] = action
}

const addPositional = ({args, action}: AddPositionalProps) => {
  const { 0: key, 1: value } = Object.entries(action)[0]
  const start = args?.findIndex((arg) => arg.startsWith(key))

  if (start > 0) {
    args.splice(start, 0, value)
  }
}

export const translateCommand = ({yargs, cmdr}: TranslateCommandProp) => {
  if (yargs?._?.length > 0) {
    const key = yargs._[0]
    const action = cmdr?.config?.cmds?.[key]

    if (typeof action === 'string') {
      replaceCommand({args: cmdr.args, action})
    }

    if (Array.isArray(action)) {
      const [cmd, ...rest] = action

      if (rest[0] === -1) {
        console.error(`${chalk.red.bold('Error')}: the ${chalk.bold(key)} command is not available on ${chalk.bold(cmdr?.cmd)} Package Manager.`)
        exit(1)
      }

      replaceCommand({args: cmdr.args, action: cmd})
      addArgs({yargs, cmdr, flags: rest})
    }

    if (typeof action === 'object') {
      addPositional({args: cmdr.args, action})
    }
  }
}

export const showCommand = async ({ origin, cmd, args, config }: CommanderPackage)  => {
  console.log(`${(origin ? getOriginIcon(origin) + ' ' : '')}${chalk.hex(config?.color ?? '').bold(cmd)} ${args?.join(' ')}`)
}

const cleanSpecificVersion = (cmd: PackageManagerList) => {
  return cmd?.split('@')?.[0]
}

export const runCommand = ({ cmd, args, volta = false }: CommanderPackage) => {
  let run = cleanSpecificVersion(cmd!)

  if (cmd && volta && run !== 'volta') {
    args = ['run', cmd, ...args]
    run = 'volta'
  }

  const child = spawn(
    run,
    [...args],
    {
      stdio: 'inherit',
      shell: true
    }
  )

  child.on('error', (error) => {
    console.error(stripIndents`
        ${chalk.red.bold('Error')}:
        ${error}
      `)
    exit(1)
  })

  child.on('exit', (code) => {
    return code
  })
}

export const spreadCommand = async ({cmd, args}: SpreadCommand) => {
  const child = spawn(
    cmd,
    args,
    {
      stdio: 'inherit',
      shell: true
    }
  )

  child.on('error', (error) => {
    console.error(stripIndents`
        ${chalk.red.bold('Error')}:
        ${error}
      `)
    exit(1)
  })

  child.on('exit', (code) => {
    return code
  })
}

export const getCommandResult = ({command, volta = false}: GetCommandResultProps): string => {
  try {
    if (volta) {
      command = `volta run ${command}`
    }

    const {stdout} = Bun.spawnSync(
      command.split(' ')
    )

    return stdout?.toString().trim()
  } catch (error) {
    return ''
  }
}
