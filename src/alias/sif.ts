#!/usr/bin/env node

import { spreadCommand } from 'helpers/cmds'

const args = ['install', ...process.argv.slice(2), '--frozen']
spreadCommand({cmd: 'swpm', args})
