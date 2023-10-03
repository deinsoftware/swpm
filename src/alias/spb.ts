#!/usr/bin/env bun

import { spreadCommand } from '../helpers/cmds.js'

const args = ['--pin', 'bun']
spreadCommand({ cmd: 'swpm', args })
