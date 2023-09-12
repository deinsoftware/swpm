#!/usr/bin/env bun

import { spreadCommand } from 'helpers/cmds'

const args = ['--pin', 'pnpm']
spreadCommand('swpm', args)
