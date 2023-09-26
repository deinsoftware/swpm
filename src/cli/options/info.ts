const info = {
  describe: 'show information and versions',
  type: 'boolean',
  conflicts: ['pin', 'unpin', 'use', 'test', 'alias']
} as const

export default info
