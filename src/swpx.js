#!/usr/bin/env node

import updateNotifier from 'update-notifier'

console.log('npx runner js')

const pkg = require('./package.json')
const notifier = updateNotifier({ pkg })
notifier.notify()
