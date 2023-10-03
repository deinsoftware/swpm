#!/usr/bin/env bun

import { spreadCommand } from '../helpers/cmds.js'

const args = ['--pin', 'npm']
spreadCommand({ cmd: 'swpm', args })
