#!/usr/bin/env node

import { spreadCommand } from '../helpers/cmds.js'

const args = ['--pin', 'bun']
spreadCommand({ cmd: 'swpm', args })
