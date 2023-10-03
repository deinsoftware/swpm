#!/usr/bin/env bun

import { spreadCommand } from '../helpers/cmds.js'

const args = ['add', ...Bun.argv.slice(2), '--global']
spreadCommand({ cmd: 'swpm', args })
