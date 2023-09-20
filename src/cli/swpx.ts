#!/usr/bin/env node

import { exit } from 'node:process'
import { inspect } from 'node:util'
import yargs from './swpx/config.js'
import chalk from 'chalk'

import { showPackageInformation } from '../flags/info.js'
import { showCommandAlias } from '../flags/alias.js'
import { testCommand } from '../flags/test.js'

import { autoUpdate } from '../helpers/autoUpdate.js'
import { showCommand, runCommand } from '../helpers/cmds.js'
import cmdr from '../translator/commander.js'
import { CommanderPackage } from '../translator/commander.types.js'

if (yargs.debug) {
  console.log(
    inspect(
      yargs,
      {
        showHidden: false,
        depth: null,
        colors: true
      }
    )
  )
}

await autoUpdate(cmdr)

if (!cmdr?.config?.exc) {
  console.error(`${chalk.red.bold('Error')}: the execution command is not available on ${chalk.bold(cmdr?.cmd)} Package Manager.`)
  exit(1)
}
cmdr.cmd = cmdr.config.exc

if (yargs?.test) {
  testCommand(cmdr)
}

if (yargs?.info && cmdr?.cmd && cmdr?.config && cmdr?.origin && cmdr?.volta) {
  const cmdrInfo: Required<CommanderPackage> = {
    cmd: cmdr.cmd,
    args: cmdr.args,
    origin: cmdr.origin,
    config: cmdr.config,
    volta: cmdr.volta
  }
  await showPackageInformation(cmdrInfo)
}

if (yargs?.alias) {
  await showCommandAlias()
}

if (cmdr?.cmd) {
  if (!yargs?.mute) {
    showCommand(cmdr)
  }
  await runCommand(cmdr)
}
