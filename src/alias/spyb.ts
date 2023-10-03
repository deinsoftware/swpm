#!/usr/bin/env bun

import { spreadCommand } from '../helpers/cmds.js'

const args = ['--pin', 'yarn@berry']
spreadCommand({ cmd: 'swpm', args })
