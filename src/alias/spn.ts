#!/usr/bin/env bun

import { spreadCommand } from 'helpers/cmds'

const args = ['--pin', 'npm']
spreadCommand({cmd: 'swpm', args})
