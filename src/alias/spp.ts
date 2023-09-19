#!/usr/bin/env bun

import { spreadCommand } from 'helpers/cmds'

const args = ['--pin', 'pnpm']
spreadCommand({cmd: 'swpm', args})
