#!/usr/bin/env node

import { spreadCommand } from '../helpers/cmds.js'

const args = ['--pin', 'deno']
spreadCommand({ cmd: 'swpm', args })
