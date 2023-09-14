#!/usr/bin/env bun

import { exit } from 'node:process'
import { inspect } from 'node:util'
import yargs from './swpx/config.js'
import chalk from 'chalk'

import { showPackageInformation } from 'flags/info'
import { showCommandAlias } from 'flags/alias'
import { testCommand } from 'flags/test'

import { autoUpdate } from '../helpers/autoUpdate.js'
import { showCommand, runCommand } from '../helpers/cmds.js'

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

await autoUpdate(yargs)

if (!yargs?.pkg?.config?.exc) {
  console.error(`${chalk.red.bold('Error')}: the execution command is not available on ${chalk.bold(yargs?.pkg?.cmd)} Package Manager.`)
  exit(1)
}
yargs.pkg.cmd = yargs.pkg.config.exc

if (yargs?.test) {
  testCommand(yargs.pkg)
}

if (yargs?.info) {
  await showPackageInformation(yargs.pkg)
}

if (yargs?.alias) {
  await showCommandAlias()
}

if (yargs?.pkg?.cmd) {
  if (!yargs?.mute) {
    showCommand(yargs.pkg)
  }
  await runCommand(yargs.pkg)
}
