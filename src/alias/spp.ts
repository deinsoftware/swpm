#!/usr/bin/env bun

import { spreadCommand } from '../helpers/cmds.js'

const args = ['--pin', 'pnpm']
spreadCommand({ cmd: 'swpm', args })
