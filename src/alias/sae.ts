#!/usr/bin/env bun

import { spreadCommand } from 'helpers/cmds'

const args = ['add', ...Bun.argv.slice(2), '--save-exact']
spreadCommand({cmd: 'swpm', args})
