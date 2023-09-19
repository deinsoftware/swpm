#!/usr/bin/env bun

import { spreadCommand } from 'helpers/cmds'

const args = ['--pin', 'bun']
spreadCommand({cmd: 'swpm', args})
