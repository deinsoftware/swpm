#!/usr/bin/env node

import { spreadCommand } from 'helpers/cmds'

const args = ['add', ...process.argv.slice(2), '--save-dev', '--save-exact']
spreadCommand({cmd: 'swpm', args})
