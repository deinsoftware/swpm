#!/usr/bin/env node

import { spreadCommand } from '../helpers/cmds'

const args = ['add', ...process.argv.slice(2), '--global']
spreadCommand({cmd: 'swpm', args})
