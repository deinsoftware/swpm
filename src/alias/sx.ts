#!/usr/bin/env node

import { spreadCommand } from '../helpers/cmds'

const args = [...process.argv.slice(2)]
spreadCommand({cmd: 'swpx', args})
