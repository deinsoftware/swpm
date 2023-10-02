#!/usr/bin/env node

import { spreadCommand } from '../helpers/cmds.js'

const args = ['remove', ...process.argv.slice(2), '--global']
spreadCommand({ cmd: 'swpm', args })
