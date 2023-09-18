#!/usr/bin/env bun

import { spreadCommand } from 'helpers/cmds'

const args = ['update', ...Bun.argv.slice(2)]
spreadCommand('swpm', args)
