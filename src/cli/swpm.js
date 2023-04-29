#!/usr/bin/env node

import { inspect } from 'node:util'
import yargs from './swpm/config.js'

import { autoUpdate } from '../helpers/autoUpdate.js'
import { pinPackageManager } from '../flags/pin.js'
import { showCommand, runCommand } from '../helpers/cmds.js'
import { showPackageInformation } from '../flags/info.js'
import { showCommandAlias } from '../flags/alias.js'
import { testCommand } from '../flags/test.js'
import { setPackageVersion } from '../helpers/set.js'

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
  await setPackageVersion(yargs.pkg.cmd)
  await pinPackageManager(yargs.pkg)
}

if (yargs?.test) {
  testCommand(yargs.pkg)
}

if (yargs?.info) {
  await showPackageInformation(yargs.pkg)
}

if (yargs?.alias) {
  await showCommandAlias()
}

await autoUpdate(yargs)

if (yargs?.pkg?.cmd) {
  showCommand(yargs.pkg)
  await runCommand(yargs.pkg)
}
