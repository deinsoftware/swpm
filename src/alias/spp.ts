#!/usr/bin/env node

import { spreadCommand } from '../helpers/cmds.js'

const args = ['--pin', 'pnpm']
spreadCommand({ cmd: 'swpm', args })
