#!/usr/bin/env bun

import { spreadCommand } from '../helpers/cmds.js'

const args = ['install', ...Bun.argv.slice(2), '--frozen']
spreadCommand({ cmd: 'swpm', args })
