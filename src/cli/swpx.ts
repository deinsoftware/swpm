#!/usr/bin/env node

import yargs from './swpx/config.js'

import { exit } from 'node:process'
import chalk from 'chalk'

import { autoUpdate } from '../libs/autoUpdate.js'

import { showNoPackageDetected, showPackageInformation } from '../flags/info.js'
import { showCommandAlias } from '../flags/alias.js'
import { testCommand } from '../flags/test.js'

import { showCommand, runCommand } from '../helpers/cmds.js'
import { debug } from '../helpers/debug.js'

import cmdr from '../translator/commander.js'

if (yargs.debug) {
  debug(yargs)
  debug(cmdr)
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

if ((yargs?.info)) {
  await showPackageInformation(cmdr)
}

if (yargs?.alias) {
  await showCommandAlias()
}

if (!cmdr?.cmd) {
  showNoPackageDetected()
}

if (!yargs?.mute) {
  showCommand(cmdr)
}
runCommand(cmdr)
