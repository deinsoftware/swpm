#!/usr/bin/env bun

import { inspect } from 'node:util'
import yargs from './swpm/config.js'

import { pinPackageManager } from 'flags/pin'
import { showPackageInformation } from 'flags/info.js'
import { showCommandAlias } from 'flags/alias'
import { testCommand } from 'flags/test.js'

import { autoUpdate } from '../helpers/autoUpdate.js'
import { showCommand, runCommand } from '../helpers/cmds.js'
import { setPackageVersion } from 'helpers/set'

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

if (yargs?.pkg?.cmd) {
  if (!yargs?.mute) {
    showCommand(yargs.pkg)
  }
  await runCommand(yargs.pkg)
}
