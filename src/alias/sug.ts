#!/usr/bin/env bun

import { spreadCommand } from '../helpers/cmds.js'

const args = ['upgrade', ...Bun.argv.slice(2)]
spreadCommand({ cmd: 'swpm', args })
