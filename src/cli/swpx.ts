#!/usr/bin/env node

import { exit } from 'node:process'
import { inspect } from 'node:util'
import yargs from './swpx/config'
import chalk from 'chalk'

import { showPackageInformation } from 'flags/info'
import { showCommandAlias } from 'flags/alias'
import { testCommand } from 'flags/test'

import { autoUpdate } from '../helpers/autoUpdate'
import { showCommand, runCommand } from '../helpers/cmds'
import cmdr from 'translator/commander'

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

if (yargs?.info) {
  await showPackageInformation(cmdr)
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
