#!/usr/bin/env node

import { inspect } from 'node:util'
import yargs from './cli/config.js'

import { autoUpdate } from './helpers/autoUpdate.js'
import { pinPackageManager } from './flags/pin.js'
import { showCommand, runCommand } from './helpers/cmds.js'
import { showPackageInformation } from './flags/info.js'
import { testCommand } from './flags/test.js'

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

if (yargs?.pin) {
  await pinPackageManager(yargs.pkg)
}

if (yargs?.test) {
  testCommand(yargs.pkg)
}

if (yargs?.info) {
  await showPackageInformation(yargs.pkg)
}

if (yargs?.pkg?.cmd) {
  showCommand(yargs.pkg)
  runCommand(yargs.pkg)
}
