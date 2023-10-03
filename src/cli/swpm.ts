#!/usr/bin/env bun

import yargs from './swpm/config.js'

import prompts from 'prompts'
import chalk from 'chalk'
import { stripIndent } from 'common-tags'
import { exit } from 'node:process'

import { autoUpdate } from '../libs/autoUpdate.js'

import { pinPackageManager } from '../flags/pin.js'
import { unpinPackageManager } from '../flags/unpin.js'
import { showNoPackageDetected, showPackageInformation } from '../flags/info.js'
import { showCommandAlias } from '../flags/alias.js'
import { testCommand } from '../flags/test.js'

import { showCommand, runCommand } from '../helpers/cmds.js'
import { setPackageVersion } from '../helpers/set.js'
import { debug } from '../helpers/debug.js'
import { commandVerification } from '../helpers/get.js'

import cmdr from '../translator/commander.js'

if (yargs.debug) {
  debug(yargs)
  debug(cmdr)
}

await autoUpdate(cmdr)

if (yargs?.pin) {
  const { cmd, config } = cmdr

  const isInstalled = !!cmd && await commandVerification(cmd)

  if (!isInstalled) {
    const color = config?.color ?? chalk.reset()

    const response = await prompts({
      type: 'confirm',
      name: 'value',
      message: stripIndent`
        ${chalk.hex(color).bold(cmd)} is not installed.
        Do you still want to continue?
      `,
      initial: false
    })

    if (!response.value) {
      exit(1)
    }
  }

  if (cmd) {
    await setPackageVersion(cmd)
  }

  if (cmd && config) {
    await pinPackageManager({ cmd, config })
  }
}

if (yargs?.unpin) {
  const { config } = cmdr
  if (config) {
    await unpinPackageManager({ config })
  }
}

if (yargs?.test) {
  testCommand(cmdr)
}

if (yargs?.info) {
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
