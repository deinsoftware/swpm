#!/usr/bin/env bun

import { spreadCommand } from 'helpers/cmds'

const args = ['remove', ...process.argv.slice(2), '--global']
spreadCommand('swpm', args)
