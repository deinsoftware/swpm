#!/usr/bin/env bun

import { spreadCommand } from '../helpers/cmds.js'

const args = [...Bun.argv.slice(2)]
spreadCommand({ cmd: 'swpx', args })
