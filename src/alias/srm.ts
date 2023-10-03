#!/usr/bin/env bun

import { spreadCommand } from '../helpers/cmds.js'

const args = ['remove', ...Bun.argv.slice(2)]
spreadCommand({ cmd: 'swpm', args })
