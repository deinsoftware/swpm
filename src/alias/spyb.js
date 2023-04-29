#!/usr/bin/env node

import { runAlias } from '../helpers/cmds.js'

const args = ['--pin', 'yarn@berry']
runAlias('swpm', args)
