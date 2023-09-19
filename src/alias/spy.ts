#!/usr/bin/env node

import { spreadCommand } from 'helpers/cmds'

const args = ['--pin', 'yarn']
spreadCommand({cmd: 'swpm', args})
