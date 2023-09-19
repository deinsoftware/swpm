#!/usr/bin/env node

import { spreadCommand } from 'helpers/cmds'

const args = ['--pin', 'yarn@berry']
spreadCommand({cmd: 'swpm', args})
