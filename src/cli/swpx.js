#!/usr/bin/env node

import { exit } from 'node:process'
import { inspect } from 'node:util'
import yargs from './swpx/config.js'
import chalk from 'chalk'

import { autoUpdate } from '../helpers/autoUpdate.js'
import { showCommand, runCommand } from '../helpers/cmds.js'
import { showPackageInformation } from '../flags/info.js'
import { testCommand } from '../flags/test.js'

await autoUpdate()

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

if (!yargs?.pkg?.config?.exc) {
  console.error(`${chalk.red.bold('Error')}: the execution command is not available on ${chalk.bold(yargs?.pkg?.cmd)} Package Manager.`)
  exit(1)
}

if (yargs?.test) {
  testCommand(yargs.$0, yargs.pkg)
}

if (yargs?.info) {
  await showPackageInformation(yargs.pkg)
}

if (yargs?.pkg?.cmd) {
  showCommand(yargs.$0, yargs.pkg)
  runCommand(yargs.$0, yargs.pkg)
}
