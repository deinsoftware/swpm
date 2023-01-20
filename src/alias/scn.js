#!/usr/bin/env node

import { runAlias } from '../helpers/cmds.js'

runAlias('swpm', ['clean', '--node-modules'])
