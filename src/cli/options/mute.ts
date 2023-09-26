const mute = {
  alias: 'm',
  describe: 'mute command translation',
  conflicts: ['alias', 'debug', 'info', 'pin', 'unpin', 'test']
} as const

export default mute
