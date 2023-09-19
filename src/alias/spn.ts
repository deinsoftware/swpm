#!/usr/bin/env node

import { spreadCommand } from 'helpers/cmds'

const args = ['--pin', 'npm']
spreadCommand({cmd: 'swpm', args})
